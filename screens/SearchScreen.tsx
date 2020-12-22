import { useNavigation } from '@react-navigation/native';
import { Button, Icon, Layout, Text, useTheme } from '@ui-kitten/components';
import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackBase,
} from 'react-native';

import Author from '../components/Author/Author';
import Chip from '../components/Chip';
import { CourseCard } from '../components/CourseCard';
import PathCard from '../components/PathCard/PathCard';
import { categories } from '../data/category';
import { courses } from '../data/courses';
import { getallcategories } from '../services/category';
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
};

export default function SearchScreen({ searchQuery, setSearchQuery }: Props) {
  const navigate = useNavigation();
  const coursesRef = useRef(courses);
  const theme = useTheme();
  const [categories, setCategories] = useState([]);
  const listCourse = courses.filter((el) =>
    el.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    (async () => {
      const data = await getallcategories();
      setCategories(data);
    })();
  }, []);

  return (
    <ScrollView>
      {searchQuery ? (
        <Layout style={styles.root}>
          {listCourse.map((course, index) => (
            <CourseCard key={course.id} course={course} isHorizontal />
          ))}

          {listCourse.length === 0 && (
            <>
              <Layout style={styles.notfound}>
                <Text category="h5">No matching courses.</Text>
                <Text category="s1">Try a different search.</Text>
              </Layout>
              <Layout style={styles.margintop}>
                <Text category="h6">Browse Categories</Text>
              </Layout>
              <Layout style={styles.margintopsmall}>
                {categories.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigate.navigate('CourseList', { category })
                    }
                  >
                    <Layout style={styles.categoryshow}>
                      <Icon
                        style={styles.btnicon}
                        fill={theme['text-basic-color']}
                        name="shopping-cart-outline"
                      />
                      <Text category="s2">{category.name}</Text>
                    </Layout>
                  </TouchableOpacity>
                ))}
              </Layout>
            </>
          )}
        </Layout>
      ) : (
        <Layout style={styles.root}>
          <Text category="h6">Top Searches</Text>
          <Layout style={styles.chips}>
            {topSearches.map((query) => (
              <TouchableOpacity onPress={() => setSearchQuery(query)}>
                <Chip title={query} />
              </TouchableOpacity>
            ))}
          </Layout>

          <Layout style={styles.margintop}>
            <Text category="h6">Browse Categories</Text>
          </Layout>

          <Layout style={styles.margintopsmall}>
            {categories.map((category) => (
              <TouchableOpacity
                onPress={() => navigate.navigate('CourseList', { category })}
              >
                <Layout style={styles.categoryshow}>
                  <Icon
                    style={styles.btnicon}
                    fill={theme['text-basic-color']}
                    name="shopping-cart-outline"
                  />
                  <Text category="s2">{category.name}</Text>
                </Layout>
              </TouchableOpacity>
            ))}
          </Layout>

          {/* <Layout style={styles.section}>
         <Text category="s1" style={styles.sectionheader}>
           Courses
         </Text>
         {coursesRef.current.map((course) => (
           <CourseCard key={course.id} course={course} isHorizontal hasMenu />
         ))}
       </Layout>

       <Layout style={styles.section}>
         <Text category="s1" style={styles.sectionheader}>
           Path
         </Text>

         <PathCard isHorizontal />
         <PathCard isHorizontal />
         <PathCard isHorizontal />
         <PathCard isHorizontal />
       </Layout>

       <Layout style={styles.section}>
         <Text category="s1" style={styles.sectionheader}>
           Authors
         </Text>

         <Author />
         <Author />
         <Author />
         <Author />
       </Layout> */}
        </Layout>
      )}
    </ScrollView>
  );
}
