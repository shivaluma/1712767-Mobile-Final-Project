import { Button, Icon, Input, Layout, Text } from '@ui-kitten/components';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import ChangePasswordForm from '../components/Authentication/ChangePasswordForm';
import { changepassword } from '../services/authenticate';

const ChangePassword = (props) => {
  const { navigation } = props;
  const [success, setSuccess] = useState(false);
  const onChangePassword = async (values, setError) => {
    if (values.newpassword !== values.newpasswordconfirmation) {
      setError('newpassword', {
        type: 'manual',
        message: 'New password and confirmation do not match',
      });
      setError('newpasswordconfirmation', {
        type: 'manual',
        message: 'New password and confirmation do not match',
      });
      return;
    }

    try {
      const response = await changepassword(
        props.route.params.id,
        values.password,
        values.newpassword
      );
      console.log(response);
      setSuccess(true);
    } catch (err) {
      setError('changepassword', {
        type: 'manual',
        message: err.response.data.message,
      });
    }
  };
  return (
    <Layout style={styles.container}>
      {success ? (
        <Layout style={{ display: 'flex', alignItems: 'center' }}>
          <Icon
            fill="#28a745"
            style={{
              marginTop: 20,
              width: 70,
              height: 70,
              color: '#28a745',

              marginBottom: 30,
            }}
            name="checkmark-circle-2-outline"
          />
          <Text>Change password success.</Text>
        </Layout>
      ) : (
        <ChangePasswordForm
          onChangePassword={onChangePassword}
          navigation={navigation}
        />
      )}

      <Button
        style={{ marginTop: 10 }}
        appearance="ghost"
        onPress={() => {
          navigation.goBack();
        }}
      >
        Back to profile
      </Button>
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    textAlign: 'center',
    marginVertical: 10,
  },
  input: {
    marginVertical: 5,
  },
  submitButton: {
    marginVertical: 10,
  },
});

export default ChangePassword;
