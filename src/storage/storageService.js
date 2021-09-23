import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async value => {
  try {
    // console.debug('Storing in phone key, value', value);
    await AsyncStorage.setItem('phone', value);
    // console.debug('Stored successfully');
  } catch (e) {
    // saving error
  }
};

export const clearData = async value => {
  try {
    await AsyncStorage.removeItem('phone');
  } catch (e) {
    // saving error
  }
};

export const getData = async () => {
  try {
    /* const keys = await AsyncStorage.getAllKeys();
    console.debug(keys); */
    const value = await AsyncStorage.getItem('phone');
    console.debug(value);
    if (value !== null) {
      return value;
    }
    return null;
  } catch (e) {
    throw e;
  }
};

export const storeToken = async value => {
  try {
    await AsyncStorage.setItem('token', value);
  } catch (e) {
    throw e;
  }
};

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      return value;
    }
    return null;
  } catch (e) {
    throw e;
  }
};
