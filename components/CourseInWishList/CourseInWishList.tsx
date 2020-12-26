import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import Stars from '../Rating/Star';

export type CourseInProgressType = {
  courseTitle: string;
  courseImage: string;
  id: string;
  instructorName: string;
  coursePrice: number;
  courseSoldNumber: string;
  courseAveragePoint: string;
};

const CourseInWishList = ({ course }: { course: CourseInProgressType }) => {
  const {
    courseTitle,
    courseImage,
    id,
    instructorName,
    coursePrice,
    courseSoldNumber,
    courseAveragePoint,
  } = course;

  return (
    <Layout style={styles.root}>
      <Image style={styles.image} source={{ uri: courseImage }} />
      <Layout style={styles.info}>
        <Text category="s1">{courseTitle}</Text>
        <Text style={styles.textGap} category="c1">
          {instructorName}
        </Text>
        <Text style={styles.textGap} category="c1">
          {coursePrice + 'đ'}
        </Text>
        <Text style={styles.textGap} category="c1">
          {courseSoldNumber + ' students'}
        </Text>
        <Stars value={courseAveragePoint} maxValue={5} />
      </Layout>
    </Layout>
  );
};

export default CourseInWishList;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    marginBottom: 20,
  },
  image: {
    width: 70,
    height: 70,
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
