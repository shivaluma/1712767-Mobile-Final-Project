import { Layout, Input, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';
interface Props {
  label: string;
  placeholder: string;

  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

const Field = (props: Props) => {
  const { label, placeholder, onChangeText, secureTextEntry = false } = props;
  return (
    <Layout>
      <Text style={styles.text} category="s2">
        {label}
      </Text>
      <Input
        style={styles.inputField}
        placeholder={placeholder}
        onChangeText={(value) => onChangeText(value)}
        secureTextEntry={secureTextEntry}
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

export default Field;
