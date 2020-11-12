import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import React, { ReactElement } from 'react';
import { Image, Platform, StyleSheet, Text as RText } from 'react-native';

import Stars from '../Rating/Star';
import styles from '../styles/coursecard.scss';

interface Props {
  isHorizontal?: boolean;
  hasMenu?: boolean;
  renderMenu?: () => ReactElement | null;
}
const PathCard = ({
  isHorizontal = true,
  hasMenu = false,
  renderMenu = () => <></>,
}: Props) => {
  return (
    <Layout
      style={[
        isHorizontal ? styles.pathcardhorizontal : styles.pathcard,
        !isHorizontal && sstyles.shadow,
      ]}
    >
      <Image
        style={
          isHorizontal ? styles.thumbnailhorizontalpath : styles.thumbnailpath
        }
        source={require('../../assets/images/course.jpg')}
      />

      <Layout style={isHorizontal ? styles.pathcontenthorizontal : styles.info}>
        <Text style={styles.coursetitle} category="s1" numberOfLines={1}>
          AWS Operation
        </Text>

        <Text style={styles.author} appearance="hint">
          17 Sections
        </Text>
      </Layout>
      {hasMenu && (
        <Layout style={styles.menucontainer}>
          <Button
            style={styles.button}
            appearance="ghost"
            status="basic"
            accessoryLeft={(props) => (
              <Icon {...props} name="more-vertical-outline" />
            )}
          />
        </Layout>
      )}
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

export default PathCard;
