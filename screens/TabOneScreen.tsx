import { Layout, Text, Icon, Avatar, useTheme } from '@ui-kitten/components';
import * as React from 'react';
import { Platform, ScrollView, TextInput, StyleSheet } from 'react-native';

import CourseSection from '../components/CourseSection';
import useColorScheme from '../hooks/useColorScheme';
import styles from './styles/browser.scss';
export default function TabOneScreen() {
  const scheme = useColorScheme();
  const theme = useTheme();
  const sstyles = StyleSheet.create({
    searchbar: {
      backgroundColor: theme['color-basic-300'],
    },
  });

  return (
    <ScrollView>
      <Layout style={styles.root}>
        <Layout>
          <Text style={styles.hello}>Hey, Anonymous</Text>
          <Text style={styles.description}>
            Find a course you want to learn.
          </Text>
        </Layout>

        <Layout style={styles.searchbar}>
          {/* <Input
          style={styles.search}
          size="large"
          placeholder="Place your Text"
        /> */}
          <Icon style={styles.searchicon} name="search" size={20} fill="#000" />
          <TextInput
            style={[styles.search, sstyles.searchbar]}
            placeholder="Search for course..."
          />

          <Layout>
            <CourseSection name="Featured" />
          </Layout>

          <Layout>
            <CourseSection name="Software Engineering" />
          </Layout>

          <Layout>
            <CourseSection name="Developer Operations" />
          </Layout>

          <Layout>
            <CourseSection name="IT Operations" />
          </Layout>
        </Layout>
      </Layout>
    </ScrollView>
  );
}
