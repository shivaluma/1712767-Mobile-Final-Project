import { Button, Layout } from '@ui-kitten/components';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import LoginForm from '../../components/Authentication/LoginForm';
import RegisterForm from '../../components/Authentication/RegisterForm';

interface Props {
  navigation: NavigationProp;
}

const LoginScreen = ({ navigation }) => {
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

  const onLoginHandler = () => {
    navigation.navigate('Root');
  };

  const onForgotPasswordHandler = () => {
    navigation.navigate('ForgetPassword');
  };

  return (
    <Layout style={styles.container}>
      <KeyboardAwareScrollView>
        <Layout style={styles.form}>
          {isLogin ? (
            <LoginForm
              value={authData}
              onChange={handleChangeValue}
              onLogin={onLoginHandler}
            />
          ) : (
            <RegisterForm value={authData} onChange={handleChangeValue} />
          )}
          <Button appearance="ghost" onPress={onForgotPasswordHandler}>
            FORGOT PASSWORD?
          </Button>
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
