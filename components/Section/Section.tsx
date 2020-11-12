import { useNavigation } from '@react-navigation/native';
import { Layout, Text, Button } from '@ui-kitten/components';
import React, { ReactElement } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import styles from './section.scss';
interface Props {
  name: string;
  children?: ReactElement;
  childHorizontal?: boolean;
}

const Section = ({ name, children, childHorizontal = true }: Props) => {
  return (
    <Layout style={styles.root}>
      <Layout style={styles.topbar}>
        <Text style={styles.title}>{name}</Text>
      </Layout>
      <Layout>
        <ScrollView
          horizontal={childHorizontal}
          showsHorizontalScrollIndicator={false}
        >
          <Layout style={styles.flexone}>{children}</Layout>
        </ScrollView>
      </Layout>
    </Layout>
  );
};

export default Section;
