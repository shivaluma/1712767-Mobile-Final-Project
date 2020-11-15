import { useNavigation } from '@react-navigation/native';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import React, { ReactElement } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text as RText,
  TouchableNativeFeedback,
} from 'react-native';

import Stars from '../Rating/Star';
import styles from '../styles/coursecard.scss';

interface Props {
  isHorizontal?: boolean;
  hasMenu?: boolean;
  renderMenu?: () => ReactElement | null;
}
const CourseCard = ({
  isHorizontal = false,
  hasMenu = false,
  renderMenu = () => <></>,
}: Props) => {
  const navigation = useNavigation();
  return (
    <TouchableNativeFeedback
      onPress={() => navigation.navigate('CourseDetail')}
    >
      <Layout
        style={[
          isHorizontal ? styles.cardhorizontal : styles.card,
          !isHorizontal && sstyles.shadow,
        ]}
      >
        <Image
          style={isHorizontal ? styles.thumbnailhorizontal : styles.thumbnail}
          source={require('../../assets/images/course.jpg')}
        />

        <Layout style={styles.price}>
          <Text style={styles.pricetext}>129.99$</Text>
        </Layout>

        <Layout style={isHorizontal ? styles.infohorizontal : styles.info}>
          <Text style={styles.coursetitle} numberOfLines={1}>
            React - The Complete Guide (incl Hooks, React Router, Redux)
          </Text>

          <Text style={styles.author} appearance="hint">
            Maximilian Schwarzmuller
          </Text>

          <Text style={styles.description} appearance="hint">
            54 total hours - 162 lectures - All Levels
          </Text>

          <Layout style={styles.rating}>
            <Stars value={3} maxValue={5} />
            <Text style={styles.people} appearance="hint">
              (94,478 ratings)
            </Text>
          </Layout>
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
    </TouchableNativeFeedback>
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

export default CourseCard;
