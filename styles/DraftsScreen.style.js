import {StyleSheet} from 'react-native';
import themeColours from './themeColours';
export const styles = StyleSheet.create({
  title: {fontWeight: 'bold', fontSize: 20},
  item: {flexDirection: 'column'},
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingTop: 10,
  },
  instruction: {
    flexDirection: 'row',
  },
  draftSchedButton: {
    flexDirection: 'row',
    backgroundColor: themeColours.darkBlue,
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 3,
  },
  buttonText: {
    color: 'white',
    paddingHorizontal: 5,
  },
});
