import { Button, Layout, Spinner, Text } from '@ui-kitten/components';
import React, { ReactElement, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { useSnackbar } from '../../context/snackbar/configureContext';
import Field from './LoginForm/Field';
import styles from './styles.scss';

interface Props {
  data: ProfileForm;
  onChangeProfile: (values: ProfileForm, setError: any) => void;
  navigation?: any;
}

export default function ChangeProfileForm({
  data,
  onChangeProfile,
  navigation,
}: Props): ReactElement {
  const {
    control,
    handleSubmit,
    errors,
    setError,
    clearErrors,
    setValue,
  } = useForm();
  const { state, dispatch } = useSnackbar() as SnackBarContextType;
  const [loading, setLoading] = useState<boolean>(false);
  React.useEffect(() => {
    if (errors.changeprofile) {
      dispatch({
        type: 'SNACKBAR_CHANGE',
        payload: { show: true, content: errors.changeprofile.message },
      });
      setTimeout(() => {
        clearErrors('changeprofile');
      }, 1500);
    }
  }, [errors.changeprofile]);

  React.useEffect(() => {
    if (data) {
      Object.entries(data).map(([key, val]) => setValue(key, val));
    }
  }, [data]);

  return (
    <Layout>
      <Field
        label="Account Name"
        control={control}
        name="name"
        defaultValue={data.name}
        placeholder="Input name"
        error={errors.name}
      />
      <Field
        label="Phone Number"
        control={control}
        name="phone"
        defaultValue={data.phone}
        placeholder="Input phone number"
        error={errors.phone}
      />

      <Button
        style={styles.gap}
        onPress={() => {
          setLoading(() => true);
          handleSubmit((value) => {
            clearErrors('changeprofile');
            onChangeProfile(value as ProfileForm, setError);
          })();
          setLoading(() => false);
        }}
      >
        Save
      </Button>
    </Layout>
  );
}
