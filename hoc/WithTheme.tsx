import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Text } from '@ui-kitten/components';
import React from 'react';

import { useThemeValue } from '../context/theme/configureContext';
import { default as themekittelight } from '../styles/theme-light.json';
import { default as themekittedark } from '../theme.json';
const WithTheme = ({ children }: any) => {
  const theme = useThemeValue();
  const mappingTheme = !theme?.state?.isLight
    ? { ...themekittedark }
    : { ...themekittelight };
  return (
    <ApplicationProvider
      {...eva}
      theme={{
        ...eva[theme?.state?.isLight ? 'light' : 'dark'],
        ...mappingTheme,
      }}
    >
      {children}
    </ApplicationProvider>
  );
};

export default WithTheme;
