import { Button, Icon, Layout, Text, useTheme } from '@ui-kitten/components';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import CourseLesson from '../CourseLesson/CourseLesson';
import styles from './style.scss';

type Props = {
  section: Section;
};

const LessonSection = ({ section }: Props) => {
  const theme = useTheme();
  const [isExpand, setExpand] = useState(() => false);
  const sstyles = StyleSheet.create({
    btn: {
      backgroundColor: theme['color-basic-transparent-300'],
    },
    wrap: {
      flexWrap: 'wrap',
      flexShrink: 1,
      flexBasis: '80%',
    },
  });

  const handleChangeExpand = () => setExpand((prev) => !prev);
  return (
    <Layout key={section.id} style={[styles.section, sstyles.btn]}>
      <Layout style={styles.row}>
        <Layout style={[styles.nobg, sstyles.wrap]}>
          <Text category="s1">{section.name}</Text>
        </Layout>
        <Button
          style={styles.button}
          appearance="ghost"
          status="danger"
          accessoryLeft={(props) => (
            <Icon
              {...props}
              name={isExpand ? `minus-outline` : `plus-outline`}
            />
          )}
          onPress={handleChangeExpand}
        />
      </Layout>

      {isExpand &&
        section.lesson.map((lesson, index) => (
          <CourseLesson lesson={lesson} index={index} key={index} />
        ))}
    </Layout>
  );
};

export default LessonSection;
