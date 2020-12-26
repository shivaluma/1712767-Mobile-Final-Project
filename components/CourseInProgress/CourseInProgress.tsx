import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

export type CourseInProgressType = {
  courseTitle: string;
  courseImage: string;
  id: string;
  instructorName: string;
  latestLearnTime: string;
  learnLesson: number;
  process: number;
  total: number;
};

const CourseInProgress = ({ course }: { course: CourseInProgressType }) => {
  const {
    courseTitle,
    courseImage,
    id,
    instructorName,
    latestLearnTime,
    learnLesson,
    process,
    total,
  } = course;
  const percent = (process / total).toFixed(2);
  return (
    <Layout style={styles.root}>
      <Image style={styles.image} source={{ uri: courseImage }} />
      <Layout style={styles.info}>
        <Text category="s1">{courseTitle}</Text>
        <Text style={styles.textGap} category="c1">
          {instructorName}
        </Text>
        <Layout style={[styles.bar, styles.textGap]}>
          <View
            style={[
              styles.absolute,
              { backgroundColor: '#8BED4F', width: `${process / total}%` },
            ]}
          ></View>
        </Layout>
        <Text style={styles.textGap} category="c2">
          {percent}% complete
        </Text>
      </Layout>
    </Layout>
  );
};

export default CourseInProgress;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    marginBottom: 20,
  },
  image: {
    width: 46,
    height: 46,
    borderRadius: 3,
    flexShrink: 0,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    marginLeft: 18,
  },
  bar: {
    flex: 1,
    height: 5,
    width: '100%',
    backgroundColor: 'rgb(78, 78, 78)',
    borderRadius: 99,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 99,
  },
  textGap: {
    marginTop: 3,
  },
});
