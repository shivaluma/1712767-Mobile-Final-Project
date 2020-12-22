import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React from 'react';
import { Snackbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { AuthProvider } from './context/auth/configureContext';
import {
  SnackbarProvider,
  useSnackbar,
} from './context/snackbar/configureContext';
import { WishListProvider } from './context/wishlist/configureContext';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { default as themekitten } from './theme.json';
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const mappingTheme = colorScheme === 'dark' ? { ...themekitten } : {};
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <IconRegistry icons={EvaIconsPack} />

        <ApplicationProvider
          {...eva}
          theme={{ ...eva[colorScheme], ...mappingTheme }}
        >
          <AuthProvider>
            <WishListProvider>
              <SnackbarProvider>
                <Navigation colorScheme={colorScheme} />
                <Toast ref={(ref) => Toast.setRef(ref)} />
              </SnackbarProvider>
            </WishListProvider>
          </AuthProvider>
        </ApplicationProvider>
      </SafeAreaProvider>
    );
  }
}
