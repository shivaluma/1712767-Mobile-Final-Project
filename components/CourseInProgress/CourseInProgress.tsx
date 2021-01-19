import { Layout, Text, Icon, useTheme } from '@ui-kitten/components';
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
    downloaded,
  } = course;
  const percent = (process / total).toFixed(2);
  const theme = useTheme();
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
        {downloaded && (
          <Text style={[styles.textGap, styles.withIcon]} category="c2">
            <Icon
              style={styles.icon}
              fill={theme['text-basic-color']}
              name="download"
            />
            {'  '}
            {downloaded} videos downloaded.
          </Text>
        )}
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
  icon: {
    width: 16,
    height: 16,
    padding: 0,
    margin: 0,
  },
  withIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
    width: '95%',
    marginLeft: 18,
  },
  bar: {
    flex: 1,
    height: 5,
    width: '95%',
    backgroundColor: 'rgba(78, 78, 78, 0.4)',
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
    marginTop: 7,
  },
});
