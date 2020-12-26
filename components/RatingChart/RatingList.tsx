import { Layout, Text } from '@ui-kitten/components';
import React from 'react';

import dayjs from '../../utils/dayjs';
import Stars from '../Rating/Star';
import styles from './style.scss';
type Props = {
  ratingList: any[];
};

const RatingList = (props: Props) => {
  return (
    <Layout style={styles.list}>
      {props.ratingList.map((rating) => (
        <Layout key={rating.id} style={styles.list}>
          <Stars value={rating.averagePoint} maxValue={5} />
          <Text style={styles.content}>{rating.content}</Text>
          <Text style={styles.subcontent}>
            {rating.user.name} - {dayjs(rating.updatedAt).fromNow()}
          </Text>
        </Layout>
      ))}
    </Layout>
  );
};

export default RatingList;
