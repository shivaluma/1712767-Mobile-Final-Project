import { Button, Icon, Layout, Text, useTheme } from '@ui-kitten/components';
import { Video } from 'expo-av';
import * as React from 'react';
import { ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import ViewMoreText from 'react-native-view-more-text';

import Chip from '../components/Chip';
import styles from './styles/coursedetail.scss';
export default function CourseDetailScreen() {
  const theme = useTheme();
  const sstyles = StyleSheet.create({
    btn: {
      backgroundColor: theme['color-basic-transparent-300'],
    },
  });
  return (
    <>
      <Video
        source={{
          uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        shouldPlay
        resizeMode="stretch"
        isLooping
        style={styles.videocontainer}
      />
      <ScrollView>
        <Layout style={styles.root}>
          <Text style={styles.title}>
            React - The Complete Guide (Hooks, Context, NextJS, Router)
          </Text>
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
                Just publish! Following the same curriculum i teach my student
                in SF. 10+ projects including one HUGE application.
              </Text>
            </ViewMoreText>

            <Layout style={styles.chipslayout}>
              <Chip
                title="4.7"
                accessoryLeft={() => (
                  <Icon
                    style={styles.icon}
                    fill={theme['text-basic-color']}
                    name="star-outline"
                  />
                )}
              />

              <Chip
                title="21.890"
                accessoryLeft={() => (
                  <Icon
                    style={styles.icon}
                    fill={theme['text-basic-color']}
                    name="people-outline"
                  />
                )}
              />

              <Chip
                title="38 total hours"
                accessoryLeft={() => (
                  <Icon
                    style={styles.icon}
                    fill={theme['text-basic-color']}
                    name="play-circle-outline"
                  />
                )}
              />

              <Chip title="Created By Shiro" />
              <Chip title="Immediate" />
            </Layout>

            <Layout style={styles.buttons}>
              <TouchableWithoutFeedback>
                <Layout style={styles.btn}>
                  <Layout style={[styles.iconcontainer, sstyles.btn]}>
                    <Icon
                      style={styles.btnicon}
                      fill={theme['text-basic-color']}
                      name="bookmark-outline"
                    />
                  </Layout>

                  <Text category="s2">Bookmark</Text>
                </Layout>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback>
                <Layout style={styles.btn}>
                  <Layout style={[styles.iconcontainer, sstyles.btn]}>
                    <Icon
                      style={styles.btnicon}
                      fill={theme['text-basic-color']}
                      name="radio-outline"
                    />
                  </Layout>

                  <Text category="s2">Add to channel</Text>
                </Layout>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback>
                <Layout style={styles.btn}>
                  <Layout style={[styles.iconcontainer, sstyles.btn]}>
                    <Icon
                      style={styles.btnicon}
                      fill={theme['text-basic-color']}
                      name="download-outline"
                    />
                  </Layout>
                  <Text category="s2">Download</Text>
                </Layout>
              </TouchableWithoutFeedback>
            </Layout>
            <Layout>
              <Layout style={[styles.section, sstyles.btn]}>
                <Layout style={styles.nobg}>
                  <Text category="s1">Curriculums</Text>
                  <Text style={[styles.subtext]} category="s2">
                    Lecture (312) Total (38h 48m)
                  </Text>
                </Layout>
              </Layout>

              <Layout style={[styles.section, sstyles.btn]}>
                <Text category="s1">A Taste of React</Text>
                <Button
                  appearance="ghost"
                  status="danger"
                  accessoryLeft={(props) => (
                    <Icon {...props} name="plus-outline" />
                  )}
                />
              </Layout>

              <Layout style={[styles.section, sstyles.btn]}>
                <Text category="s1">Introduction To JSX</Text>
                <Button
                  appearance="ghost"
                  status="danger"
                  accessoryLeft={(props) => (
                    <Icon {...props} name="plus-outline" />
                  )}
                />
              </Layout>

              <Layout style={[styles.section, sstyles.btn]}>
                <Text category="s1">React Fundamentals</Text>
                <Button
                  appearance="ghost"
                  status="danger"
                  accessoryLeft={(props) => (
                    <Icon {...props} name="plus-outline" />
                  )}
                />
              </Layout>

              <Layout style={[styles.section, sstyles.btn]}>
                <Text category="s1">State Management</Text>
                <Button
                  appearance="ghost"
                  status="danger"
                  accessoryLeft={(props) => (
                    <Icon {...props} name="plus-outline" />
                  )}
                />
              </Layout>
            </Layout>
          </Layout>
        </Layout>
      </ScrollView>
    </>
  );
}
