import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';

import styles from './style.scss';
type Props = {
  ratedNumber: number;
  presentationPoint: number;
  contentPoint: number;
  formalityPoint: number;
  stars: number[];
};
const RatingChart = (props: Props) => {
  const avg =
    (props.presentationPoint + props.contentPoint + props.formalityPoint) / 3;

  const stars = props.stars;
  return (
    <Layout style={styles.layout}>
      <Layout style={styles.leftcol}>
        <Text style={styles.ratingnumber}>{avg.toFixed(1)}</Text>
        <Text style={styles.ratingnumbercount}>
          {props.ratedNumber} ratings
        </Text>
      </Layout>
      <Layout style={styles.rightcol}>
        {stars.map((percent, index) => (
          <View style={styles.row}>
            <Text style={styles.text}>{index + 1}⭑</Text>
            <Layout style={[styles.bar]}>
              <View
                style={[
                  styles.absolute,
                  { backgroundColor: '#8BED4F', width: `${percent}%` },
                ]}
              ></View>
            </Layout>
          </View>
        ))}
      </Layout>
    </Layout>
  );
};

export default RatingChart;
