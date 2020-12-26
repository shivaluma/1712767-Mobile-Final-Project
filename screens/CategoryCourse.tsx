import { useFocusEffect } from '@react-navigation/native';
import { Layout, Text, Icon } from '@ui-kitten/components';
import React, { useState } from 'react';
import { ScrollView, TouchableHighlight, StyleSheet } from 'react-native';

import CourseInSearch from '../components/CourseInSearch/CourseInSearch';
import CourseInWishList from '../components/CourseInWishList/CourseInWishList';
import Loading from '../components/Loading';
import { useSnackbar } from '../context/snackbar/configureContext';
import { getfavoritecourses } from '../services/authenticate';
import { getallcategories } from '../services/category';
import { getcourseincategory } from '../services/search';
import styles from './styles/courselist.scss';

const CategoryScreen = ({ navigation, route }) => {
  const [courses, setCourses] = useState([]);
  const snackbarContext = useSnackbar() as SnackBarContextType;

  const [loading, setLoading] = React.useState(true);
  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        try {
          const response = await getcourseincategory(route.params.categoryId);

          setCourses(() => response.courses.data);
        } catch (err) {
          if (err.response.status === 401) return;
          snackbarContext?.dispatch({
            type: 'SNACKBAR_CHANGE',
            payload: { show: true, content: err.response.data.message },
          });
        } finally {
          setLoading(() => false);
        }
      })();
      return undefined;
    }, [])
  );

  React.useEffect(() => {
    navigation.setOptions({ title: route.params.title });
  }, []);

  return !loading ? (
    <Layout style={styles.root}>
      <ScrollView>
        {courses?.map((course, index) => {
          return (
            <TouchableHighlight
              key={course.id}
              onPress={() =>
                navigation.navigate('CourseDetail', {
                  courseId: course.id,
                })
              }
            >
              <CourseInSearch key={course.id} course={course} />
            </TouchableHighlight>
          );
        })}
      </ScrollView>
    </Layout>
  ) : (
    <Loading />
  );
};

export default CategoryScreen;
