import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout, Input } from 'react-native-ui-kitten';

const LoginScreen = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  return (
    <Layout style={styles.container}>
      <Layout>
        <Input
          placeholder="Place your Text"
          value={value}
          onChangeText={(nextValue) => setValue(nextValue)}
        />

        <Input
          placeholder="Place your Text"
          value={value}
          onChangeText={(nextValue) => setValue(nextValue)}
        />
        <Button>asdasd</Button>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  text: {
    marginHorizontal: 8,
  },
});

export default LoginScreen;
