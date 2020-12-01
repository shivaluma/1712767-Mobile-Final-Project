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
  course: Course;
}
const CourseCard = ({
  isHorizontal = false,
  hasMenu = false,
  renderMenu = () => <></>,
  course,
}: Props) => {
  const navigation = useNavigation();
  return (
    <TouchableNativeFeedback
      onPress={() => navigation.navigate('CourseDetail', { course })}
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
          <Text style={styles.pricetext}>{course.price}$</Text>
        </Layout>

        <Layout style={isHorizontal ? styles.infohorizontal : styles.info}>
          <Text style={styles.coursetitle} numberOfLines={1}>
            {course.title}
          </Text>

          <Text style={styles.author} appearance="hint">
            {course.instructorName}
          </Text>

          <Text style={styles.description} appearance="hint">
            {course.totalHours} total hours - {course.videoNumber} lectures -
            All Levels
          </Text>

          <Layout style={styles.rating}>
            <Stars value={course.ratedNumber} maxValue={5} />
            <Text style={styles.people} appearance="hint">
              ({course.soldNumber} ratings)
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
