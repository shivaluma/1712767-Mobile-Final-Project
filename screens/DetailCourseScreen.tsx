import {
  Avatar,
  Button,
  Icon,
  Layout,
  Text,
  useTheme,
  Modal,
  Input,
  Card,
} from '@ui-kitten/components';
import { Video } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Image } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings'; //5.3.0
import ViewMoreText from 'react-native-view-more-text';

import Chip from '../components/Chip';
import { CourseCard } from '../components/CourseCard';
import { LessonSection } from '../components/LessonSection';
import Loading from '../components/Loading';
import Stars from '../components/Rating/Star';
import RatingChart from '../components/RatingChart/RatingChart';
import RatingList from '../components/RatingChart/RatingList';
import { useUser } from '../context/auth/configureContext';
import { useSnackbar } from '../context/snackbar/configureContext';
import Authorization from '../hoc/Authorization';
import {
  togglelikecourse,
  getcourselikestatus,
  getcheckowncourse,
} from '../services/authenticate';
import {
  getcoursedetail,
  getratings,
  postratingcourse,
  postenrollcoursefree,
  checkoutmomo,
} from '../services/course';
import styles from './styles/coursedetail.scss';
export default function CourseDetailScreen({ route, navigation, setCourseId }) {
  const theme = useTheme();
  const [course, setCourse] = useState<Course | null>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const [ownCourse, setOwnCourse] = useState<boolean>(false);
  const [ratingVisible, setRatingVisible] = useState(false);
  const [ratingStar, setRatingStar] = useState({
    formalityPoint: 3,
    contentPoint: 3,
    presentationPoint: 3,
    content: '',
  });

  const [forceRender, setForceRender] = useState(false);
  const sstyles = StyleSheet.create({
    btn: {
      backgroundColor: theme['color-basic-transparent-300'],
    },
    button: {
      marginTop: 10,
      width: '100%',
      fontWeight: 'normal',
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    buttonGap: { marginTop: 14 },
  });
  const courseId = route.params.courseId;
  const userContext = useUser() as UserContextType;
  const snackbarContext = useSnackbar();
  const { t } = useTranslation();
  useEffect(() => {
    setCourseId(courseId);
    (async () => {
      if (userContext.state.user) {
        try {
          const response = await getcourselikestatus(courseId);
          setLiked(() => response.likeStatus);
        } catch (err) {
          snackbarContext?.dispatch({
            type: 'SNACKBAR_CHANGE',
            payload: { show: true, content: err.response.data.message },
          });
        }

        try {
          const response = await getcheckowncourse(courseId);
          setOwnCourse(() => response.payload.isUserOwnCourse);
        } catch (err) {
          snackbarContext?.dispatch({
            type: 'SNACKBAR_CHANGE',
            payload: { show: true, content: err.response.data.message },
          });
        }
      }

      try {
        const response = await getcoursedetail(
          courseId,
          userContext?.state?.user?.id
        );
        setCourse(() => response);
      } catch (err) {
        snackbarContext?.dispatch({
          type: 'SNACKBAR_CHANGE',
          payload: { show: true, content: err.response.data.message },
        });
      }
    })();
  }, [courseId, userContext?.state?.user?.id, forceRender]);

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

  const isCourseFree = course?.price === 0;
  console.log(course?.id);

  const handleEnrollment = async () => {
    if (ownCourse) {
      navigation.navigate('VideoCourse', { course, courseId: course.id });
      return;
    }
    try {
      if (isCourseFree) {
        const data = await postenrollcoursefree(course?.id as string);
        setOwnCourse(true);
      } else {
        const data = await checkoutmomo(course?.id as string);
        navigation.navigate('WebView', { url: data });
      }
    } catch (err) {
      snackbarContext?.dispatch({
        type: 'SNACKBAR_CHANGE',
        payload: { show: true, content: err.response.data.messsage },
      });
    }
  };

  const handleSendCourseRating = async () => {
    try {
      const data = await postratingcourse(ratingStar, course?.id);
      snackbarContext?.dispatch({
        type: 'SNACKBAR_CHANGE',
        payload: { show: true, content: t('rating_success') },
      });
      setRatingVisible(false);
      setForceRender((prev) => !prev);
    } catch (err) {
      snackbarContext?.dispatch({
        type: 'SNACKBAR_CHANGE',
        payload: { show: true, content: t('rating_failed') },
      });
    }
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
                  {t('view_more')}...
                </Text>
              )}
              renderViewLess={(onPress) => (
                <Text status="primary" onPress={onPress} category="s1">
                  {t('view_less')}...
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
                title={`${course.totalHours} ${t('total_hours')}`}
                accessoryLeft={() => (
                  <Icon
                    style={styles.icon}
                    fill={theme['text-basic-color']}
                    name="play-circle-outline"
                  />
                )}
              />

              <Chip title={`${t('created_by')} ${course.instructorName}`} />
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
              <Authorization
                onPress={handleEnrollment}
                render={(onClick) => (
                  <Button size="large" status="danger" onPress={onClick}>
                    {ownCourse
                      ? t('go_to_course')
                      : isCourseFree
                      ? t('enroll_now')
                      : t('buy_now')}
                  </Button>
                )}
              ></Authorization>
            </Layout>
            <Layout style={styles.buttons}>
              <Authorization
                onPress={toggleLikeCourse}
                render={(onClick) => (
                  <Button
                    style={styles.flex1}
                    appearance="outline"
                    status="danger"
                    onPress={onClick}
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
                )}
              ></Authorization>
              <Layout style={styles.gap}></Layout>
              <Button
                style={styles.flex1}
                appearance="outline"
                status="danger"
                disabled={ownCourse}
                accessoryLeft={() => (
                  <Icon
                    style={styles.btnicon}
                    fill={
                      theme[
                        ownCourse ? 'color-basic-disabled' : 'text-danger-color'
                      ]
                    }
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
                  <Text category="s1">{t('what_will_i_learn') as string}</Text>
                  {course.learnWhat?.map((text) => (
                    <Text style={[styles.subtext]} key={text} category="c2">
                      ✓ {text}
                    </Text>
                  ))}
                </Layout>
              </Layout>
              <Layout style={[styles.section, sstyles.btn]}>
                <Layout style={styles.nobg}>
                  <Text category="s1">{t('requirements') as string}</Text>
                  {course.requirement?.map((text) => (
                    <Text style={[styles.subtext]} key={text} category="c2">
                      ✓ {text}
                    </Text>
                  ))}
                </Layout>
              </Layout>

              <Layout style={[styles.section, sstyles.btn]}>
                <Layout style={styles.nobg}>
                  <Text category="s1" style={{ marginBottom: 20 }}>
                    {t('courses_same_category') as string}
                  </Text>
                  {course.coursesLikeCategory.map((c) => (
                    <CourseCard key={c.id} course={c} isHorizontal />
                  ))}
                </Layout>
              </Layout>
              <Layout style={[styles.section, sstyles.btn]}>
                <Layout style={styles.nobg}>
                  <Text category="s1">{t('curriculums') as string}</Text>
                  <Text style={[styles.subtext]} category="s2">
                    {t('lecture') as string} ({course.videoNumber}){' '}
                    {t('total') as string} ({course.totalHours})
                  </Text>
                </Layout>
              </Layout>
              {course.section?.map((section) => (
                <LessonSection key={section.id} section={section} />
              ))}

              <Layout style={[styles.section, sstyles.btn]}>
                <Layout style={styles.nobg}>
                  <Text category="s1">
                    {t('created_by') as string} {course.instructor.name}
                  </Text>
                  <Layout
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      backgroundColor: 'transparent',
                      marginTop: 20,
                    }}
                  >
                    <Image
                      style={{ width: 80, height: 80 }}
                      source={{ uri: course.instructor.avatar }}
                    />

                    <Layout
                      style={{
                        flex: 1,
                        marginLeft: 20,
                        backgroundColor: 'transparent',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text category="s2">{course.instructor.major}</Text>

                      <Text category="s2">
                        {course.instructor.totalCourse} Courses
                      </Text>
                      <Text category="s2">
                        Rating by {course.instructor.countRating} students
                      </Text>

                      <Stars
                        value={course.instructor.averagePoint}
                        maxValue={5}
                      />
                    </Layout>
                  </Layout>
                  <Button
                    style={{ marginTop: 10 }}
                    appearance="ghost"
                    status="danger"
                    onPress={() => {
                      navigation.navigate('Instructor', {
                        instructorId: course.instructor.id,
                      });
                    }}
                  >
                    {t('view_profile') as string}
                  </Button>
                </Layout>
              </Layout>
              <Layout style={[styles.section, sstyles.btn]}>
                <Layout style={styles.nobg}>
                  <Text category="s1">{t('student_feedback') as string}</Text>
                  <RatingChart
                    ratedNumber={course.ratedNumber}
                    presentationPoint={course.presentationPoint}
                    formalityPoint={course.formalityPoint}
                    contentPoint={course.contentPoint}
                    stars={course.ratings.stars}
                  />

                  {userContext?.state?.user && (
                    <>
                      {ownCourse && (
                        <Button
                          style={[styles.button, sstyles.buttonGap]}
                          status="danger"
                          appearance="ghost"
                          onPress={() => setRatingVisible(true)}
                          accessoryLeft={(props) => (
                            <Icon {...props} name="star" />
                          )}
                        >
                          {t('rate_this_courses')}
                        </Button>
                      )}

                      <Modal
                        visible={ratingVisible}
                        style={{ flexBasis: '90%', width: '90%' }}
                        backdropStyle={sstyles.backdrop}
                        onBackdropPress={() => setRatingVisible(false)}
                      >
                        <Card disabled>
                          <Text>{t('rating_this_course')}</Text>

                          <Text style={sstyles.buttonGap} category="s1">
                            {t('formality_point')}
                          </Text>
                          <Rating
                            onFinishRating={(value) =>
                              setRatingStar((prev) => ({
                                ...prev,
                                formalityPoint: value,
                              }))
                            }
                            imageSize={30}
                          />

                          <Text style={sstyles.buttonGap} category="s1">
                            {t('content_point')}
                          </Text>
                          <Rating
                            imageSize={30}
                            onFinishRating={(value) =>
                              setRatingStar((prev) => ({
                                ...prev,

                                contentPoint: value,
                              }))
                            }
                          />
                          <Text style={sstyles.buttonGap} category="s1">
                            {t('presentation_point')}
                          </Text>
                          <Rating
                            onFinishRating={(value) =>
                              setRatingStar((prev) => ({
                                ...prev,
                                presentationPoint: value,
                              }))
                            }
                            imageSize={30}
                          />

                          <Input
                            style={{ marginTop: 20 }}
                            placeholder="Place your Text"
                            value={ratingStar.content}
                            onChangeText={(nextValue: string) =>
                              setRatingStar((prev) => ({
                                ...prev,
                                content: nextValue,
                              }))
                            }
                          />

                          <Layout
                            style={{
                              display: 'flex',
                              marginTop: 20,
                              flexDirection: 'row',
                            }}
                          >
                            <Button
                              style={{ flex: 1, marginRight: 5 }}
                              status="basic"
                              onPress={() => setRatingVisible(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              style={{ flex: 1 }}
                              appearance="outline"
                              onPress={handleSendCourseRating}
                            >
                              Send
                            </Button>
                          </Layout>
                        </Card>
                      </Modal>
                    </>
                  )}

                  <RatingList
                    ratingList={[...course?.ratings?.ratingList].splice(0, 5)}
                  />

                  {course?.ratings?.ratingList.length > 5 && (
                    <Button
                      style={sstyles.button}
                      status="basic"
                      appearance="ghost"
                      onPress={() =>
                        navigation.navigate('RatingList', {
                          ratings: course?.ratings?.ratingList,
                        })
                      }
                    >
                      {t('view_all') as string}
                    </Button>
                  )}
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
