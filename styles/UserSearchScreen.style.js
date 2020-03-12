import {StyleSheet} from 'react-native';

import themeColours from './themeColours';
export const styles = StyleSheet.create({
  list: {width: '100%', flex: 1, marginTop: 40},
  container: {
    flex: 1,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  textInput: {
    height: 40,
    width: '90%',
    borderBottomColor: themeColours.darkBlue,
    borderBottomWidth: 0.5,
    color: themeColours.darkBlue,
  },
  searchBar: {
    flexDirection: 'row',
  },
});
