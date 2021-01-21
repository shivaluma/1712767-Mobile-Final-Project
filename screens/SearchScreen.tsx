import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  Button,
  Icon,
  Layout,
  Text,
  useTheme,
  TabView,
  Tab,
} from '@ui-kitten/components';
import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import {
  ScrollView,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackBase,
  Image,
} from 'react-native';
import { SearchBar } from 'react-native-elements';

import Author from '../components/Author/Author';
import Categories from '../components/Categories/Categories';
import Chip from '../components/Chip';
import { CourseCard } from '../components/CourseCard';
import CourseInSearch from '../components/CourseInSearch/CourseInSearch';
import CourseInWishList from '../components/CourseInWishList/CourseInWishList';
import PathCard from '../components/PathCard/PathCard';
import { categories } from '../data/category';
import { courses } from '../data/courses';
import useDebounce from '../hooks/useDebounce';
import { getallcategories } from '../services/category';
import { getsearchhistory, postsearchv2 } from '../services/search';
import styles from './styles/search.scss';

const topSearches = [
  'aws',
  'react',
  'vue',
  'angular',
  'flutter',
  'Google Cloud',
];

type Props = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isFocus: boolean;
  setHistory: any;
};

export default function SearchScreen({
  searchQuery,
  setSearchQuery,
  isFocus,
  setHistory,
}: Props) {
  const navigate = useNavigation();

  const [categories, setCategories] = useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [paging, setPaging] = useState({ limit: 10, offset: 1 });

  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getallcategories();
      setCategories(data);
    })();
  }, []);

  const debouncedQuery = useDebounce(searchQuery, 400);

  useEffect(() => {
    if (debouncedQuery.length >= 3) {
      (async () => {
        try {
          const data = await postsearchv2(
            debouncedQuery,
            paging.limit,
            paging.offset
          );

          setSearchResult(() => data);
        } catch (err) {
          console.log(err.response);
        }
      })();
    }
  }, [debouncedQuery, paging]);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        try {
          const data = await getsearchhistory();

          setHistory(data.data);
        } catch (err) {
          console.log(err.response);
        }
      })();
      return undefined;
    }, [])
  );

  const loadMoreData = () => {
    setPaging((prev) => ({ ...prev, limit: prev.limit + 10 }));
  };

  const NotFound = useCallback(
    () => (
      <Layout style={styles.notfound}>
        <Text category="h6">No matching data.</Text>
        <Text style={styles.margintopsmall} category="s1">
          Try a different search.
        </Text>
      </Layout>
    ),
    []
  );

  const renderCourseItem = useCallback(
    ({ item }: any) => (
      <TouchableOpacity
        onPress={() => {
          navigate.navigate('CourseDetail', {
            courseId: item.id,
          });
        }}
        key={item.id}
      >
        <CourseInSearch key={item.id} course={item} />
      </TouchableOpacity>
    ),
    []
  );

  const renderInstructorItem = useCallback(
    ({ item }: any) => (
      <TouchableOpacity
        onPress={() => {
          navigate.navigate('Instructor', {
            instructorId: item.id,
          });
        }}
        key={item.id}
      >
        <Layout
          style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'transparent',
            marginTop: 20,
          }}
        >
          <Image
            style={{ width: 70, height: 40 }}
            source={{ uri: item.avatar }}
          />

          <Layout
            style={{
              flex: 1,
              marginLeft: 20,
              backgroundColor: 'transparent',
              justifyContent: 'space-between',
            }}
          >
            <Text category="s2">{item.name}</Text>

            <Text category="s2">{item.numcourses} Courses</Text>
          </Layout>
        </Layout>
      </TouchableOpacity>
    ),
    []
  );

  const selectIndex = useCallback((index) => setSelectedIndex(index), []);

  let sectiondata: any[] = [];
  if (searchResult) {
    sectiondata = [
      ...Object.entries(searchResult).map(([key, value]) => {
        return { title: key, data: value.data };
      }),
    ];
  }

  console.log(sectiondata);

  return searchQuery.length >= 3 ? (
    <Layout style={styles.root}>
      <TabView selectedIndex={selectedIndex} onSelect={selectIndex}>
        <Tab title="All">
          <Layout style={styles.tabContainer}>
            <SectionList
              sections={sectiondata}
              stickySectionHeadersEnabled={false}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header} category="s1">
                  {title}
                </Text>
              )}
              renderSectionFooter={({ section }) => {
                if (section.data.length === 0) {
                  return (
                    <Layout style={styles.notfound}>
                      <Text category="h6">No matching data.</Text>
                      <Text style={styles.margintopsmall} category="s1">
                        Try a different search.
                      </Text>
                    </Layout>
                  );
                }

                return null;
              }}
              keyExtractor={(item, index) => item.id + index}
              renderItem={({ item }) =>
                item.numcourses === undefined ? (
                  <TouchableOpacity
                    onPress={() => {
                      navigate.navigate('CourseDetail', {
                        courseId: item.id,
                      });
                    }}
                    key={item.id}
                  >
                    <CourseInSearch key={item.id} course={item} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      navigate.navigate('Instructor', {
                        instructorId: item.id,
                      });
                    }}
                    key={item.id}
                  >
                    <Layout
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        marginTop: 20,
                      }}
                    >
                      <Image
                        style={{ width: 70, height: 40 }}
                        source={{ uri: item.avatar }}
                      />

                      <Layout
                        style={{
                          flex: 1,
                          marginLeft: 20,
                          backgroundColor: 'transparent',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text category="s2">{item.name}</Text>

                        <Text category="s2">{item.numcourses} Courses</Text>
                      </Layout>
                    </Layout>
                  </TouchableOpacity>
                )
              }
            />
          </Layout>
        </Tab>
        <Tab title="Courses">
          <Layout style={styles.tabContainer}>
            <FlatList
              data={searchResult?.courses?.data}
              renderItem={renderCourseItem}
              ListEmptyComponent={NotFound}
              onEndReached={loadMoreData}
              onEndReachedThreshold={0.2}
              keyExtractor={(item) => item.id}
            />
          </Layout>
        </Tab>
        <Tab title="Instructors">
          <Layout style={styles.tabContainer}>
            <FlatList
              data={searchResult?.instructors?.data}
              renderItem={renderInstructorItem}
              ListEmptyComponent={NotFound}
              onEndReached={loadMoreData}
              onEndReachedThreshold={0.2}
              keyExtractor={(item) => item.id}
            />
          </Layout>
        </Tab>
      </TabView>
    </Layout>
  ) : (
    <ScrollView>
      <Layout style={styles.root}>
        {searchQuery.length < 3 && searchQuery.length > 0 && (
          <Layout style={styles.notfound}>
            <Text category="s1">
              Your query is too short "{searchQuery}", need at least 3
              characters.
            </Text>
          </Layout>
        )}
        <Text category="h6">Top Searches</Text>
        <Layout style={styles.chips}>
          {topSearches.map((query) => (
            <TouchableOpacity key={query} onPress={() => setSearchQuery(query)}>
              <Chip title={query} />
            </TouchableOpacity>
          ))}
        </Layout>

        <Layout style={styles.margintop}>
          <Text category="h6">Browse Categories</Text>
        </Layout>

        <Categories categories={categories} />
      </Layout>
    </ScrollView>
  );
}
