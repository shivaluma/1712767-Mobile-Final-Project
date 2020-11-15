import { Layout, Text } from '@ui-kitten/components';
import * as React from 'react';
import { ScrollView } from 'react-native';

import Author from '../components/Author/Author';
import Banner from '../components/Banner/Banner';
import Chip from '../components/Chip';
import CourseSection from '../components/CourseSection';
import PathCard from '../components/PathCard/PathCard';
import Section from '../components/Section/Section';
import styles from './styles/browser.scss';
export default function TabTwoScreen() {
  return (
    <ScrollView>
      <Layout style={styles.root}>
        <Banner name="New Release" />
        <Banner name="Recommended For You" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Layout>
            <Layout style={styles.subbannercontainer}>
              <Layout style={styles.bannershorizontal}>
                <Banner isSmall name="AWS" />
                <Banner isSmall name="AWS" />
                <Banner isSmall name="AWS" />
                <Banner isSmall name="AWS" />
                <Banner isSmall name="AWS" />
                <Banner isSmall name="AWS" />
              </Layout>
              <Layout style={styles.bannershorizontal}>
                <Banner isSmall name="AWS" />
                <Banner isSmall name="AWS" />
                <Banner isSmall name="AWS" />
                <Banner isSmall name="AWS" />
                <Banner isSmall name="AWS" />
                <Banner isSmall name="AWS" />
              </Layout>
            </Layout>
          </Layout>
        </ScrollView>
        <Layout>
          <Section name="Popular Skills">
            <>
              <Chip title="C#" />
              <Chip title="Javascript" />
              <Chip title="Java" />
              <Chip title="OOP" />
              <Chip title="Functional Programming" />
              <Chip title="Developer Operations" />
              <Chip title="Machine Learning" />
              <Chip title="Deep Learning" />
            </>
          </Section>
        </Layout>

        <Layout>
          <Section name="Paths">
            <>
              <PathCard isHorizontal={false} />
              <PathCard isHorizontal={false} />
              <PathCard isHorizontal={false} />
              <PathCard isHorizontal={false} />
              <PathCard isHorizontal={false} />
              <PathCard isHorizontal={false} />
            </>
          </Section>
        </Layout>

        <Layout>
          <Section name="Authors">
            <>
              <Author isHorizontal={false} />
              <Author isHorizontal={false} />
              <Author isHorizontal={false} />
              <Author isHorizontal={false} />
              <Author isHorizontal={false} />
              <Author isHorizontal={false} />
            </>
          </Section>
        </Layout>
      </Layout>
    </ScrollView>
  );
}
