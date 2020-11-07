import React, { ReactElement } from 'react';
import { Button, Layout } from 'react-native-ui-kitten';

import Field from './LoginForm/Field';

interface Props {
  value: AuthenticationForm;
  onChange: (
    field: 'username' | 'password' | 'confirmPassword',
    value: string
  ) => void;
}

export default function LoginForm({ value, onChange }: Props): ReactElement {
  return (
    <Layout>
      <Field
        label="Username"
        placeholder="Input your username"
        value={value.username}
        onChangeText={(text) => onChange('username', text)}
      />
      <Field
        label="Password"
        placeholder="Input your password"
        value={value.password}
        secureTextEntry
        onChangeText={(text) => onChange('password', text)}
      />

      <Button>Login</Button>
    </Layout>
  );
}
