import { Button, Layout, Text } from '@ui-kitten/components';
import React, { ReactElement, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';

import { useSnackbar } from '../../context/snackbar/configureContext';
import Field from './LoginForm/Field';

interface Props {
  onRegister: any;
}

export default function RegisterForm({ onRegister }: Props): ReactElement {
  const { control, handleSubmit, errors, setError, clearErrors } = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const { state, dispatch } = useSnackbar() as SnackBarContextType;
  React.useEffect(() => {
    if (errors.auth) {
      dispatch({
        type: 'SNACKBAR_CHANGE',
        payload: { show: true, content: errors.auth.message },
      });
      setTimeout(() => {
        clearErrors('auth');
      }, 1500);
    }
  }, [errors.auth]);

  return (
    <Layout>
      <Text
        style={{
          textAlign: 'center',
          paddingTop: 12,
          paddingBottom: 12,
          fontSize: 24,
          fontWeight: 'bold',
        }}
        category="s2"
        status="primary"
      >
        {errors.auth ? 'Oops!' : 'Register'}
      </Text>
      <Field
        label="Username"
        control={control}
        name="username"
        placeholder="Input your username"
        error={errors.username}
      />
      <Field
        label="Password"
        control={control}
        name="password"
        secureTextEntry
        placeholder="Input your password"
        error={errors.password}
      />

      <Field
        label="Phone"
        control={control}
        name="phone"
        placeholder="Phone"
        error={errors.phone}
      />
      <Field
        label="Email"
        control={control}
        name="email"
        placeholder="Input your email"
        error={errors.email}
      />
      <Button
        onPress={() => {
          setLoading(() => true);
          handleSubmit((value) => {
            clearErrors('auth');
            onRegister(value as AuthenticationForm, setError);
          })();
          setLoading(() => false);
        }}
      >
        Register
      </Button>
    </Layout>
  );
}
