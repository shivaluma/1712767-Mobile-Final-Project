import { Button, Layout, Text } from '@ui-kitten/components';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';

import * as authService from '../../services/authenticate';

type Props = {
  navigation: unknown;
  route: unknown;
};

export default function RegisterSuccess(props: Props) {
  const { navigation } = props;
  console.log(props);

  const [timer, setTimer] = useState(30);
  const intervalRef = useRef(null);

  const decreaseNum = () => setTimer((prev) => prev - 1);
  useEffect(() => {
    intervalRef.current = setInterval(decreaseNum, 1000);
    return () => clearInterval(intervalRef.current);
  }, [timer]);

  const handleSendEmail = async () => {
    setTimer(30);
    try {
      const data = await authService.resendemail(props?.route?.params.email);
      console.log(data);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <Layout style={styles.container}>
      <Text status="basic" category="h6" style={styles.header}>
        Register Success
      </Text>

      <Text category="s1">
        We have sent you an email to verify for email, please check your email
        and complete the verification. If you did not receive any email. press
        the below button to receive new one {timer > 0 && `in ${timer} seconds`}
        .
      </Text>
      <Button
        disabled={timer > 0}
        style={styles.loginButton}
        onPress={handleSendEmail}
      >
        Resend email
      </Button>
      <Button
        appearance="outline"
        style={styles.loginButton}
        onPress={() =>
          navigation.reset({
            routes: [{ name: 'Login' }],
          })
        }
      >
        Back to login
      </Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
  },
  header: {
    textAlign: 'center',
    marginBottom: 40,
  },
  loginButton: {
    marginTop: 20,
    borderRadius: 10,
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
  },
  input: {
    marginTop: 10,
  },
});
