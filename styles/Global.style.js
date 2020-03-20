import {StyleSheet} from 'react-native';
import themeColours from './ThemeColours';
export const globalStyles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: themeColours.midPink,
  },
  container: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: '90%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
});
