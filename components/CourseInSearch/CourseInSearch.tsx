import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import Stars from '../Rating/Star';

const CourseInSearch = ({ course }) => {
  const {
    title,
    imageUrl,
    id,
    name,
    price,
    soldNumber,
    contentPoint,
    formalityPoint,
    presentationPoint,
  } = course;

  return (
    <Layout style={styles.root}>
      <Image style={styles.image} source={{ uri: imageUrl }} />
      <Layout style={styles.info}>
        <Text category="s1">{title}</Text>
        <Text style={styles.textGap} category="c1">
          {name}
        </Text>
        <Text style={styles.textGap} category="c1">
          {price + 'đ'}
        </Text>
        <Text style={styles.textGap} category="c1">
          {soldNumber + ' students'}
        </Text>
        <Stars
          value={Number(
            (contentPoint + formalityPoint + presentationPoint) / 3
          )}
          maxValue={5}
        />
      </Layout>
    </Layout>
  );
};

export default CourseInSearch;

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
