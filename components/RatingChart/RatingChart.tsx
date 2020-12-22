import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';

import styles from './style.scss';
type Props = {
  ratedNumber: number;
  presentationPoint: number;
  contentPoint: number;
  formalityPoint: number;
};
const RatingChart = (props: Props) => {
  const avg =
    (props.presentationPoint + props.contentPoint + props.formalityPoint) / 3;
  return (
    <Layout style={styles.layout}>
      <Layout style={styles.leftcol}>
        <Text style={styles.ratingnumber}>{avg.toFixed(1)}</Text>
        <Text style={styles.ratingnumbercount}>
          {props.ratedNumber} ratings
        </Text>
      </Layout>
      <Layout style={styles.rightcol}>
        <View style={styles.row}>
          <Text style={styles.text}>1⭑</Text>
          <Layout style={[styles.bar]}></Layout>
        </View>
        <View style={[styles.row, styles.margintop]}>
          <Text style={styles.text}>2⭑</Text>
          <Layout style={[styles.bar, styles.margintop]}></Layout>
        </View>
        <View style={[styles.row, styles.margintop]}>
          <Text style={styles.text}>3⭑</Text>
          <Layout style={[styles.bar, styles.margintop]}></Layout>
        </View>
        <View style={[styles.row, styles.margintop]}>
          <Text style={styles.text}>4⭑</Text>
          <Layout style={[styles.bar, styles.margintop]}></Layout>
        </View>
        <View style={[styles.row, styles.margintop]}>
          <Text style={styles.text}>5⭑</Text>
          <Layout style={[styles.bar]}></Layout>
        </View>
      </Layout>
    </Layout>
  );
};

export default RatingChart;
