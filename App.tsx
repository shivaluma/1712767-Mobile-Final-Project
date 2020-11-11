import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React from 'react';
import { DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
          <Navigation colorScheme={colorScheme} />
        </ApplicationProvider>
      </SafeAreaProvider>
    );
  }
}
