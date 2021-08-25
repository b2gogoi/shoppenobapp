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

export const getData = async () => {
  try {
    /* const keys = await AsyncStorage.getAllKeys();
    console.debug(keys); */
    const value = await AsyncStorage.getItem('phone');
    console.debug(value);
    if (value !== null) {
      return value;
    }
    return 'nada';
  } catch (e) {
    throw e;
  }
};
