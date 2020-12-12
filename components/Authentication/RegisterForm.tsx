import { Button, Layout } from '@ui-kitten/components';
import React, { ReactElement } from 'react';
import { useForm, Controller } from 'react-hook-form';

import Field from './LoginForm/Field';

interface Props {
  onChange: (
    field: 'username' | 'password' | 'confirmPassword',
    value: string
  ) => void;
  errors: any;
}

export default function RegisterForm({ onChange }: Props): ReactElement {
  const { control, handleSubmit, errors } = useForm();
  return (
    <Layout>
      <Field
        label="Username"
        control={control}
        name="username"
        placeholder="Input your username"
      />
      <Field
        label="Password"
        control={control}
        name="password"
        placeholder="Input your password"
      />

      <Field
        label="Confirm Password"
        control={control}
        name="username"
        placeholder="Input your confirm password"
      />
      <Field
        label="Email"
        control={control}
        name="email"
        placeholder="Input your email"
      />
      <Button>Register</Button>
    </Layout>
  );
}
