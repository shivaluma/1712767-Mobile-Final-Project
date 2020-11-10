import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { Image, Platform, StyleSheet, Text as RText } from 'react-native';

import Stars from '../Rating/Star';
import styles from '../styles/coursecard.scss';

interface Props {}
const CourseCard = (props: Props) => {
  return (
    <Layout style={[styles.card, sstyles.shadow]}>
      <Image
        style={styles.thumbnail}
        source={require('../../assets/images/course.jpg')}
      />

      <Layout style={styles.price}>
        <Text style={styles.pricetext}>129.99$</Text>
      </Layout>

      <Layout style={[styles.info]}>
        <Text style={styles.coursetitle} numberOfLines={1}>
          React - The Complete Guide (incl Hooks, React Router, Redux)
        </Text>

        <Text style={styles.author} appearance="hint">
          Maximilian Schwarzmuller
        </Text>

        <Text style={styles.description} appearance="hint">
          54 total hours - 162 lectures - All Levels
        </Text>

        <Layout style={styles.rating}>
          <Stars value={3} maxValue={5} />
          <Text style={styles.people} appearance="hint">
            (94,478 ratings)
          </Text>
        </Layout>
      </Layout>
    </Layout>
  );
};

const sstyles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 6,
  },
});

export default CourseCard;
