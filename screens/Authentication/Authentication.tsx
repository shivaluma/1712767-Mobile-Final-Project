import { Button, Layout } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import LoginForm from '../../components/Authentication/LoginForm';
import RegisterForm from '../../components/Authentication/RegisterForm';
import { useUser } from '../../context/auth/configureContext';
import * as authService from '../../services/authenticate';
import * as Storage from '../../utils/asyncStorage';

const LoginScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const context = useUser();
  const handleToggleMode = () => {
    setIsLogin((prev) => !prev);
  };

  const onLoginHandler = async (values: Authentication, setError: any) => {
    console.log('On login');
    console.log(values);

    try {
      const data = await authService.signin(values);
      console.log(data);

      Storage.storeData('accessToken', data.token);
      context?.dispatch({
        type: 'UPDATE_USER',
        payload: { user: data.userInfo },
      });
      navigation.navigate('Root', {
        email: values.email,
      });
    } catch (err) {
      console.log(err.response.data.message);
      setError('auth', {
        type: 'manual',
        message: err.response.data.message,
      });
    }
  };

  const onRegisterHandler = async (values: Authentication, setError: any) => {
    console.log('On Register');
    console.log(values);

    try {
      const data = await authService.signup(values);
      navigation.navigate('RegisterSuccess', {
        email: values.email,
      });
    } catch (err) {
      setError('auth', {
        type: 'manual',
        message: err.response.data.message,
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
            <RegisterForm onRegister={onRegisterHandler} />
            // <RegisterForm  />
          )}
          <Button appearance="ghost" onPress={onForgotPasswordHandler}>
            FORGOT PASSWORD?
          </Button>

          <Button onPress={handleToggleMode} appearance="ghost">
            {isLogin ? 'SIGN UP FREE' : 'LOGIN EXIST ACCOUNT!'}
          </Button>
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
