import {
  Layout,
  Text,
  Icon,
  Avatar,
  useTheme,
  Input,
} from '@ui-kitten/components';
import * as React from 'react';
import { Platform, ScrollView, TextInput, StyleSheet } from 'react-native';

import CourseSection from '../components/CourseSection';
import useColorScheme from '../hooks/useColorScheme';
import styles from './styles/browser.scss';
export default function TabOneScreen() {
  const scheme = useColorScheme();
  const theme = useTheme();

  return (
    <ScrollView>
      <Layout style={styles.root}>
        <Layout>
          <Text style={styles.hello}>Hey, Anonymous</Text>
          <Text style={styles.description}>
            Find a course you want to learn.
          </Text>
        </Layout>

        {/* <Input
          style={styles.search}
          size="large"
          placeholder="Place your Text"
        /> */}

        <Input
          size="large"
          placeholder="Search for course..."
          accessoryLeft={(props) => <Icon {...props} name="search-outline" />}
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
    </ScrollView>
  );
}
