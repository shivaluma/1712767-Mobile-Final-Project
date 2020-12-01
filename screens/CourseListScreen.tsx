import { Layout, Text, Icon, Avatar } from '@ui-kitten/components';
import { Video } from 'expo-av';
import * as React from 'react';
import { ScrollView } from 'react-native';

import { CourseCard } from '../components/CourseCard';
import { courses } from '../data/courses';
import styles from './styles/courselist.scss';
export default function CourseListScreen(props) {
  console.log(props);
  const coursesRef = React.useRef(courses);
  const listCourses = props?.route?.params?.category
    ? courses.filter((c) => c.category === props.route.params.category)
    : courses;
  return (
    <Layout style={styles.root}>
      <ScrollView>
        {listCourses.map((course, index) => (
          <CourseCard key={course.id} course={course} isHorizontal />
        ))}
      </ScrollView>
    </Layout>
  );
}
