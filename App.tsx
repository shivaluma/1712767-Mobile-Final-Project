import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { Snackbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from './context/auth/configureContext';
import { SnackbarProvider } from './context/snackbar/configureContext';
import { WishListProvider } from './context/wishlist/configureContext';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { default as themekittelight } from './styles/theme-light.json';
import { default as themekittedark } from './theme.json';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const mappingTheme =
    colorScheme === 'dark' ? { ...themekittedark } : { ...themekittelight };
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
              </SnackbarProvider>
            </WishListProvider>
          </AuthProvider>
        </ApplicationProvider>
      </SafeAreaProvider>
    );
  }
}
