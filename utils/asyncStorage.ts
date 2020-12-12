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
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};
