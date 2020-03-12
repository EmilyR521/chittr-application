import {StyleSheet} from 'react-native';
import themeColours from './themeColours';

export const styles = StyleSheet.create({
  bar: {
    width: '100%',
    alignSelf: 'stretch',
    backgroundColor: themeColours.darkBlue,
  },
  barContent: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    width: '100%',
    justifyContent:'space-evenly',
    marginBottom:15
  },
  imageIcons: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    paddingHorizontal:10
  }, 
  inputView: {
    alignSelf: "center",
    width:260,
    paddingHorizontal: 10,
    color:"white"
  },
  textInput:{      
    borderBottomColor: themeColours.midBlue,
    borderBottomWidth: 2,
    alignSelf:"stretch",
    backgroundColor:"rgba(255, 255, 255, 0.1)",    
    color:"white"
  }
});
