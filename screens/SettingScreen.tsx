import { useNavigation } from '@react-navigation/native';
import { Avatar, Button, Divider, Layout, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const SettingScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(!isEnabled);
  const navigation = useNavigation();
  const SwitchButton = () => (
    <View>
      <Switch
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
  return (
    <Layout style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Avatar size="small" />
        </View>
        <Divider />
        <View style={styles.content}>
          <Button
            style={styles.button}
            status="control"
            appearance="ghost"
            size="large"
          >
            Account
          </Button>
          <Button
            style={styles.button}
            status="control"
            appearance="ghost"
            size="large"
          >
            Subscription
          </Button>
          <Button
            style={styles.button}
            status="control"
            appearance="ghost"
            size="large"
          >
            Communication Preferences
          </Button>
          <Button
            style={styles.button}
            status="control"
            size="large"
            appearance="ghost"
            accessoryRight={SwitchButton}
          >
            Require Wi-Fi for streaming
          </Button>
          <Button
            style={styles.button}
            status="control"
            size="large"
            appearance="ghost"
            accessoryRight={SwitchButton}
          >
            Require Wi-Fi for downloading
          </Button>
          <Button
            style={styles.button}
            status="control"
            size="large"
            appearance="ghost"
            accessoryRight={SwitchButton}
          >
            Show quiz at the end of video
          </Button>
          <Button
            style={styles.button}
            status="control"
            appearance="ghost"
            size="large"
          >
            Captions
          </Button>
          <Button
            style={styles.button}
            status="control"
            appearance="ghost"
            size="large"
          >
            Notifications
          </Button>
          <Button
            style={styles.button}
            status="control"
            appearance="ghost"
            size="large"
          >
            Advanced Options
          </Button>
          <Button
            style={styles.button}
            status="control"
            appearance="ghost"
            size="large"
          >
            Download location
          </Button>
        </View>
        <Divider />
        <Text style={styles.version} category="h6">
          App version: 1.0
        </Text>
        <Divider />
        <Button
          onPress={() => {
            navigation.reset({
              routes: [{ name: 'Login' }],
            });
          }}
          style={styles.buttonLogout}
          appearance="primary"
          size="large"
        >
          Log out
        </Button>
      </ScrollView>
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  content: {
    marginVertical: 20,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  version: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  buttonLogout: {
    margin: 10,
    borderRadius: 10,
  },
});
export default SettingScreen;
