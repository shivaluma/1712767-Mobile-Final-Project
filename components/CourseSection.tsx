import { Layout, Text } from '@ui-kitten/components';
import React, { ReactElement } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { CourseCard } from './CourseCard';
import styles from './styles/section.scss';
interface Props {
  name: string;
  children?: ReactElement;
}

const CourseSection = ({ name, children }: Props) => {
  return (
    <Layout style={styles.root}>
      <Layout style={styles.topbar}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.seeall} appearance="hint">
          See all
        </Text>
      </Layout>
      <Layout>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </ScrollView>
      </Layout>
    </Layout>
  );
};

export default CourseSection;
