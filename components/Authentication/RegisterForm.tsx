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
}

export default function RegisterForm({ value, onChange }: Props): ReactElement {
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

      <ProtectedField
        label="Confirm Password"
        placeholder="Reinput your password"
        value={value.confirmPassword}
        onChangeText={(text) => onChange('confirmPassword', text)}
      />

      <Button>Register</Button>
    </Layout>
  );
}
