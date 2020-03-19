import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  list: {width: '100%', flex: 6},
  bottom: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
  container: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: '90%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 6,
  },
});
