import { Layout, Text, Icon, Avatar } from '@ui-kitten/components';
import { Video } from 'expo-av';
import * as React from 'react';
import { ScrollView } from 'react-native';

import { CourseCard } from '../components/CourseCard';
import { courses } from '../data/courses';
import styles from './styles/courselist.scss';
export default function CourseListScreen() {
  const coursesRef = React.useRef(courses);
  return (
    <Layout style={styles.root}>
      <ScrollView>
        {courses.map((course, index) => (
          <CourseCard key={course.id} course={course} isHorizontal />
        ))}
      </ScrollView>
    </Layout>
  );
}
