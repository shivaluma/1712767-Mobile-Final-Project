import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import * as React from 'react';
import { ScrollView } from 'react-native';
import ViewMoreText from 'react-native-view-more-text';

import { CourseCard } from '../components/CourseCard';
import Header from '../components/Path/Header/Header';
import Section from '../components/Section/Section';
import { courses } from '../data/courses';
import styles from './styles/path.scss';
export default function PathScreen() {
  return (
    <ScrollView>
      <Layout style={styles.root}>
        <Header />
        <Layout style={styles.desccontainer}>
          <ViewMoreText
            numberOfLines={3}
            renderViewMore={(onPress) => (
              <Button status="primary" onPress={onPress} appearance="ghost">
                View more...
              </Button>
            )}
            renderViewLess={(onPress) => (
              <Button onPress={onPress} appearance="ghost">
                View less...
              </Button>
            )}
            textStyle={{ textAlign: 'left' }}
          >
            <Text style={styles.description} category="p2">
              Do you have experience in web development and would like to gain
              valuable experience in mobile development? React Native enables
              you to leverage your existing skills to build slick native iOS
              apps. React is extremely popular, has great community support, and
              now, through React Native, supports building iOS apps that are
              indistinguishable from apps built with Objective-C or Swift.
            </Text>
          </ViewMoreText>
        </Layout>
        <Layout>
          <Section childHorizontal={false} name="Beginner">
            <>
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isHorizontal
                  hasMenu
                />
              ))}
            </>
          </Section>
          <Section childHorizontal={false} name="Immediate">
            <>
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isHorizontal
                  hasMenu
                />
              ))}
            </>
          </Section>

          <Section childHorizontal={false} name="Advance">
            <>
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isHorizontal
                  hasMenu
                />
              ))}
            </>
          </Section>
        </Layout>
      </Layout>
    </ScrollView>
  );
}
