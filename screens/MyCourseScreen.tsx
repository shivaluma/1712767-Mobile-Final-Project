import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Icon, Layout, Text } from '@ui-kitten/components';
import * as React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import Categories from '../components/Categories/Categories';
import CourseInProgress, {
  CourseInProgressType,
} from '../components/CourseInProgress/CourseInProgress';
import Loading from '../components/Loading';
import { getprocesscourse } from '../services/authenticate';
import { getallcategories } from '../services/category';
import { getData } from '../utils/asyncStorage';
type Props = {
  currentSelect: string;
  navigation: any;
};

export default function MyCourseScreen({ currentSelect }: Props) {
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [allCourses, setAllCourses] = React.useState([]);
  const [filteredCourses, setFilteredCourses] = React.useState([]);
  const navigation = useNavigation();
  const canRun = React.useRef(false);

  useFocusEffect(
    React.useCallback(() => {
      try {
        (async () => {
          const data = await getallcategories();
          setCategories(() => data);
        })();

        (async () => {
          const data = await getprocesscourse();

          for (let i = 0; i < data.length; i++) {
            const course = data[i];
            const downloaded = await getData(course.id);
            course.downloaded = downloaded;
          }
          setAllCourses(() => data);
          console.log(data);
          setFilteredCourses(() => {
            if (currentSelect === 'Downloaded courses') {
              return data.filter((course: any) => course.downloaded !== null);
            }
            return data;
          });
          canRun.current = true;
        })();
      } catch (error) {
      } finally {
        setLoading(() => false);
      }
      return undefined;
    }, [])
  );

  React.useEffect(() => {
    if (canRun.current) {
      if (currentSelect === 'Downloaded courses') {
        setFilteredCourses((prev) =>
          prev.filter((course: any) => course.downloaded !== null)
        );
      } else {
        setFilteredCourses((prev) => allCourses);
      }
    }
  }, [currentSelect]);

  return !loading ? (
    <Layout style={styles.root}>
      {allCourses.length > 0 ? (
        <>
          <FlatList
            data={filteredCourses}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <TouchableHighlight
                key={index}
                onPress={() =>
                  navigation.navigate('VideoCourse', { courseId: item.id })
                }
              >
                <CourseInProgress key={item.id} course={item} />
              </TouchableHighlight>
            )}
          />
        </>
      ) : (
        <>
          <ScrollView>
            <Layout style={styles.empty}>
              <Icon
                style={styles.icon}
                fill="#DB2C66"
                name="book-open-outline"
              ></Icon>
              <Text style={styles.subtext} category="h6">
                What will you learn first?
              </Text>
              <Text style={styles.subtext} category="c1">
                Your courses will go here.
              </Text>
            </Layout>
            <Layout>
              <Text style={styles.subtext} category="h6">
                Browse categories
              </Text>
              <Categories categories={categories} />
            </Layout>
          </ScrollView>
        </>
      )}
    </Layout>
  ) : (
    <Loading />
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 10,
    flex: 1,
  },
  empty: {
    paddingTop: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtext: {
    marginTop: 30,
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
});
