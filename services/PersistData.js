import AsyncStorage from '@react-native-community/async-storage';

//Any functions for accessing drafts in Async storage.
export const saveChitDraft = async (keyString, chitJson) => {
  try {
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

    returnValue = keys;
  } catch (error) {
    console.log(error);
  }
  return returnValue;
};
