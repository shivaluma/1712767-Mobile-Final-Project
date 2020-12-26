import { Layout, Text, useTheme } from '@ui-kitten/components';
import React from 'react';

import styles from './style.scss';

type Props = {
  lesson: Lesson;
  index: number;
  isSelected?: boolean;
};

const parseHour = (hours: number) => {
  const sec = hours * 60 * 60;
  let minutes = Math.floor(sec / 60).toString();
  let remaining = Math.round(sec % 60).toString();
  if (minutes.length === 1) minutes = '0' + minutes;
  if (remaining.length === 1) remaining = '0' + remaining;
  return `${minutes}:${remaining}`;
};

const CourseLesson = ({ lesson, index, isSelected = false }: Props) => {
  const theme = useTheme();
  return (
    <Layout
      style={[
        styles.root,
        isSelected && { backgroundColor: theme['text-disabled-color'] },
      ]}
    >
      <Layout style={styles.number}>
        <Text>{index + 1}</Text>
      </Layout>
      <Layout style={styles.info}>
        <Text category="s2">{lesson.name}</Text>
        <Text category="p2">{`Video - ${parseHour(Number(lesson.hours))} ${
          lesson.resource ? `Resources(${lesson.resource.length})` : ''
        } `}</Text>
      </Layout>
    </Layout>
  );
};

export default CourseLesson;
