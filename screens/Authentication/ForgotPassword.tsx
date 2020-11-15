import { Layout } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Field from '../../components/Authentication/LoginForm/Field';
interface Props {}

const ForgotPassword = (props: Props) => {
  const [formData, setFormData] = useState({ email: '' });

  const handleChangeValue = (field: 'email', value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const onEmailChange = (email: string) => {
    handleChangeValue('email', email);
  };

  return (
    <Layout style={styles.container}>
      <KeyboardAwareScrollView>
        <Layout style={styles.form}>
          <Field
            label="email"
            value={formData.email}
            placeholder="Input or email adddress..."
            onChangeText={onEmailChange}
          />
        </Layout>
      </KeyboardAwareScrollView>
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

export default ForgotPassword;
