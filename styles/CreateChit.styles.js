import {StyleSheet} from 'react-native';
import themeColours from './ThemeColours';

export const styles = StyleSheet.create({
  bar: {
    flex: 1,
    width: '100%',
    alignSelf: 'stretch',
    backgroundColor: themeColours.darkBlue,
  },
  barContent: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    width: '100%',
    justifyContent: 'space-between',
  },
  contentLeft: {
    flex: 6,
    flexDirection: 'column',
    alignContent: 'space-between',
  },
  iconTabs: {flexDirection: 'row'},
  imageIcons: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
  },
  draftIcons: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  inputView: {
    flex: 3,
    paddingLeft: 5,
    paddingBottom: 5,
    color: 'white',
  },
  textInput: {
    borderBottomColor: themeColours.midBlue,
    borderBottomWidth: 2,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    color: 'white',
  },
  sendIcon: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginBottom: 10,
  },
  icon: {
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
});
