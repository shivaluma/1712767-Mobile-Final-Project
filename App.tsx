import { ApplicationProvider, IconRegistry, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from './context/auth/configureContext';
import { SnackbarProvider } from './context/snackbar/configureContext';
import { ThemeProvider } from './context/theme/configureContext';
import { WishListProvider } from './context/wishlist/configureContext';
import WithTheme from './hoc/WithTheme';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';

import './i18n';
export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <IconRegistry icons={EvaIconsPack} />
        <ThemeProvider>
          <WithTheme>
            <AuthProvider>
              <WishListProvider>
                <SnackbarProvider>
                  <Navigation />
                </SnackbarProvider>
              </WishListProvider>
            </AuthProvider>
          </WithTheme>
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }
}
