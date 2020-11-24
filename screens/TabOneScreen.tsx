import { Layout } from '@ui-kitten/components';
import * as React from 'react';
import { ScrollView } from 'react-native';

import CourseSection from '../components/CourseSection';
import styles from './styles/browser.scss';
export default function TabOneScreen() {
  return (
    <ScrollView>
      <Layout style={styles.root}>
        {/* <Input
          style={styles.search}
          size="large"
          placeholder="Place your Text"
        /> */}

        <Layout>
          <CourseSection name="Featured" />
        </Layout>

        <Layout>
          <CourseSection name="Software Engineering" />
        </Layout>

        <Layout>
          <CourseSection name="Developer Operations" />
        </Layout>

        <Layout>
          <CourseSection name="IT Operations" />
        </Layout>
      </Layout>
    </ScrollView>
  );
}
