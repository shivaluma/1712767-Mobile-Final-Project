import { Layout, Spinner, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
const SplashScreen = () => {
  return (
    <Layout style={styles.container}>
      <Text style={styles.text} category="s1">
        ShiroEdu
      </Text>
      <Spinner size="giant" />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
});

export default SplashScreen;
