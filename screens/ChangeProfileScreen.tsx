import { Button, Icon, Input, Layout, Text } from '@ui-kitten/components';
import React, { useContext, useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import ChangeProfileForm from '../components/Authentication/ChangeProfileForm';
import { useUser } from '../context/auth/configureContext';
import { changeprofile } from '../services/authenticate';

const ChangeProfile = (props) => {
  const { navigation } = props;
  const [success, setSuccess] = useState(false);
  const { state, dispatch } = useUser() as UserContextType;
  const onChangeProfile = async (values, setError) => {
    try {
      const response = await changeprofile(values);
      dispatch({ type: 'UPDATE_USER', payload: { user: response.payload } });
      setSuccess(true);
    } catch (err) {
      console.log(err.response);
      setError('changeprofile', {
        type: 'manual',
        message: err.response.data.message,
      });
    }
  };

  const data = {
    name: state?.user?.name || '',
    phone: state?.user?.phone || '',
  };

  console.log(data);
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
        <ChangeProfileForm
          onChangeProfile={onChangeProfile}
          navigation={navigation}
          data={data}
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

export default ChangeProfile;
