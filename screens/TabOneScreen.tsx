import { Layout } from '@ui-kitten/components';
import * as React from 'react';
import { useRef } from 'react';
import { ScrollView } from 'react-native';

import CourseSection from '../components/CourseSection';
import { courses } from '../data/courses';
import styles from './styles/browser.scss';
export default function TabOneScreen() {
  const coursesRef = useRef(courses);
  return (
    <ScrollView>
      <Layout style={styles.root}>
        {/* <Input
          style={styles.search}
          size="large"
          placeholder="Place your Text"
        /> */}

        <Layout>
          <CourseSection courses={coursesRef.current} name="Featured" />
        </Layout>

        <Layout>
          <CourseSection
            courses={coursesRef.current}
            name="Software Engineering"
          />
        </Layout>

        <Layout>
          <CourseSection
            courses={coursesRef.current}
            name="Developer Operations"
          />
        </Layout>

        <Layout>
          <CourseSection courses={coursesRef.current} name="IT Operations" />
        </Layout>
      </Layout>
    </ScrollView>
  );
}
