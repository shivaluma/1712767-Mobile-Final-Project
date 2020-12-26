import { Layout, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';

import CourseSection from '../../components/CourseSection';
import Loading from '../../components/Loading';
import { getinstructor } from '../../services/instructor';

const Instructor = (props) => {
  const [instructor, setInstructor] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getinstructor(props.route.params.instructorId);
        console.log('==============');
        console.log(data);

        setInstructor(() => data);
      } catch (err) {
        console.log(err.response);
      }
    })();
  }, []);

  return instructor ? (
    <ScrollView>
      <Layout style={styles.root}>
        <Layout style={styles.info}>
          <Image
            style={styles.image}
            source={{ uri: instructor.avatar }}
          ></Image>
          <Text style={styles.gap} category="s1">
            {instructor.name}
          </Text>

          <Text style={styles.gap} category="c1">
            {instructor.intro}
          </Text>

          <Layout style={styles.flexrow}>
            <Layout style={[styles.flexrow1, styles.rightBorder]}>
              <Text category="s2">{instructor.soldNumber}</Text>
              <Text style={styles.gap} category="s2">
                Students
              </Text>
            </Layout>
            <Layout style={[styles.flexrow1, styles.rightBorder]}>
              <Text category="s2">{instructor.totalCourse}</Text>
              <Text style={styles.gap} category="s2">
                Courses
              </Text>
            </Layout>
            <Layout style={styles.flexrow1}>
              <Text category="s2">
                {Number(instructor.averagePoint).toFixed(1)} / 5
              </Text>
              <Text style={styles.gap} category="s2">
                Rating
              </Text>
            </Layout>
          </Layout>
        </Layout>
        <Layout style={styles.bigGap} category="s1">
          <CourseSection
            courses={instructor.courses}
            name={`Courses by ${instructor.name}`}
          />
        </Layout>

        <Text style={styles.bigGap} category="s1">
          Contact
        </Text>

        <Text style={styles.bigGap} category="p1">
          Email : {instructor.email}
        </Text>

        <Text style={styles.bigGap} category="p1">
          Phone : {instructor.phone}
        </Text>
      </Layout>
    </ScrollView>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, padding: 10 },
  image: { width: 80, height: 80 },
  info: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  gap: {
    marginTop: 7,
  },
  bigGap: {
    marginTop: 15,
  },
  flexrow: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  rightBorder: {
    borderRightWidth: 1,
    borderColor: 'white',
  },

  flexrow1: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Instructor;
