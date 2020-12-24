import { Layout, Input, Text, Icon } from '@ui-kitten/components';
import React, { useState } from 'react';
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
  defaultValue?: string;
}

const Field = (props: Props) => {
  const {
    label,
    name,
    control,
    secureTextEntry = false,
    rules = { required: true },
    error,
    defaultValue,
  } = props;
  console.log(defaultValue);
  const [isSecured, setSecured] = useState(false);

  return (
    <Layout style={{ marginBottom: 20 }}>
      <Text style={styles.text} category="s2">
        {label}
      </Text>

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            onBlur={onBlur}
            secureTextEntry={isSecured}
            status={error ? 'danger' : 'basic'}
            autoCapitalize="none"
            onChangeText={(value) => onChange(value)}
            onFocus={() => setSecured(secureTextEntry)}
            caption={
              error && (
                <Text style={styles.gap} category="c2" status="danger">
                  This is required!
                </Text>
              )
            }
            value={value}
          />
        )}
        name={name}
        rules={{ required: true }}
        defaultValue=""
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
