import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { Image, StyleSheet } from 'react-native';

import styles from './header.scss';
interface Props {}

const Header = (props: Props) => {
  const sstyles = StyleSheet.create({
    image: {
      resizeMode: 'contain',
    },
  });

  return (
    <Layout style={styles.root}>
      <Image
        style={[styles.logo, sstyles.image]}
        resizeMode="contain"
        source={require('../../../assets/images/reactlogo.png')}
      />

      <Layout style={styles.info}>
        <Text style={styles.main} category="s1">
          React
        </Text>
        <Text style={styles.sub} category="c1">
          15 courses - 56 hours
        </Text>
      </Layout>
    </Layout>
  );
};

export default Header;
