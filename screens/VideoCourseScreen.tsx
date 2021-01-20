import {
  Layout,
  Text,
  TabView,
  Tab,
  Icon,
  Button,
} from '@ui-kitten/components';
import { Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import _ from 'lodash';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  Alert,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import YoutubePlayer from 'react-native-youtube-iframe';

import CourseLesson from '../components/CourseLesson/CourseLesson';
import { LessonSection } from '../components/LessonSection';
import Loading from '../components/Loading';
import { useSnackbar } from '../context/snackbar/configureContext';
import { courses } from '../data/courses';
import {
  detailwithlesson,
  lastwatchedlesson,
  getvideourloflesson,
  updatetimelearningvideo,
  finishlesson,
} from '../services/course';
import { storeData, getData } from '../utils/asyncStorage';
import instance from '../utils/axios';
const VideoCourseScreen = (props) => {
  const courseId = props?.route?.params?.courseId;
  const [currentCourse, setCurrentCourse] = useState(() => null);
  const snackbarContext = useSnackbar() as SnackBarContextType;
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [downloadStatus, setDownloadStatus] = useState<Record<string, boolean>>(
    {}
  );
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(
    () => null
  );

  const [currentProgress, setCurrentProgress] = useState<any>({
    section: 0,
    lesson: 0,
    lessonId: null,
  });

  const [preData, setPredata] = useState({
    currentTime: 0,
    lessonId: null,
    videoUrl: null,
  });

  const [downloadStart, setDownloadStart] = useState(false);

  const [downloadProgressPercent, setDownloadProgressPercent] = useState(-1);

  const [downloadProgress, setDownloadProgress] = useState({
    section: 0,
    lesson: 0,
  });

  const [playing, setPlaying] = useState(false);
  const saveURI = FileSystem.documentDirectory + 'courses/' + currentCourse?.id;

  const handleVideoRef = useRef(null);
  const seekRef = useRef(null);
  const onStateChange = useCallback(async (state) => {
    if (state === 'ended') {
      await finishlesson(getLessonId(currentProgress));
    }
  }, []);

  const getLessonId = useCallback(
    (progress) => {
      return currentCourse?.section[progress.section].lesson[progress.lesson]
        .id;
    },
    [currentCourse]
  );

  useEffect(() => {
    (async () => {
      console.log(courseId);
      if (courseId) {
        console.log('FETCH API');
        try {
          const response = await detailwithlesson(courseId);

          setCurrentCourse(() => response);
        } catch (err) {
          snackbarContext?.dispatch({
            type: 'SNACKBAR_CHANGE',
            payload: { show: true, content: err.response.data.message },
          });
        }

        try {
          console.log('LAST WATCHED LESSON');
          const response = await lastwatchedlesson(courseId as string);
          setPredata(response);
        } catch (err) {
          console.log(err);
          snackbarContext?.dispatch({
            type: 'SNACKBAR_CHANGE',
            payload: { show: true, content: err.response.data.message },
          });
        }
      }
    })();
  }, [courseId]);

  useEffect(() => {
    if (!currentProgress || !currentCourse) return;
    (async () => {
      try {
        const uri = saveURI + '/' + getLessonId(currentProgress) + '.mp4';
        const fileData = await FileSystem.getInfoAsync(uri);

        if (fileData.exists) {
          setCurrentVideoUrl(() => uri);
          return;
        }
        const response = await getvideourloflesson(
          currentCourse?.id,
          getLessonId(currentProgress)
        );

        setCurrentVideoUrl(() => response.videoUrl);
      } catch (err) {
        snackbarContext?.dispatch({
          type: 'SNACKBAR_CHANGE',
          payload: { show: true, content: err.response.data.message },
        });
      }
    })();
  }, [currentProgress, currentCourse]);

  useEffect(() => {
    (async () => {
      if (!currentCourse) return;
      const dirInfo = await FileSystem.getInfoAsync(saveURI);
      if (!dirInfo.exists) return;

      const res: Record<string, boolean> = {};
      for (let i = 0; i < currentCourse.section.length; i++) {
        for (let j = 0; j < currentCourse.section[i].lesson.length; j++) {
          const currentPos = { section: i, lesson: j };

          const lessonId = getLessonId({
            section: Number(i),
            lesson: Number(j),
          });
          const fileInfo = await FileSystem.getInfoAsync(
            saveURI + '/' + lessonId + '.mp4'
          );

          if (fileInfo.exists) {
            res[lessonId] = true;
          }
        }
      }

      setDownloadStatus(res);
    })();
  }, [currentCourse]);

  const shouldLoadComponent = useCallback(
    (index: number) => index === selectedIndex,
    []
  );

  const handlePlaybackStatusUpdate = useCallback(async (data: any) => {
    _.throttle(
      async () =>
        await updatetimelearningvideo(
          getLessonId(currentProgress),
          data.positionMillis / data.durationMillis
        ),
      3000
    );

    if (seekRef.current && data.durationMillis) {
      (handleVideoRef?.current as any).setPositionAsync(
        (seekRef.current as any) * data.durationMillis
      );
      seekRef.current = null;
    }

    if (data.didJustFinish) {
      console.log('RUN');
      try {
        await finishlesson(getLessonId(currentProgress));
      } catch (err) {
        console.log(err.response);
      }
    }
  }, []);

  const isYoutubeVideo = currentVideoUrl && currentVideoUrl?.includes('youtu');

  const timeOutRef = useRef(null);
  useEffect(() => {
    if (!isYoutubeVideo && handleVideoRef.current !== null) {
      (handleVideoRef?.current as any).setProgressUpdateIntervalAsync(4000);
      if (preData?.lessonId && preData?.currentTime) {
        for (let i = 0; i < currentCourse.section.length; i++) {
          for (let j = 0; j < currentCourse.section[i].lesson.length; j++) {
            if (
              getLessonId({ section: Number(i), lesson: Number(j) }) ===
              preData.lessonId
            ) {
              setCurrentProgress({
                section: Number(i),
                lesson: Number(j),
                lessonId: preData.lessonId,
              });
              seekRef.current = preData.currentTime;
              setPredata(null);
            }
          }
        }
      }

      (handleVideoRef?.current as any).setProgressUpdateIntervalAsync(4000);
      (handleVideoRef?.current as any).setPositionAsync(0);
    }
  }, [
    handleVideoRef.current,
    currentCourse,
    isYoutubeVideo,
    preData,
    currentProgress,
  ]);

  const callback = useCallback((downloadProgress: any) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setDownloadProgressPercent(progress);
  }, []);

  async function ensureDirExists() {
    const dirInfo = await FileSystem.getInfoAsync(saveURI);
    if (!dirInfo.exists) {
      console.log("Gif directory doesn't exist, creating...");
      await FileSystem.makeDirectoryAsync(saveURI, { intermediates: true });
    }
  }

  const handleToggleDownload = async () => {
    setDownloadStart((prev) => !prev);
  };

  useEffect(() => {
    if (!downloadStart) return;
    if (!currentCourse) return;
    if (typeof currentVideoUrl !== 'string') return;
    if (!currentVideoUrl) return;
    (async () => {
      console.log('RUN');
      try {
        await ensureDirExists();

        (async () => {
          let count = 0;
          for (let i = 0; i < currentCourse.section.length; i++) {
            for (let j = 0; j < currentCourse.section[i].lesson.length; j++) {
              console.log('LOOP RUN ');
              const currentPos = { section: i, lesson: j };
              const videoInfo = await FileSystem.getInfoAsync(
                saveURI + '/' + getLessonId(currentPos) + '.mp4'
              );
              if (videoInfo.exists) {
                continue;
              }
              setDownloadProgress({ section: Number(i), lesson: Number(j) });
              setDownloadProgressPercent(0);

              const { videoUrl } = await getvideourloflesson(
                currentCourse.id,
                getLessonId(currentPos)
              );

              const downloadResumable = FileSystem.createDownloadResumable(
                (videoUrl as unknown) as string,
                saveURI + '/' + getLessonId(currentPos) + '.mp4',
                {},
                callback
              );
              const { uri } = await downloadResumable.downloadAsync();

              count += 1;
              storeData(currentCourse.id, `${count}`);
              await new Promise((resolve, reject) => {
                setTimeout(() => resolve(''), 300);
              });
            }
          }

          setDownloadStart(false);
        })();
      } catch (e) {
        console.error(e);
      }
    })();
  }, [saveURI, downloadStart, currentCourse, getLessonId]);

  if (!currentCourse) return <Loading />;

  return (
    currentCourse && (
      <Layout style={styles.root}>
        {!isYoutubeVideo && (
          <Video
            source={{
              uri: currentVideoUrl,
            }}
            ref={handleVideoRef}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            shouldPlay
            useNativeControls
            resizeMode="stretch"
            isLooping={false}
            style={styles.videocontainer}
          />
        )}

        {isYoutubeVideo && (
          <YoutubePlayer
            height={Math.round((Dimensions.get('window').height * 32) / 100)}
            play
            videoId={currentVideoUrl?.split('/').pop()}
            onChangeState={onStateChange}
          />
        )}

        <ScrollView stickyHeaderIndices={[2]}>
          <Layout style={styles.info}>
            <Text style={styles.title} category="s1">
              {currentCourse.title}
            </Text>

            <Layout style={styles.withdownload}>
              <Text style={styles.gap} category="p1">
                {currentCourse.instructorName || currentCourse.instructor.name}
              </Text>

              <TouchableOpacity onPress={handleToggleDownload}>
                <Icon fill="#000" style={styles.button} name="download" />
              </TouchableOpacity>
            </Layout>

            <TabView
              style={styles.gap}
              indicatorStyle={{ height: 2 }}
              selectedIndex={selectedIndex}
              shouldLoadComponent={shouldLoadComponent}
              onSelect={(index) => setSelectedIndex(index)}
            >
              <Tab title="Lectures">
                <Layout style={styles.tabContainer}>
                  {currentCourse?.section.map((section, sIndex) => (
                    <React.Fragment key={section.name}>
                      <Text style={styles.sectionname} category="c2">
                        Section {sIndex + 1} - {section.name}
                      </Text>

                      <Layout style={styles.lessons}>
                        {section.lesson.map((l, index) => (
                          <TouchableOpacity
                            key={sIndex * 100 + index}
                            onPress={() => {
                              if (
                                currentProgress.lesson === index &&
                                currentProgress.section === sIndex
                              )
                                return;
                              setCurrentProgress(() => ({
                                section: sIndex,
                                lesson: index,
                              }));
                            }}
                          >
                            <CourseLesson
                              lesson={l}
                              isDownloaded={
                                downloadStatus[
                                  getLessonId({
                                    section: sIndex,
                                    lesson: index,
                                  })
                                ]
                              }
                              percent={
                                sIndex === downloadProgress.section &&
                                index === downloadProgress.lesson
                                  ? downloadProgressPercent
                                  : -1
                              }
                              isSelected={
                                sIndex === currentProgress.section &&
                                index === currentProgress.lesson
                              }
                              index={Number(
                                sIndex * section.lesson.length + index
                              )}
                            />
                          </TouchableOpacity>
                        ))}
                      </Layout>
                    </React.Fragment>
                  ))}
                </Layout>
              </Tab>
              <Tab title="More">
                <Layout style={styles.tabContainer}>
                  <Text category="p1">More</Text>
                </Layout>
              </Tab>
            </TabView>
          </Layout>
        </ScrollView>
      </Layout>
    )
  );
};

export default VideoCourseScreen;
const styles = StyleSheet.create({
  root: { flex: 1 },
  videocontainer: { width: '100%', height: '32%' },
  info: {
    flex: 1,
    padding: 15,
  },
  gap: {
    marginTop: 10,
  },

  tabContainer: {
    marginTop: 10,
  },
  title: {
    fontSize: 19,
  },
  icon: {
    width: 30,
    height: 30,
  },
  sectionname: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  lessons: {
    marginTop: 10,
  },
  button: {
    padding: 0,
    margin: 0,
    width: 24,
    height: 24,
  },
  withdownload: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
