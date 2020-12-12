import { Layout, Input, Text } from '@ui-kitten/components';
import React from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet } from 'react-native';
interface Props {
  label: string;
  placeholder: string;
  control: any;
  name: string;
  secureTextEntry?: boolean;
  rules?: any;
  error: any;
}

const Field = (props: Props) => {
  const {
    label,
    name,
    control,
    secureTextEntry = false,
    rules = { required: true },
    error,
  } = props;

  return (
    <Layout>
      <Text style={styles.text} category="s2">
        {label}
      </Text>

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            onBlur={onBlur}
            secureTextEntry={secureTextEntry}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name={name}
        rules={{ required: true }}
      />

      {error && (
        <Text style={styles.gap} category="c2" status="danger">
          This is required!
        </Text>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 30,
  },

  gap: {
    marginBottom: 8,
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
