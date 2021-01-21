import { Button, Layout } from '@ui-kitten/components';
import * as Google from 'expo-google-app-auth';
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

      await Storage.storeData('accessToken', data.token);
      context?.dispatch({
        type: 'UPDATE_USER',
        payload: { user: data.userInfo },
      });
      navigation.reset({
        routes: [{ name: 'Root' }],
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

  // prod : 796130238984-e42447a5pj2tn09vm76bprhb8aeq6giv.apps.googleusercontent.com
  // dev: 796130238984-u4emps1oln76qcd7mnlunld9a6joa70h.apps.googleusercontent.com
  const handleGoogleLogin = async () => {
    const { type, accessToken, user } = await Google.logInAsync({
      iosClientId: `796130238984-3g35877cuo3cgottjmq3df3mmnkr35hf.apps.googleusercontent.com`,
      androidClientId: `796130238984-e42447a5pj2tn09vm76bprhb8aeq6giv.apps.googleusercontent.com`,
      androidStandaloneAppClientId: `796130238984-tl61ul7k9tc2qrtej065uo01anojokv9.apps.googleusercontent.com`,
    });

    if (type === 'success') {
      console.log(user);
      const data = await authService.logingoogle(user.email, user.id);
      if (data.userInfo) {
        await Storage.storeData('accessToken', data.token);
        context?.dispatch({
          type: 'UPDATE_USER',
          payload: { user: data.userInfo },
        });
        navigation.reset({
          routes: [{ name: 'Root' }],
        });
      } else {
        await Storage.storeData('accessToken', data.token);
        const userData = await authService.me();
        context?.dispatch({
          type: 'UPDATE_USER',
          payload: { user: userData.payload },
        });
        navigation.reset({
          routes: [{ name: 'Root' }],
        });
      }
    }
    if (type === 'cancel') {
    }
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

          <Button
            appearance="outline"
            status="danger"
            onPress={handleGoogleLogin}
          >
            Sign in with Google
          </Button>
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
