import { Button, Layout } from '@ui-kitten/components';
import React, { ReactElement } from 'react';

import Field from './LoginForm/Field';
import ProtectedField from './LoginForm/ProtectedField';

interface Props {
  onChange: (
    field: 'username' | 'password' | 'confirmPassword',
    value: string
  ) => void;
}

export default function RegisterForm({ onChange }: Props): ReactElement {
  return (
    <Layout>
      <Field
        label="Username"
        placeholder="Input your username"
        onChangeText={(text) => onChange('username', text)}
      />
      <ProtectedField
        label="Password"
        placeholder="Input your password"
        onChangeText={(text) => onChange('password', text)}
      />

      <ProtectedField
        label="Confirm Password"
        placeholder="Reinput your password"
        onChangeText={(text) => onChange('confirmPassword', text)}
      />

      <Button>Register</Button>
    </Layout>
  );
}
