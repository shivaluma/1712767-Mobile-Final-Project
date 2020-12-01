import { Layout, Text } from '@ui-kitten/components';
import React from 'react';

import styles from './style.scss';

type Props = {
  lesson: Lesson;
  index: number;
};
const CourseLesson = ({ lesson, index }: Props) => {
  return (
    <Layout style={styles.root}>
      <Layout style={styles.number}>
        <Text>{index + 1}</Text>
      </Layout>
      <Layout style={styles.info}>
        <Text category="s1">{lesson.name}</Text>
        <Text category="c2">{`${lesson.hours} ${
          lesson.resource ? `Resources(${lesson.resource.length})` : ''
        } `}</Text>
      </Layout>
    </Layout>
  );
};

export default CourseLesson;
