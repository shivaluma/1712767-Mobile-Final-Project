import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import Author from '../components/Author/Author';
import Chip from '../components/Chip';
import { CourseCard } from '../components/CourseCard';
import PathCard from '../components/PathCard/PathCard';
import styles from './styles/search.scss';
export default function SearchScreen() {
  return (
    <ScrollView>
      <Layout style={styles.root}>
        <Text category="s1">Top Searches</Text>
        <Layout style={styles.chips}>
          <Chip title="aws" />
          <Chip title="react" />
          <Chip title="Reactive Programming" />
          <Chip title="angular" />
          <Chip title="vue 3" />
          <Chip title="flutter" />
          <Chip title="Google Cloud" />
        </Layout>

        <Layout style={styles.section}>
          <Text category="s1" style={styles.sectionheader}>
            Courses
          </Text>
          <CourseCard isHorizontal hasMenu />
          <CourseCard isHorizontal hasMenu />
          <CourseCard isHorizontal hasMenu />
          <CourseCard isHorizontal hasMenu />
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
        </Layout>
      </Layout>
    </ScrollView>
  );
}
