import {StyleSheet} from 'react-native';
import themeColours from './themeColours';

export const styles = StyleSheet.create({
  headline: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  infoText: {color: themeColours.darkBlue},
  textInput: {
    height: 40,
    width: 200,
    borderBottomColor: themeColours.darkBlue,
    borderBottomWidth: 0.5,
    color: themeColours.darkBlue,
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: themeColours.darkBlue,
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 3,
    margin: 5,
  },
  buttonText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: 'white',
  },
  imagePreview:{
    width: 80, height: 80
  }
});
