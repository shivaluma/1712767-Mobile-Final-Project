import { Button, Layout, Spinner, Text } from '@ui-kitten/components';
import React, { ReactElement, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';

import { useSnackbar } from '../../context/snackbar/configureContext';
import Field from './LoginForm/Field';
import styles from './styles.scss';
interface Props {
  onLogin: (values: Authentication, setError: any) => void;
}

export default function LoginForm({ onLogin }: Props): ReactElement {
  const { control, handleSubmit, errors, setError, clearErrors } = useForm();
  const { state, dispatch } = useSnackbar() as SnackBarContextType;
  const [loading, setLoading] = useState<boolean>(false);
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
        {errors.auth ? 'Oops!' : 'Login'}
      </Text>
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

      <Button
        style={styles.gap}
        onPress={() => {
          setLoading(() => true);
          handleSubmit((value) => {
            clearErrors('auth');
            onLogin(value as Authentication, setError);
          })();
          setLoading(() => false);
        }}
      >
        {loading ? <Spinner status="danger" size="small" /> : 'Login'}
      </Button>
    </Layout>
  );
}
