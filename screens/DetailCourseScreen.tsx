import { Button, Icon, Layout, Text, useTheme } from '@ui-kitten/components';
import { Video } from 'expo-av';
import * as React from 'react';
import { ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import ViewMoreText from 'react-native-view-more-text';

import Chip from '../components/Chip';
import { LessonSection } from '../components/LessonSection';
import styles from './styles/coursedetail.scss';

export default function CourseDetailScreen({ route }) {
  const theme = useTheme();
  const sstyles = StyleSheet.create({
    btn: {
      backgroundColor: theme['color-basic-transparent-300'],
    },
  });
  const course = route.params.course as Course;
  return (
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
              <TouchableWithoutFeedback>
                <Layout style={styles.btn}>
                  <Layout style={[styles.iconcontainer, sstyles.btn]}>
                    <Icon
                      style={styles.btnicon}
                      fill={theme['text-basic-color']}
                      name="heart-outline"
                    />
                  </Layout>

                  <Text category="s2">Add To Wishlish</Text>
                </Layout>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback>
                <Layout style={styles.btn}>
                  <Layout style={[styles.iconcontainer, sstyles.btn]}>
                    <Icon
                      style={styles.btnicon}
                      fill={theme['text-basic-color']}
                      name="shopping-cart-outline"
                    />
                  </Layout>
                  <Text category="s2">Add To Cart</Text>
                </Layout>
              </TouchableWithoutFeedback>
            </Layout>
            <Layout>
              <Layout style={[styles.section, sstyles.btn]}>
                <Layout style={styles.nobg}>
                  <Text category="s1">What Will I Learn</Text>
                  {course.learnWhat.map((text) => (
                    <Text style={[styles.subtext]} category="c2">
                      ✓ {text}
                    </Text>
                  ))}
                </Layout>
              </Layout>

              <Layout style={[styles.section, sstyles.btn]}>
                <Layout style={styles.nobg}>
                  <Text category="s1">Requirements</Text>
                  {course.requirement.map((text) => (
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

              {course.section.map((section) => (
                <LessonSection section={section} />
              ))}
            </Layout>
          </Layout>
        </Layout>
      </ScrollView>
    </>
  );
}
