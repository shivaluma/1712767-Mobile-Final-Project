import { Layout, Text, Icon, Avatar } from '@ui-kitten/components';
import * as React from 'react';
import { Platform, ScrollView, TextInput, StyleSheet } from 'react-native';

import CourseSection from '../components/CourseSection';
import useColorScheme from '../hooks/useColorScheme';
import styles from './styles/browser.scss';
export default function TabOneScreen() {
  const scheme = useColorScheme();
  return (
    <ScrollView>
      <Layout style={styles.root}>
        <Layout style={styles.topbar}>
          <Icon
            fill={scheme === 'light' ? '#000' : '#fff'}
            name="menu"
            style={styles.icon}
          />

          <Avatar
            size="large"
            source={require('../assets/images/avatar.jpg')}
          />
        </Layout>
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
          <TextInput style={styles.search} placeholder="Search for course..." />

          <Layout>
            <CourseSection name="Software Engineering" />
          </Layout>

          <Layout>
            <CourseSection name="Developer Operations" />
          </Layout>
        </Layout>
      </Layout>
    </ScrollView>
  );
}
