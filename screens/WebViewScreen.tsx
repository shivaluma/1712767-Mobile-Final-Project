import React from 'react';
import { WebView } from 'react-native-webview';

const WebViewScreen = (props: any) => {
  return (
    <WebView
      source={{ uri: props?.route?.params?.url }}
      style={{ marginTop: 20 }}
    />
  );
};

export default WebViewScreen;
