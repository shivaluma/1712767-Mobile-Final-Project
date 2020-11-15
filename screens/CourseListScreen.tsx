import { Layout, Text, Icon, Avatar } from '@ui-kitten/components';
import { Video } from 'expo-av';
import * as React from 'react';
import { ScrollView } from 'react-native';

import { CourseCard } from '../components/CourseCard';
import styles from './styles/courselist.scss';

export default function CourseListScreen() {
  return (
    <Layout style={styles.root}>
      <ScrollView>
        <CourseCard isHorizontal />
        <CourseCard isHorizontal />
        <CourseCard isHorizontal />
        <CourseCard isHorizontal />
        <CourseCard isHorizontal />
        <CourseCard isHorizontal />
        <CourseCard isHorizontal />
        <CourseCard isHorizontal />
      </ScrollView>
    </Layout>
  );
}
