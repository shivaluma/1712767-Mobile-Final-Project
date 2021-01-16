import { Layout, Text, TabView, Tab, Icon } from '@ui-kitten/components';
import { Video } from 'expo-av';
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
import YoutubePlayer from 'react-native-youtube-iframe';

import CourseLesson from '../components/CourseLesson/CourseLesson';
import { LessonSection } from '../components/LessonSection';
import { useSnackbar } from '../context/snackbar/configureContext';
import { courses } from '../data/courses';
import {
  getcoursedetail,
  getvideourloflesson,
  updatetimelearningvideo,
  finishlesson,
} from '../services/course';

const VideoCourseScreen = (props) => {
  const course = props?.route?.params?.course;
  const courseId = props?.route?.params?.courseId;
  const [currentCourse, setCurrentCourse] = useState(() => course);
  const snackbarContext = useSnackbar() as SnackBarContextType;
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [currentVideoUrl, setCurrentVideoUrl] = useState(() => null);
  const [currentProgress, setCurrentProgress] = useState({
    section: 0,
    lesson: 0,
  });

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const getLessonId = useCallback(
    (progress) => {
      return currentCourse.section[progress.section].lesson[progress.lesson].id;
    },
    [currentCourse]
  );

  useEffect(() => {
    (async () => {
      if (!course) {
        console.log('FETCH API');
        try {
          const response = await getcoursedetail(courseId);
          setCurrentCourse(() => response);
        } catch (err) {
          snackbarContext?.dispatch({
            type: 'SNACKBAR_CHANGE',
            payload: { show: true, content: err.response.data.message },
          });
        }
      }
    })();
  }, [course]);

  useEffect(() => {
    if (!currentProgress || !currentCourse) return;
    (async () => {
      try {
        const response = await getvideourloflesson(
          currentCourse.id,
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

  const shouldLoadComponent = useCallback(
    (index: number) => index === selectedIndex,
    []
  );

  const handlePlaybackStatusUpdate = useCallback(
    _.throttle(async (data: any) => {
      await updatetimelearningvideo(
        getLessonId(currentProgress),
        data.positionMillis
      );

      if (data.didJustFinish) {
        await finishlesson(getLessonId(currentProgress));
      }
    }, 3000),
    []
  );

  const isYoutubeVideo = currentVideoUrl && currentVideoUrl?.includes('youtu');
  const handleVideoRef = useRef(null);
  const timeOutRef = useRef(null);
  useEffect(() => {
    if (!isYoutubeVideo && handleVideoRef.current !== null) {
      handleVideoRef?.current?.setProgressUpdateIntervalAsync(4000);
      handleVideoRef?.current?.setPositionAsync(0);
    }
  }, [handleVideoRef.current, currentProgress.lesson, isYoutubeVideo]);

  return (
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
          videoId={currentVideoUrl.split('/').pop()}
          onChangeState={onStateChange}
        />
      )}

      <ScrollView stickyHeaderIndices={[2]}>
        <Layout style={styles.info}>
          <Text category="h6">{currentCourse.title}</Text>

          <Text style={styles.gap} category="p2">
            {currentCourse.instructorName || currentCourse.instructor.name}
          </Text>

          <TabView
            style={styles.gap}
            indicatorStyle={{ height: 1 }}
            selectedIndex={selectedIndex}
            shouldLoadComponent={shouldLoadComponent}
            onSelect={(index) => setSelectedIndex(index)}
          >
            <Tab title="Lectures">
              <Layout style={styles.tabContainer}>
                {currentCourse?.section.map((section, sIndex) => (
                  <>
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
                  </>
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
});
