import { Button, Layout, Text } from '@ui-kitten/components';
import React, { ReactElement } from 'react';

import Field from './LoginForm/Field';
import ProtectedField from './LoginForm/ProtectedField';
import styles from './styles.scss';
interface Props {
  onChange: (
    field: 'username' | 'password' | 'confirmPassword',
    value: string
  ) => void;
  errors: any;
  onLogin: () => void;
}

export default function LoginForm({
  onChange,
  onLogin,
  errors,
}: Props): ReactElement {
  return (
    <Layout>
      <Field
        onChangeText={(value) => onChange('username', value)}
        label="Username"
        placeholder="Input your username"
      />
      <ProtectedField
        onChangeText={(value) => onChange('password', value)}
        label="Password"
        placeholder="Input your password"
      />
      {errors.auth && (
        <Text style={styles.gap} category="c2" status="danger">
          {errors.auth.message}
        </Text>
      )}
      <Button onPress={onLogin}>Login</Button>
    </Layout>
  );
}
