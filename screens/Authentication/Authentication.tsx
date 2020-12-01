import { Button, Layout } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import LoginForm from '../../components/Authentication/LoginForm';
import RegisterForm from '../../components/Authentication/RegisterForm';
import { users } from '../../data/users';
interface Props {
  navigation: NavigationProp;
}

const LoginScreen = ({ navigation }) => {
  const [authData, setAuthData] = useState<AuthenticationForm>({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const {
    handleSubmit,
    setValue,
    getValues,
    register,
    setError,
    errors,
    clearErrors,
  } = useForm();

  useEffect(() => {
    register('username');
    register('password');
    register('confirmPassword');
  }, [register]);

  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleChangeValue = (
    field: 'username' | 'password' | 'confirmPassword',
    value: string
  ) => {
    setValue(field, value);
  };

  const values = getValues();
  const handleToggleMode = () => {
    clearErrors();
    setIsLogin((prev) => !prev);
  };

  const onLoginHandler = () => {
    navigation.reset({
      routes: [{ name: 'Root' }],
    });
    // console.log('On login');
    // console.log(users);
    // const index = users.findIndex(
    //   (el) =>
    //     el?.username?.toLowerCase() === values?.username?.toLowerCase() &&
    //     el.password === values.password
    // );

    // if (index >= 0) {
    //   navigation.navigate('Root');
    // } else {
    //   setError('auth', {
    //     type: 'manual',
    //     message: 'Wrong Username or Password!',
    //   });
    // }
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
              onChange={handleChangeValue}
              onLogin={onLoginHandler}
              errors={errors}
            />
          ) : (
            <RegisterForm errors={errors} onChange={handleChangeValue} />
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
