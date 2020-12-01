import { Input, Layout, Text, Icon } from '@ui-kitten/components';
import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

interface Props {
  label: string;

  placeholder: string;
  onChangeText: (text: string) => void;
}

const ProtectedField = (props: Props) => {
  const { label, placeholder, onChangeText } = props;

  const [show, setShow] = useState(true);

  const toggleSecureEntry = () => setShow((prev) => !prev);

  const renderIcon = (props: unknown) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={!show ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <Layout>
      <Text style={styles.text} category="s2">
        {label}
      </Text>
      <Input
        style={styles.inputField}
        placeholder={placeholder}
        textContentType="oneTimeCode"
        accessoryRight={renderIcon}
        secureTextEntry={show}
        onChangeText={onChangeText}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 30,
  },

  form: {
    flex: 1,
    marginHorizontal: 20,
  },

  inputField: {
    marginBottom: 20,
  },

  text: {
    marginVertical: 4,
  },

  outlineButton: {
    marginTop: 4,
  },
});

export default ProtectedField;
