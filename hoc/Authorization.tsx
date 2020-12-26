import { useNavigation } from '@react-navigation/native';
import { Card, Modal, Text, Button } from '@ui-kitten/components';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { useUser } from '../context/auth/configureContext';

const Authorization = (props) => {
  const [show, setShow] = useState(false);
  const userContext = useUser() as UserContextType;

  const noUserCallbacks = React.useCallback(() => setShow((prev) => true), []);
  const navigation = useNavigation();
  return (
    <>
      {props.render(userContext.state.user ? props.onPress : noUserCallbacks)}
      <Modal
        visible={show}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setShow(false)}
      >
        <Card disabled>
          <Text style={styles.gap}>You need to login to do this action.</Text>
          <Button
            appearance="ghost"
            status="danger"
            onPress={() => setShow(false)}
          >
            Cancel
          </Button>
          <Button
            appearance="ghost"
            status="danger"
            onPress={() => {
              setShow(false);
              navigation.reset({
                routes: [{ name: 'Login' }],
              });
            }}
          >
            Login
          </Button>
        </Card>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  gap: { marginBottom: 15 },
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Authorization;
