import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async (key: string): Promise<any> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (err) {
    return null;
  }
};

export const storeData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

export const removeData = async (key: string) => {
  return await AsyncStorage.removeItem(key);
};
