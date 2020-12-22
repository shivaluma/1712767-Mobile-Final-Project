import { Layout, Text } from '@ui-kitten/components';
import React from 'react';

import styles from './style.scss';
type Props = {
  count: number;
};
const RatingChart = (props: Props) => {
  return (
    <Layout style={styles.layout}>
      <Layout style={styles.leftcol}>
        <Text style={styles.ratingnumber}>4.5</Text>
        <Text style={styles.ratingnumbercount}>123245 ratings</Text>
      </Layout>
      <Layout style={styles.rightcol}>
        <Layout style={styles.bar}></Layout>
        <Layout style={styles.bar}></Layout>
        <Layout style={styles.bar}></Layout>
        <Layout style={styles.bar}></Layout>
        <Layout style={styles.bar}></Layout>
      </Layout>
    </Layout>
  );
};

export default RatingChart;
