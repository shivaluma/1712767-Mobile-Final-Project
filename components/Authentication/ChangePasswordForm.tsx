import { Button, Layout, Spinner, Text } from '@ui-kitten/components';
import React, { ReactElement, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';

import { useSnackbar } from '../../context/snackbar/configureContext';
import Field from './LoginForm/Field';
import styles from './styles.scss';

interface Props {
  onChangePassword: (values: PasswordForm, setError: any) => void;
  navigation?: any;
}

export default function ChangePasswordForm({
  onChangePassword,
  navigation,
}: Props): ReactElement {
  const { control, handleSubmit, errors, setError, clearErrors } = useForm();
  const { state, dispatch } = useSnackbar() as SnackBarContextType;
  const [loading, setLoading] = useState<boolean>(false);
  React.useEffect(() => {
    if (errors.changepassword) {
      dispatch({
        type: 'SNACKBAR_CHANGE',
        payload: { show: true, content: errors.changepassword.message },
      });
      setTimeout(() => {
        clearErrors('changepassword');
      }, 1500);
    }
  }, [errors.changepassword]);

  return (
    <Layout>
      <Field
        label="Password"
        control={control}
        name="password"
        placeholder="Input your current password"
        error={errors.password}
      />
      <Field
        label="New Password"
        control={control}
        name="newpassword"
        placeholder="Input new password"
        error={errors.newpassword}
      />

      <Field
        label="Confirm Password"
        control={control}
        name="newpasswordconfirmation"
        placeholder="Input new password confirmation"
        error={errors.newpasswordconfirmation}
      />

      <Button
        style={styles.gap}
        onPress={() => {
          setLoading(() => true);
          handleSubmit((value) => {
            clearErrors('changepassword');
            onChangePassword(value as PasswordForm, setError);
          })();
          setLoading(() => false);
        }}
      >
        Change Password
      </Button>
    </Layout>
  );
}
