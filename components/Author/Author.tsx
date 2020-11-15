import { Avatar, Button, Icon, Layout, Text } from '@ui-kitten/components';
import React, { ReactElement } from 'react';
import { Image, StyleSheet } from 'react-native';

import styles from './author.scss';

interface Props {
  isHorizontal?: boolean;
  hasMenu?: boolean;
  renderMenu?: () => ReactElement | null;
}
const Author = ({
  isHorizontal = true,
  hasMenu = false,
  renderMenu = () => <></>,
}: Props) => {
  return (
    <Layout style={[isHorizontal ? styles.authorhorizontal : styles.author]}>
      <Avatar
        style={isHorizontal ? styles.avatarhorizontalpath : styles.avatar}
        source={require('../../assets/images/course.jpg')}
      />

      <Layout style={isHorizontal ? styles.infohorizontal : styles.info}>
        <Text style={styles.name} category="s1" numberOfLines={1}>
          AWS Operation
        </Text>

        {isHorizontal && (
          <Text style={styles.author} category="c2" appearance="hint">
            17 Sections
          </Text>
        )}
      </Layout>
    </Layout>
  );
};

const sstyles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 999,
    elevation: 6,
  },
});

export default Author;
