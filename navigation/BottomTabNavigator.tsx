import { Ionicons } from '@expo/vector-icons';
// import AnimatedTabBar, {
//   TabsConfig,
//   BubbleTabBarItemConfig,
// } from '@gorhom/animated-tabbar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Avatar,
  Button,
  Icon,
  Input,
  Layout,
  useTheme,
} from '@ui-kitten/components';
import * as React from 'react';
import { useState } from 'react';
import { Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import Colors from '../constants/Colors';
import { useUser } from '../context/auth/configureContext';
import useColorScheme from '../hooks/useColorScheme';
import FeatureScreen from '../screens/FeatureScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import SettingScreen from '../screens/SettingScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import WishListScreen from '../screens/WishListScreen';
import {
  BottomTabParamList,
  SearchScreenParamList,
  FeatureParamList,
  TabTwoParamList,
  ProfileParamList,
  WishListParamList,
} from '../types';
import styles from './styles/main.scss';
const BottomTab = createBottomTabNavigator<BottomTabParamList>();
export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Feature"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Feature"
        component={FeatureNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon style={styles.icon} fill={color} name="star" />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon style={styles.icon} fill={color} name="grid-outline" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon style={styles.icon} fill={color} name="person-outline" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Wish List"
        component={WishListNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon style={styles.icon} fill={color} name="heart-outline" />
          ),
        }}
      />

      <BottomTab.Screen
        name="Search"
        component={SearchScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon style={styles.icon} fill={color} name="search" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const FeatureStack = createStackNavigator<FeatureParamList>();

function FeatureNavigator() {
  const theme = useTheme();
  const context = useUser();
  console.log(context?.state);
  const navigation = useNavigation();
  return (
    <FeatureStack.Navigator mode="modal">
      <FeatureStack.Screen
        name="FeatureScreen"
        component={FeatureScreen}
        options={{
          headerShown: true,

          headerRight: () => (
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate(
                  context?.state.user === null ? 'Login' : 'Profile'
                )
              }
            >
              {context?.state.user === null ? (
                <Button
                  onPress={() => navigation.navigate('Login')}
                  appearance="ghost"
                >
                  Sign In
                </Button>
              ) : (
                <Avatar
                  style={{ marginRight: 10 }}
                  size="medium"
                  source={require('../assets/images/avatar.jpg')}
                />
              )}
            </TouchableWithoutFeedback>
          ),
          headerStyle: {
            backgroundColor: theme['background-basic-color-1'],
          },
        }}
      />
    </FeatureStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{
          headerShown: true,

          headerRight: () => (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Profile')}
            >
              <Avatar
                style={{ marginRight: 10 }}
                size="medium"
                source={require('../assets/images/avatar.jpg')}
              />
            </TouchableWithoutFeedback>
          ),
          headerStyle: {
            backgroundColor: theme['background-basic-color-1'],
          },
        }}
      />
    </TabTwoStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<ProfileParamList>();

function ProfileNavigator() {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={SettingScreen}
        options={{
          headerShown: true,

          headerStyle: {
            backgroundColor: theme['background-basic-color-1'],
          },
        }}
      />
    </ProfileStack.Navigator>
  );
}

const WishListStack = createStackNavigator<WishListParamList>();

function WishListNavigator() {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <WishListStack.Navigator>
      <WishListStack.Screen
        name="WishList"
        component={WishListScreen}
        options={{
          headerShown: true,

          headerStyle: {
            backgroundColor: theme['background-basic-color-1'],
          },
        }}
      />
    </WishListStack.Navigator>
  );
}

const SearchScreenStack = createStackNavigator<SearchScreenParamList>();
function SearchScreenNavigator() {
  const theme = useTheme();

  const CartIcon = ({ ...props }) => (
    <Icon name="shopping-cart-outline" {...props} />
  );

  const sstyles = StyleSheet.create({
    layout: {
      display: 'flex',
      flexDirection: 'row',
      paddingTop: 20,
      width: Dimensions.get('window').width,
    },

    headerWidth: {
      flex: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 15,
    },
  });

  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <SearchScreenStack.Navigator>
      <SearchScreenStack.Screen
        options={{
          headerShown: true,
          headerTitle: () => null,
          headerLeft: () => (
            <Layout style={sstyles.layout}>
              <Input
                size="large"
                value={searchQuery}
                onChangeText={(value) => setSearchQuery(value)}
                placeholder="Type something to search..."
                style={sstyles.headerWidth}
                autoFocus={false}
                accessoryRight={(props) => (
                  <Icon {...props} name="search-outline" />
                )}
              />
            </Layout>
          ),

          headerStyle: {
            backgroundColor: theme['background-basic-color-1'],
          },
        }}
        name="SearchScreen"
      >
        {(props) => (
          <SearchScreen
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
      </SearchScreenStack.Screen>
    </SearchScreenStack.Navigator>
  );
}
