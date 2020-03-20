import AsyncStorage from '@react-native-community/async-storage';

//Any functions for accessing drafts in Async storage.
export const saveChitDraft = async (keyString, chitJson) => {
  try {
    console.log('key: ' + keyString + ' value: ' + chitJson);
    await AsyncStorage.setItem(keyString, chitJson);
  } catch (error) {
    console.log(error);
  }
};

export const retrieveChitDraft = async keyString => {
  let returnValue;
  try {
    const value = await AsyncStorage.getItem(keyString);
    if (value !== null) {
      returnValue = value;

      console.log(' value: ' + chitJson);
    }
  } catch (error) {
    console.log(error);
  }
  return returnValue;
};

export const getAllDrafts = async () => {
  let returnValue = [];
  try {
    const keys = await AsyncStorage.getAllKeys();

    console.log('keys: ' + JSON.stringify(keys));
    returnValue = keys;
  } catch (error) {
    console.log(error);
  }
  return returnValue;
};
