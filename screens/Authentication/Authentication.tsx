import { Button, Layout } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import LoginForm from '../../components/Authentication/LoginForm';
import RegisterForm from '../../components/Authentication/RegisterForm';
import * as authService from '../../services/authenticate';

const LoginScreen = ({ navigation }) => {
  const [authData, setAuthData] = useState<AuthenticationForm>({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleToggleMode = () => {
    setIsLogin((prev) => !prev);
  };

  const onLoginHandler = async (values: Authentication, setError: any) => {
    console.log('On login');
    console.log(values);

    Alert.alert(values.email);
    try {
      const data = await authService.signin(values);
      console.log(data);
    } catch (err) {
      setError('auth', {
        type: 'manual',
        message: 'Wrong Username or Password!',
      });
    }
  };

  const onForgotPasswordHandler = () => {
    navigation.navigate('ForgetPassword');
  };

  return (
    <Layout style={styles.container}>
      <KeyboardAwareScrollView>
        <Layout style={styles.form}>
          {isLogin ? (
            <LoginForm onLogin={onLoginHandler} />
          ) : (
            <> </>
            // <RegisterForm  />
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
