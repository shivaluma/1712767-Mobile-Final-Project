import { Button, Icon, Input, Layout, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

const AlertIcon = (props: unknown) => (
  <Icon {...props} name="alert-circle-outline" />
);

type Props = {
  navigation: unknown;
};

export default function VerifyPassword(props: Props) {
  const [value, setValue] = useState({ token: '', password: '' });
  const size = 'large';
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const { navigation } = props;
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props: unknown) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );
  return (
    <Layout style={styles.container}>
      <Text status="basic" category="h6" style={styles.header}>
        Change password
      </Text>
      <Input
        style={styles.input}
        value={value.password}
        label="Token"
        placeholder=""
        caption="Token received on email"
        captionIcon={AlertIcon}
        size={size}
        onChangeText={(nextValue) => setValue({ ...value, token: nextValue })}
      />
      <Input
        style={styles.input}
        value={value.password}
        label="New Password"
        placeholder=""
        caption="Should contain at least 8 symbols"
        accessoryRight={renderIcon}
        captionIcon={AlertIcon}
        size={size}
        secureTextEntry={secureTextEntry}
        onChangeText={(nextValue) => setValue({ ...value, token: nextValue })}
      />
      <Input
        style={styles.input}
        value={value.password}
        label="Confirm Password"
        placeholder=""
        accessoryRight={renderIcon}
        size={size}
        secureTextEntry={secureTextEntry}
        onChangeText={(nextValue) => setValue({ ...value, token: nextValue })}
      />

      <Button style={styles.loginButton} onPress={() => navigation.popToTop()}>
        Change password
      </Button>
      <Button
        appearance="outline"
        style={styles.loginButton}
        onPress={() => navigation.goBack()}
      >
        CANCEL
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
