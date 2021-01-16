import { Layout } from '@ui-kitten/components';
import { Promise as BPromise } from 'bluebird';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

import CourseSection from '../components/CourseSection';
import Loading from '../components/Loading';
import { useUser } from '../context/auth/configureContext';
import { categories } from '../data/category';
import { courses } from '../data/courses';
import * as CourseService from '../services/course';
import styles from './styles/browser.scss';

export default function FeatureScreen() {
  const coursesRef = useRef(courses);
  const [courseList, setCourseList] = useState<any>(null);
  const { t } = useTranslation();
  const userContext = useUser();
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

  useEffect(() => {
    if (!userContext?.state.user) return;

    (async () => {
      try {
        const recommendedCourse = await CourseService.getrecommendedcourse(
          userContext?.state?.user?.id as string,
          10,
          1
        );
        setCourseList((prev: any) => ({
          ...prev,
          recommended: recommendedCourse?.payload,
        }));
      } catch (err) {
        console.log(err);
      }
    })();
  }, [userContext?.state.user]);

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
            apiKey="course/top-rate"
            name={t('top_rated_courses')}
          />
        </Layout>

        <Layout>
          <CourseSection
            courses={courseList.new}
            apiKey="course/top-new"
            name={t('top_newest_courses')}
          />
        </Layout>

        <Layout>
          <CourseSection
            courses={courseList.sell}
            apiKey="course/top-sell"
            name={t('top_sell_courses')}
          />
        </Layout>

        {courseList.recommended && (
          <Layout>
            <CourseSection
              courses={courseList.recommended}
              name={t('recommended_course')}
            />
          </Layout>
        )}
      </Layout>
    </ScrollView>
  ) : (
    <Layout style={styles.root}>
      <Loading />
    </Layout>
  );
}
