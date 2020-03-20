import {StyleSheet} from 'react-native';
import themeColours from './ThemeColours';
export const styles = StyleSheet.create({
  chit: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#C0EEE8',
    marginVertical: 5,
    flexDirection: 'row',
  },
  chit_user_photo_wrapper: {
    alignSelf: 'flex-start',
  },
  chit_user_photo: {
    margin: 10,
    width: 60,
    height: 60,
  },
  chit_content: {
    flex: 1,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
    flexDirection: 'column',
  },
  user: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    fontSize: 20,
    color: themeColours.darkBlue,
  },
  chitText: {
    flex: 1,
    margin: 10,
    width: '80%',
  },
});
