import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Layout, Input, Text } from 'react-native-ui-kitten';

import LoginForm from '../../components/Authentication/LoginForm';
import RegisterForm from '../../components/Authentication/RegisterForm';

const LoginScreen = () => {
  const [authData, setAuthData] = useState<AuthenticationForm>({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleChangeValue = (
    field: 'username' | 'password' | 'confirmPassword',
    value: string
  ) => {
    setAuthData({ ...authData, [field]: value });
  };

  const handleToggleMode = () => setIsLogin((prev) => !prev);

  return (
    <Layout style={styles.container}>
      <KeyboardAwareScrollView>
        <Layout style={styles.form}>
          {isLogin ? (
            <LoginForm value={authData} onChange={handleChangeValue} />
          ) : (
            <RegisterForm value={authData} onChange={handleChangeValue} />
          )}
          <Button appearance="ghost">FORGOT PASSWORD?</Button>
          {isLogin ? (
            <Button onPress={handleToggleMode} appearance="ghost">
              SIGN UP FREE
            </Button>
          ) : (
            <Button onPress={handleToggleMode} appearance="ghost">
              LOGIN EXIST ACCOUNT!
            </Button>
          )}
        </Layout>
      </KeyboardAwareScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 30,
  },

  form: {
    flex: 1,
    marginHorizontal: 20,
  },

  inputField: {
    marginBottom: 20,
  },

  text: {
    marginVertical: 4,
  },

  outlineButton: {
    marginTop: 4,
  },
});

export default LoginScreen;
