import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderBackButton,
} from '@react-navigation/stack';
import { Avatar, useTheme, Text, Button, Icon } from '@ui-kitten/components';
import * as Sharing from 'expo-sharing';
import * as React from 'react';
import { useEffect } from 'react';
import { ColorSchemeName, Share } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Snackbar } from 'react-native-paper';

import { useUser } from '../context/auth/configureContext';
import { useSnackbar } from '../context/snackbar/configureContext';
import LoginScreen from '../screens/Authentication/Authentication';
import ForgetPassword from '../screens/Authentication/ForgetPassword';
import RegisterSuccess from '../screens/Authentication/RegisterSuccess';
import VerifyPassword from '../screens/Authentication/VerifyPassword';
import CategoryScreen from '../screens/CategoryCourse';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import ChangeProfileScreen from '../screens/ChangeProfileScreen';
import CourseListScreen from '../screens/CourseListScreen';
import CourseDetailScreen from '../screens/DetailCourseScreen';
import Instructor from '../screens/Instructor/Instuctor';
import NotFoundScreen from '../screens/NotFoundScreen';
import PathScreen from '../screens/PathScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingScreen from '../screens/SettingScreen';
import SplashScreen from '../screens/SplashScreen';
import VideoCourseScreen from '../screens/VideoCourseScreen';
import { me } from '../services/authenticate';
import { RootStackParamList } from '../types';
import { getData } from '../utils/asyncStorage';
import API from '../utils/axios';
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
  const userContext = useUser();
  const [courseId, setCourseId] = React.useState('');
  useEffect(() => {
    (async () => {
      try {
        const user = await me();

        userContext?.dispatch({
          type: 'UPDATE_USER',
          payload: { user: user.payload, hasInit: true },
        });
      } catch (err) {
        userContext?.dispatch({
          type: 'UPDATE_USER',
          payload: { user: null, hasInit: true },
        });
      }
    })();
  }, []);
  if (!userContext?.state.hasInit) return <SplashScreen />;

  console.log(courseId);

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
        options={{
          headerShown: true,
          title: '',
          headerRight: () => (
            <Button
              onPress={async () => {
                try {
                  const result = await Share.share({
                    title: 'Share courses',
                    message: `Share courses : http://dev.letstudy.org/course-detail/${courseId}`,
                    url: `http://dev.letstudy.org/course-detail/${courseId}`,
                  });
                  if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                      // shared with activity type of result.activityType
                    } else {
                      // shared
                    }
                  } else if (result.action === Share.dismissedAction) {
                    // dismissed
                  }
                } catch (error) {
                  alert(error.message);
                }
              }}
              appearance="ghost"
              accessoryLeft={(props) => (
                <Icon {...props} name="share-outline" />
              )}
            />
          ),
        }}
      >
        {(props) => <CourseDetailScreen {...props} setCourseId={setCourseId} />}
      </Stack.Screen>
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

      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ headerShown: true }}
      />

      <Stack.Screen
        name="ChangeProfile"
        component={ChangeProfileScreen}
        options={{ headerShown: true }}
      />

      <Stack.Screen
        name="VideoCourse"
        component={VideoCourseScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Instructor"
        component={Instructor}
        options={{ headerShown: true }}
      />

      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={{ headerShown: true }}
      />

      <Stack.Screen name="NotFound" component={NotFoundScreen} />
    </Stack.Navigator>
  );
}
