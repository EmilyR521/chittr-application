import {StyleSheet} from 'react-native';
import themeColours from './ThemeColours';

export const headerStyles = StyleSheet.create({
  headerBar: {
    backgroundColor: themeColours.midPink,
    height: 30,
    elevation: 0,
  },
  headerNavView: {
    flexDirection: 'row',
    paddingRight: 15,
  },
  headerNavIcon: {
    padding: 5,
  },
});
