import { useNavigation } from '@react-navigation/native';
import { Layout, Text, Button } from '@ui-kitten/components';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';

import { CourseCard } from './CourseCard';
import styles from './styles/section.scss';
interface Props {
  name: string;
  children?: ReactElement;
  courses: Course[];
  apiKey: string;
}

const CourseSection = ({ name, children, courses, apiKey }: Props) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  return (
    <Layout style={styles.root}>
      <Layout style={styles.topbar}>
        <Text style={styles.title}>{name}</Text>
        <Button
          appearance="ghost"
          style={styles.seeall}
          onPress={() =>
            navigation.navigate('CourseList', {
              apiKey,
            })
          }
        >
          {t('see_all')}
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
