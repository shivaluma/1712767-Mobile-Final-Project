import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderBackButton,
} from '@react-navigation/stack';
import { Avatar, useTheme, Text } from '@ui-kitten/components';
import * as React from 'react';
import { Button, ColorSchemeName } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Snackbar } from 'react-native-paper';

import { useSnackbar } from '../context/snackbar/configureContext';
import LoginScreen from '../screens/Authentication/Authentication';
import ForgetPassword from '../screens/Authentication/ForgetPassword';
import RegisterSuccess from '../screens/Authentication/RegisterSuccess';
import VerifyPassword from '../screens/Authentication/VerifyPassword';
import CourseListScreen from '../screens/CourseListScreen';
import CourseDetailScreen from '../screens/DetailCourseScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import PathScreen from '../screens/PathScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingScreen from '../screens/SettingScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const { state, dispatch } = useSnackbar() as SnackBarContextType;
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
      <Snackbar
        visible={state.show as boolean}
        duration={state.duration as number}
        onDismiss={() =>
          dispatch({
            type: 'SNACKBAR_CHANGE',
            payload: { show: false },
          })
        }
        action={{
          label: 'Hide',
          onPress: () => {
            dispatch({
              type: 'SNACKBAR_CHANGE',
              payload: { show: false },
            });
          },
        }}
      >
        <Text>{state.content}</Text>
      </Snackbar>
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Root"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="RegisterSuccess" component={RegisterSuccess} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="VerifyPassword" component={VerifyPassword} />
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen
        name="Path"
        component={PathScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="CourseDetail"
        component={CourseDetailScreen}
        options={{
          headerShown: true,
          title: '',
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="CourseList"
        component={CourseListScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} />
    </Stack.Navigator>
  );
}
