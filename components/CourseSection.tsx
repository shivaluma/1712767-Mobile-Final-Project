import { useNavigation } from '@react-navigation/native';
import { Layout, Text, Button } from '@ui-kitten/components';
import React, { ReactElement } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { CourseCard } from './CourseCard';
import styles from './styles/section.scss';
interface Props {
  name: string;
  children?: ReactElement;
  courses: Course[];
}

const CourseSection = ({ name, children, courses }: Props) => {
  const navigation = useNavigation();
  return (
    <Layout style={styles.root}>
      <Layout style={styles.topbar}>
        <Text style={styles.title}>{name}</Text>
        <Button
          appearance="ghost"
          style={styles.seeall}
          onPress={() =>
            navigation.navigate('CourseList', {
              category: name === 'Featured' ? null : name,
            })
          }
        >
          See all
        </Button>
      </Layout>
      <Layout>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </ScrollView>
      </Layout>
    </Layout>
  );
};

export default CourseSection;
