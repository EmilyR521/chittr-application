import {StyleSheet} from 'react-native';
import themeColours from './ThemeColours';
export const styles = StyleSheet.create({
  user: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  imageBorder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: themeColours.midBlue,
    justifyContent: 'center',
  },
  imageStyle: {width: 190, height: 190, borderRadius: 95, alignSelf: 'center'},
  nameAndEditButtonContainer: {
    flexDirection: 'row',
  },
  nameAndEmailContainer: {flexDirection: 'column'},
  followButton: {
    backgroundColor: themeColours.darkBlue,
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 3,
    margin: 3,
  },
  buttonText: {
    color: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
  },
});
