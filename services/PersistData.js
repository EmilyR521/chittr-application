import AsyncStorage from '@react-native-community/async-storage';

export const saveChitDraft = async (keyString, chitJson) => {
  try {
    await AsyncStorage.setItem(keyString, chitJson);
  } catch (error) {
    console.log(error);
  }
};

export const retrieveChitDraft = async keyString => {
  var returnValue;
  try {
    const value = await AsyncStorage.getItem(keyString);
    if (value !== null) {
      // We have data!!
      returnValue = value;
      console.log(value);
    }
  } catch (error) {
    // Error retrieving data
  }
  return returnValue;
};

export const getAllDrafts = () => {};
