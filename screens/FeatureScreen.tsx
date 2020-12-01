import { Layout } from '@ui-kitten/components';
import * as React from 'react';
import { useRef } from 'react';
import { ScrollView } from 'react-native';

import CourseSection from '../components/CourseSection';
import { categories } from '../data/category';
import { courses } from '../data/courses';
import styles from './styles/browser.scss';
export default function FeatureScreen() {
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
          <CourseSection
            courses={coursesRef.current
              .filter((c, index) => c.ratedNumber > 4.3)
              .slice(0, 5)}
            name="Featured"
          />
        </Layout>

        {categories.map((category, index) => (
          <Layout key={index}>
            <CourseSection
              courses={coursesRef.current
                .filter((course) => course.category === category)
                .slice(0, 5)}
              name={category}
            />
          </Layout>
        ))}
      </Layout>
    </ScrollView>
  );
}
