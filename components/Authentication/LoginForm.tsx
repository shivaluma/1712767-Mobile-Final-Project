import { Button, Layout } from '@ui-kitten/components';
import React, { ReactElement } from 'react';

import Field from './LoginForm/Field';
import ProtectedField from './LoginForm/ProtectedField';

interface Props {
  value: AuthenticationForm;
  onChange: (
    field: 'username' | 'password' | 'confirmPassword',
    value: string
  ) => void;
  onLogin: () => void;
}

export default function LoginForm({
  value,
  onChange,
  onLogin,
}: Props): ReactElement {
  return (
    <Layout>
      <Field
        label="Username"
        placeholder="Input your username"
        value={value.username}
        onChangeText={(text) => onChange('username', text)}
      />
      <ProtectedField
        label="Password"
        placeholder="Input your password"
        value={value.password}
        onChangeText={(text) => onChange('password', text)}
      />

      <Button onPress={onLogin}>Login</Button>
    </Layout>
  );
}
