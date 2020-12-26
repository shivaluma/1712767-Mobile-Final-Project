import { useFocusEffect } from '@react-navigation/native';
import { Layout, Text, Icon } from '@ui-kitten/components';
import React, { useState } from 'react';
import { ScrollView, TouchableHighlight, StyleSheet } from 'react-native';

import Categories from '../components/Categories/Categories';
import CourseInWishList from '../components/CourseInWishList/CourseInWishList';
import Loading from '../components/Loading';
import { useSnackbar } from '../context/snackbar/configureContext';
import { getfavoritecourses } from '../services/authenticate';
import { getallcategories } from '../services/category';
import styles from './styles/courselist.scss';

const WishListScreen = ({ navigation }) => {
  const [wishlist, setWishlist] = useState([]);
  const snackbarContext = useSnackbar() as SnackBarContextType;
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        try {
          console.log('CALLEWD');
          const response = await getfavoritecourses();
          setWishlist(response);
        } catch (err) {
          if (err.response.status === 401) return;
          snackbarContext?.dispatch({
            type: 'SNACKBAR_CHANGE',
            payload: { show: true, content: err.response.data.message },
          });
        }
      })();
      return undefined;
    }, [])
  );

  React.useEffect(() => {
    try {
      (async () => {
        const data = await getallcategories();
        setCategories(() => data);
      })();
    } catch (error) {
    } finally {
      setLoading(() => false);
    }
  }, []);

  return !loading ? (
    <Layout style={styles.root}>
      <ScrollView>
        {wishlist?.map((wishlistCourse, index) => {
          return (
            <TouchableHighlight
              key={wishlistCourse.id}
              onPress={() =>
                navigation.navigate('CourseDetail', {
                  courseId: wishlistCourse.id,
                })
              }
            >
              <CourseInWishList
                key={wishlistCourse.id}
                course={wishlistCourse}
              />
            </TouchableHighlight>
          );
        })}
        {wishlist?.length === 0 && (
          <>
            <Layout style={sstyles.empty}>
              <Icon
                style={sstyles.icon}
                fill="#DB2C66"
                name="book-open-outline"
              ></Icon>
              <Text style={sstyles.subtext} category="h6">
                What will you learn first?
              </Text>
              <Text style={sstyles.subtext} category="c1">
                Your courses will go here.
              </Text>
            </Layout>
            <Layout style={sstyles.margintop}>
              <Text style={sstyles.subtext} category="h6">
                Browse categories
              </Text>
              <Categories categories={categories} />
            </Layout>
          </>
        )}
      </ScrollView>
    </Layout>
  ) : (
    <Loading />
  );
};

export default WishListScreen;

const sstyles = StyleSheet.create({
  empty: {
    paddingTop: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtext: {
    marginTop: 25,
  },
  icon: {
    width: 70,
    height: 70,
  },
  container: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  margintop: {
    marginTop: 20,
  },
});
