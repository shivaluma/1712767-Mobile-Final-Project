import { Button, Layout, Text } from '@ui-kitten/components';
import React, { ReactElement } from 'react';
import { useForm, Controller } from 'react-hook-form';

import Field from './LoginForm/Field';
import styles from './styles.scss';
interface Props {
  onLogin: (values: Authentication, setError: any) => void;
}

export default function LoginForm({ onLogin }: Props): ReactElement {
  const { control, handleSubmit, errors, setError } = useForm();

  return (
    <Layout>
      <Field
        label="Email"
        control={control}
        name="email"
        placeholder="Input your email"
        error={errors.email}
      />
      <Field
        label="Password"
        control={control}
        name="password"
        placeholder="Input your username"
        secureTextEntry
        error={errors.password}
      />
      {errors.auth && (
        <Text style={styles.gap} category="c2" status="danger">
          {errors.auth.message}
        </Text>
      )}
      <Button
        onPress={handleSubmit((value) =>
          onLogin(value as Authentication, setError)
        )}
      >
        Login
      </Button>
    </Layout>
  );
}
