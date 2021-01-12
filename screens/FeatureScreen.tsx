import { Layout } from '@ui-kitten/components';
import { Promise as BPromise } from 'bluebird';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
          <CourseSection
            courses={courseList.rate}
            name={t('top_rated_courses')}
          />
        </Layout>

        <Layout>
          <CourseSection
            courses={courseList.new}
            name={t('top_newest_courses')}
          />
        </Layout>

        <Layout>
          <CourseSection
            courses={courseList.sell}
            name={t('top_sell_courses')}
          />
        </Layout>
      </Layout>
    </ScrollView>
  ) : (
    <Layout style={styles.root}>
      <Loading />
    </Layout>
  );
}
