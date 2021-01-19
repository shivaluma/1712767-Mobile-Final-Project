import { Layout, Text, useTheme, Icon } from '@ui-kitten/components';
import React from 'react';
import ProgressCircle from 'react-native-progress-circle';

import styles from './style.scss';

type Props = {
  lesson: Lesson;
  index: number;
  isSelected?: boolean;
  percent?: number;
  isDownloaded: boolean;
};

const parseHour = (hours: number) => {
  const sec = hours * 60 * 60;
  let minutes = Math.floor(sec / 60).toString();
  let remaining = Math.round(sec % 60).toString();
  if (minutes.length === 1) minutes = '0' + minutes;
  if (remaining.length === 1) remaining = '0' + remaining;
  return `${minutes}:${remaining}`;
};

const CourseLesson = ({
  lesson,
  index,
  isSelected = false,
  percent = -1,
  isDownloaded = false,
}: Props) => {
  const theme = useTheme();

  return (
    <Layout
      style={[
        styles.root,
        isSelected && { backgroundColor: theme['text-disabled-color'] },
      ]}
    >
      <Layout style={styles.left}>
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

      <Layout style={styles.right}>
        {!isDownloaded &&
          (percent !== -1 ? (
            <ProgressCircle
              percent={percent * 100}
              radius={9}
              borderWidth={4}
              color="#3399FF"
              shadowColor="#999"
              bgColor="transparent"
            ></ProgressCircle>
          ) : (
            <Icon style={styles.icon} fill="#fa24ab" name="download"></Icon>
          ))}
        {isDownloaded && (
          <Icon style={styles.icon} fill="#228B22" name="download"></Icon>
        )}
      </Layout>
    </Layout>
  );
};

export default CourseLesson;
