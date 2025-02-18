import { light } from '@eva-design/eva';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {
  Avatar,
  Button,
  Divider,
  Icon,
  Layout,
  Text,
  Toggle,
} from '@ui-kitten/components';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionList, StyleSheet, Switch, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { useUser } from '../context/auth/configureContext';
import { useSnackbar } from '../context/snackbar/configureContext';
import { useThemeValue } from '../context/theme/configureContext';
import i18n from '../i18n';
import { updateavatar } from '../services/authenticate';
import { removeData } from '../utils/asyncStorage';
const SettingScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [image, setImage] = useState<string | undefined>();
  const [theme, setTheme] = React.useState(false);
  const [lang, setLang] = React.useState(false);
  const navigation = useNavigation();
  const { state, dispatch } = useUser() as UserContextType;
  const snackbarContext = useSnackbar() as SnackBarContextType;
  const themeValue = useThemeValue();
  const changeLanguage = (lng: boolean) => {
    i18n.changeLanguage(lng ? 'vi' : 'en');
  };
  const { t } = useTranslation();
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.cancelled) {
      console.log('IMAGE URI');

      // ImagePicker saves the taken photo to disk and returns a local URI to it
      const localUri = result.uri;
      const filename = localUri.split('/').pop();

      // Infer the type of the image
      const match = /\.(\w+)$/.exec(
        filename || Math.random().toString(36).substring(7)
      );
      const type = match ? `image/${match[1]}` : `image`;

      // Upload the image using the fetch and FormData APIs
      const formData = new FormData();
      // Assume "photo" is the name of the form field the server expects
      formData.append('avatar', { uri: localUri, name: filename, type });

      try {
        const data = await updateavatar(formData);

        if (!data?.payload?.url) return;
        dispatch({
          type: 'UPDATE_USER',
          payload: { user: { ...state.user, avatar: data.payload.url } },
        });
        setImage(result.uri);
      } catch (err) {
        snackbarContext.dispatch({
          type: 'SNACKBAR_CHANGE',
          payload: { show: true, content: 'File upload is too large.' },
        });
      }
    }
  };

  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current && state?.user?.avatar) {
      if (image === state?.user?.avatar) return;
      setImage(state.user.avatar);
    }
    hasRun.current = true;
  }, [state?.user?.avatar]);

  const DATA = [
    {
      title: 'Video preferences',
      data: [
        { title: 'Download options', screen: '' },
        { title: 'Video playback options', screen: '' },
      ],
      requireAuth: true,
    },
    {
      title: t('account_settings'),
      data: [
        { title: t('change_profile'), screen: 'ChangeProfile' },
        { title: t('password'), screen: 'ChangePassword' },
        { title: 'Manage favorite categories', screen: '' },
      ],
      requireAuth: true,
    },
    {
      title: t('settings'),
      data: [
        {
          title: t('change_theme'),
          screen: '',
          right: () => (
            <Toggle
              style={{
                margin: 2,
              }}
              checked={theme}
              onChange={() => {
                console.log(themeValue);
                themeValue?.dispatch({
                  type: 'THEME_CHANGE',
                  payload: !!theme,
                });
                AsyncStorage.setItem('theme', theme ? 'Light' : 'Dark');
                setTheme((prev) => !prev);
              }}
            >
              {theme ? 'Light' : 'Dark'}
            </Toggle>
          ),
        },
        {
          title: t('change_lang'),
          screen: '',
          right: () => (
            <Toggle
              style={{
                margin: 2,
              }}
              checked={lang}
              onChange={() => {
                setLang((prev) => {
                  changeLanguage(prev);
                  return !prev;
                });
              }}
            >
              {lang ? 'Eng' : 'Vie'}
            </Toggle>
          ),
        },
      ],
      requireAuth: false,
    },
    {
      title: 'Dianostics',
      data: [{ title: 'Status', screen: '' }],
      requireAuth: false,
    },
  ];

  const Item = ({
    title,
    requireAuth,
    toScreen,
    right: Right,
  }: {
    title: string;
    requireAuth: boolean;
    toScreen: string;
    right: any;
  }) =>
    (requireAuth && state.user) || !requireAuth ? (
      <View>
        <Button
          style={styles.button}
          status="basic"
          appearance="ghost"
          onPress={() => navigation.navigate(toScreen, { id: state?.user?.id })}
          accessoryRight={(props) =>
            Right ? <Right /> : <Icon {...props} name="chevron-right-outline" />
          }
        >
          {title}
        </Button>
      </View>
    ) : null;

  return (
    <Layout style={styles.container}>
      {/* <View style={styles.header}>
          <Avatar
            style={{ width: 60, height: 60 }}
            source={require('../assets/images/avatar.jpg')}
          />
        </View>
        <Divider />
        <View style={styles.content}></View>
        <Divider /> */}

      <SectionList
        sections={DATA}
        stickySectionHeadersEnabled={false}
        keyExtractor={(item, index) => item.title + index}
        renderItem={(props) => {
          return (
            <Item
              title={props.item.title}
              requireAuth={props.section.requireAuth}
              toScreen={props.item.screen}
              right={props.item.right}
            />
          );
        }}
        ListHeaderComponent={() =>
          state.user ? (
            <>
              <View style={styles.header}>
                <TouchableOpacity onPress={pickImage}>
                  <Avatar
                    style={{ width: 100, height: 100 }}
                    source={{
                      uri: image,
                    }}
                  />
                </TouchableOpacity>
                <Text category="s1" style={{ marginTop: 10, marginBottom: 30 }}>
                  {state?.user?.name || state?.user?.email}
                </Text>
              </View>
              <Divider />
            </>
          ) : null
        }
        ListFooterComponent={() => (
          <>
            <Divider />
            <Button
              onPress={async () => {
                await removeData('accessToken');
                navigation.reset({
                  routes: [{ name: state.user ? 'Root' : 'Login' }],
                });
                dispatch({ type: 'UPDATE_USER', payload: { user: null } });
              }}
              style={styles.buttonLogout}
              appearance="ghost"
              status="danger"
              size="large"
            >
              {state.user ? t('log_out') : t('sign_in')}
            </Button>
          </>
        )}
        renderSectionHeader={({ section: { title, requireAuth } }) =>
          (requireAuth && state.user) || !requireAuth ? (
            <Text style={styles.sectionHeader} category="c2">
              {title}
            </Text>
          ) : null
        }
      />
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
  },
  content: {
    marginVertical: 20,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 0,
    padding: 0,
    fontWeight: 'normal',
  },
  sectionHeader: {
    marginLeft: 20,
    marginTop: 20,
  },
  version: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  buttonLogout: {
    margin: 10,
    borderRadius: 10,
    fontSize: 7,
  },
});
export default memo(SettingScreen);
