import { useNavigation } from '@react-navigation/native';
import { Icon, Layout, Text, useTheme } from '@ui-kitten/components';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import styles from './style.scss';
const Categories = ({ categories }) => {
  const navigate = useNavigation();
  const theme = useTheme();
  return (
    <Layout style={styles.margintopsmall}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigate.navigate('Category', {
              categoryId: category.id,
              title: category.name,
            })
          }
        >
          <Layout style={styles.categoryshow}>
            <Icon
              style={styles.btnicon}
              fill={theme['text-basic-color']}
              name="book-outline"
            />
            <Text category="c1" style={{ fontSize: 13 }}>
              {category.name}
            </Text>
          </Layout>
        </TouchableOpacity>
      ))}
    </Layout>
  );
};

export default Categories;
