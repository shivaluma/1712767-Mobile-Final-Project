import { Button, Icon, Layout, Text, useTheme } from '@ui-kitten/components';
import { Video } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ViewMoreText from 'react-native-view-more-text';

import Chip from '../components/Chip';
import { LessonSection } from '../components/LessonSection';
import Loading from '../components/Loading';
import RatingChart from '../components/RatingChart/RatingChart';
import RatingList from '../components/RatingChart/RatingList';
import { useUser } from '../context/auth/configureContext';
import { useSnackbar } from '../context/snackbar/configureContext';
import { useWishList } from '../context/wishlist/configureContext';
import {
  togglelikecourse,
  getcourselikestatus,
} from '../services/authenticate';
import { getcoursedetail, getratings } from '../services/course';
import styles from './styles/coursedetail.scss';
export default function CourseDetailScreen({ route }) {
  const theme = useTheme();
  const [course, setCourse] = useState<Course | null>(null);
  const [liked, setLiked] = useState<boolean>(false);

  const sstyles = StyleSheet.create({
    btn: {
      backgroundColor: theme['color-basic-transparent-300'],
    },
  });
  const courseId = route.params.courseId;
  const userContext = useUser() as UserContextType;
  const snackbarContext = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        const response = await getcoursedetail(courseId);
        setCourse(() => response);
        console.log(response);
      } catch (err) {
        console.log(err.response);
        snackbarContext?.dispatch({
          type: 'SNACKBAR_CHANGE',
          payload: { show: true, content: err.response.data.message },
        });
      }

      if (userContext.state.user) {
        try {
          const response = await getcourselikestatus(courseId);
          console.log(response);
        } catch (err) {
          snackbarContext?.dispatch({
            type: 'SNACKBAR_CHANGE',
            payload: { show: true, content: err.response.data.message },
          });
        }
      }
    })();
  }, []);

  const toggleLikeCourse = async () => {
    if (!userContext.state.user) {
      snackbarContext?.dispatch({
        type: 'SNACKBAR_CHANGE',
        payload: { show: true, content: 'You must login to like this course.' },
      });
    }
    try {
      const response = await togglelikecourse(course?.id as string);
      setLiked(() => response.likeStatus as boolean);
    } catch (err) {}
  };

  return course ? (
    <>
      <ScrollView>
        <Layout style={styles.root}>
          <Text style={styles.title}>{course.title}</Text>

          <Layout style={styles.desccontainer}>
            <ViewMoreText
              numberOfLines={3}
              renderViewMore={(onPress) => (
                <Text status="primary" onPress={onPress} category="s1">
                  View more...
                </Text>
              )}
              renderViewLess={(onPress) => (
                <Text status="primary" onPress={onPress} category="s1">
                  View less...
                </Text>
              )}
              textStyle={{ textAlign: 'left' }}
            >
              <Text style={styles.description} category="p2">
                {course.description}
              </Text>
            </ViewMoreText>

            <Layout style={styles.chipslayout}>
              <Chip
                title={`${course.ratedNumber}`}
                accessoryLeft={() => (
                  <Icon
                    style={styles.icon}
                    fill={theme['text-basic-color']}
                    name="star-outline"
                  />
                )}
              />

              <Chip
                title={`${course.soldNumber}`}
                accessoryLeft={() => (
                  <Icon
                    style={styles.icon}
                    fill={theme['text-basic-color']}
                    name="people-outline"
                  />
                )}
              />

              <Chip
                title={`${course.totalHours} total hours`}
                accessoryLeft={() => (
                  <Icon
                    style={styles.icon}
                    fill={theme['text-basic-color']}
                    name="play-circle-outline"
                  />
                )}
              />

              <Chip title={`Created By ${course.instructorName}`} />
              <Chip title="Immediate" />
            </Layout>
            <Video
              source={{
                uri: `${course.promoVidUrl}`,
              }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              shouldPlay
              useNativeControls
              resizeMode="stretch"
              isLooping
              style={styles.videocontainer}
            />
            <Layout style={styles.price}>
              <Text category="h5">{course.price}$</Text>
            </Layout>
            <Layout>
              <Button size="large" status="danger">
                Buy Now
              </Button>
            </Layout>
            <Layout style={styles.buttons}>
              <Button
                style={styles.flex1}
                appearance="outline"
                status="danger"
                onPress={toggleLikeCourse}
                accessoryLeft={() => (
                  <Icon
                    style={styles.btnicon}
                    fill={theme['text-danger-color']}
                    name="heart-outline"
                  />
                )}
              >
                {liked ? 'Wishlisted' : 'Add To WishList'}
              </Button>
              <Layout style={styles.gap}></Layout>
              <Button
                style={styles.flex1}
                appearance="outline"
                status="danger"
                accessoryLeft={() => (
                  <Icon
                    style={styles.btnicon}
                    fill={theme['text-danger-color']}
                    name="shopping-cart-outline"
                  />
                )}
              >
                Add To Cart
              </Button>
            </Layout>
            <Layout>
              <Layout style={[styles.section, sstyles.btn]}>
                <Layout style={styles.nobg}>
                  <Text category="s1">What Will I Learn</Text>
                  {course.learnWhat?.map((text) => (
                    <Text style={[styles.subtext]} category="c2">
                      ✓ {text}
                    </Text>
                  ))}
                </Layout>
              </Layout>
              <Layout style={[styles.section, sstyles.btn]}>
                <Layout style={styles.nobg}>
                  <Text category="s1">Requirements</Text>
                  {course.requirement?.map((text) => (
                    <Text style={[styles.subtext]} category="c2">
                      ✓ {text}
                    </Text>
                  ))}
                </Layout>
              </Layout>
              <Layout style={[styles.section, sstyles.btn]}>
                <Layout style={styles.nobg}>
                  <Text category="s1">Curriculums</Text>
                  <Text style={[styles.subtext]} category="s2">
                    Lecture ({course.videoNumber}) Total ({course.totalHours})
                  </Text>
                </Layout>
              </Layout>
              {course.section?.map((section) => (
                <LessonSection section={section} />
              ))}
              <Layout style={[styles.section, sstyles.btn]}>
                <Layout style={styles.nobg}>
                  <Text category="s1">Student Feedback</Text>
                  <RatingChart
                    ratedNumber={course.ratedNumber}
                    presentationPoint={course.presentationPoint}
                    formalityPoint={course.formalityPoint}
                    contentPoint={course.contentPoint}
                    stars={course.ratings.stars}
                  />
                  <RatingList ratingList={course?.ratings?.ratingList} />
                </Layout>
              </Layout>
            </Layout>
          </Layout>
        </Layout>
      </ScrollView>
    </>
  ) : (
    <Loading />
  );
}
