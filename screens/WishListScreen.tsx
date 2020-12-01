import { Layout, Text, Icon, Avatar } from '@ui-kitten/components';
import React, { memo } from 'react';
import { ScrollView } from 'react-native';

import { CourseCard } from '../components/CourseCard';
import { useUser } from '../context/configureContext';
import { courses } from '../data/courses';
import styles from './styles/courselist.scss';

const WishListScreen = () => {
  const authState = useUser();
  const wishlist = authState?.state.wishlish;
  return (
    <Layout style={styles.root}>
      <ScrollView>
        {wishlist?.map((course, index) => (
          <CourseCard key={course.id} course={course} isHorizontal />
        ))}
        {wishlist?.length === 0 && (
          <Layout style={styles.empty}>
            <Text style={styles.textcenter} category="h5">
              Want to save something for later?
            </Text>
            <Text style={styles.textcentermargin} category="s1">
              Your wishlist will go here!
            </Text>
          </Layout>
        )}
      </ScrollView>
    </Layout>
  );
};

export default WishListScreen;
