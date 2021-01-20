import { Layout, Text } from '@ui-kitten/components';
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { CourseCard } from '../components/CourseCard';
import Stars from '../components/Rating/Star';
import { getratinglist } from '../services/course';
import dayjs from '../utils/dayjs';

export default function RatingListScreen(props: any) {
  const [rating, setRating] = useState(props?.route?.params?.ratings || []);

  const renderItem = ({ item: rating }: any) => (
    <Layout key={rating.id} style={styles.list}>
      <Stars value={rating.averagePoint} maxValue={5} />
      <Text style={styles.content}>{rating.content}</Text>
      <Text style={styles.subcontent}>
        {rating.user.name} - {dayjs(rating.updatedAt).fromNow()}
      </Text>
    </Layout>
  );

  return (
    <Layout style={styles.root}>
      <FlatList
        data={rating}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        // onEndReached={loadMoreData}
        // onEndReachedThreshold={0.2}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    padding: 15,
  },
  list: {
    marginTop: 15,
    paddingBottom: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});
