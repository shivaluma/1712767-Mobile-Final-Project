import { Button, Input, Layout, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';

import Field from '../../components/Authentication/LoginForm/Field';
import { forgetpassemail } from '../../services/authenticate';
export default function ForgetPassword(props) {
  const [value, setValue] = useState('');
  const { navigation } = props;

  const size = 'large';

  const { control, handleSubmit, errors, setError, clearErrors } = useForm();

  const onSubmit = async (values: any) => {
    try {
      const data = await forgetpassemail(values.email);
      navigation.navigate('RegisterSuccess', {
        email: values.email,
        forgot: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout style={styles.container}>
      <Text status="basic" category="h6" style={styles.header}>
        Enter your email address and we will send you a link to reset your
        password
      </Text>
      <Field
        label="Email"
        control={control}
        name="email"
        rules={{
          required: 'Must not be empty',
          pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Not a valid email',
          },
        }}
        placeholder="Input your email"
        error={errors.email}
      />

      <Button style={styles.loginButton} onPress={handleSubmit(onSubmit)}>
        Send email
      </Button>
      <Button
        appearance="outline"
        style={styles.loginButton}
        onPress={() => navigation.goBack()}
      >
        CANCEL
      </Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
  },
  header: {
    textAlign: 'center',
    marginBottom: 40,
  },
  loginButton: {
    marginTop: 20,
    borderRadius: 10,
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
  },
  input: {
    marginTop: 10,
  },
});
