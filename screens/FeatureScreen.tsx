import { Layout } from '@ui-kitten/components';
import { Promise as BPromise } from 'bluebird';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native';

import CourseSection from '../components/CourseSection';
import Loading from '../components/Loading';
import { categories } from '../data/category';
import { courses } from '../data/courses';
import * as CourseService from '../services/course';
import styles from './styles/browser.scss';
export default function FeatureScreen() {
  const coursesRef = useRef(courses);
  const [courseList, setCourseList] = useState<any>(null);
  useEffect(() => {
    (async () => {
      const [topRate, topSell, topNew] = await BPromise.allSettled([
        CourseService.gettoprate(),
        CourseService.gettopsell(),
        CourseService.gettopnew(),
      ]);

      setCourseList({
        rate: topRate._settledValueField.payload,
        new: topNew._settledValueField.payload,
        sell: topSell._settledValueField.payload,
      });
    })();
  }, []);

  return courseList ? (
    <ScrollView>
      <Layout style={styles.root}>
        {/* <Input
          style={styles.search}
          size="large"
          placeholder="Place your Text"
        /> */}

        <Layout>
          <CourseSection courses={courseList.rate} name="Top Rated Courses" />
        </Layout>

        <Layout>
          <CourseSection courses={courseList.new} name="Top Newest Courses" />
        </Layout>

        <Layout>
          <CourseSection courses={courseList.sell} name="Top Sell Courses" />
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
  ) : (
    <Layout style={styles.root}>
      <Loading />
    </Layout>
  );
}
