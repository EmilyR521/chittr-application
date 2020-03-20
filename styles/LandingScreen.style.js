import {StyleSheet} from 'react-native';
import themeColours from './ThemeColours';
export const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
  },
  textInput: {
    height: 40,
    width: 200,
    borderBottomColor: themeColours.darkBlue,
    borderBottomWidth: 0.5,
    color: themeColours.darkBlue,
  },
  loginRegButton: {
    backgroundColor: themeColours.darkBlue,
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 3,
  },
  buttonText: {
    color: 'white',
  },
  hr: {
    alignSelf: 'stretch',
    borderBottomColor: themeColours.darkBlue,
    borderBottomWidth: 2,
  },
  infoText: {color: themeColours.darkBlue},
  skipLoginButton: {
    backgroundColor: 'white',
    borderBottomColor: themeColours.darkBlue,
    borderBottomWidth: 0.5,
  },
  skipLoginText: {color: themeColours.darkBlue},
});
