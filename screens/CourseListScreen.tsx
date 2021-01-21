import { Layout, Text, Icon, Avatar } from '@ui-kitten/components';
import React, { useState, useEffect } from 'react';
import { ScrollView, FlatList } from 'react-native';

import { CourseCard } from '../components/CourseCard';
import { courses } from '../data/courses';
import API from '../utils/axios';
import styles from './styles/courselist.scss';

export default function CourseListScreen(props: any) {
  const [courses, setCourses] = useState(props?.route?.params?.courses || []);
  const [paging, setPaging] = useState({ limit: 10, page: 1 });

  useEffect(() => {
    if (!props.route.params.apiKey) return;
    (async () => {
      const courses = await API.post(props.route.params.apiKey, paging);
      setCourses((prev) => prev.concat(courses.data.payload));
    })();
  }, [props?.route?.params?.apiKey, paging]);

  useEffect(() => {
    props.navigation.setOptions({ title: props.route.params.title });
  }, [props.navigation, props.route]);

  const renderItem = ({ item }: { item: Course }) => (
    <CourseCard key={item.id} course={item} isHorizontal />
  );

  const loadMoreData = () => {
    setPaging((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  return (
    <Layout style={styles.root}>
      <FlatList
        data={courses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.2}
      />
    </Layout>
  );
}
