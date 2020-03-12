import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {headerStyles} from '../styles/Header.style';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import themeColours from '../styles/themeColours';

headerRightView = (feed, account, search, navigation) => {
  var FeedButton = (
    <TouchableOpacity
      onPress={() => navigation.navigate('Feed', {})}
      style={headerStyles.headerNavIcon}>
      <FontAwesome5 name={'th-list'} size={25} color={themeColours.darkBlue} />
    </TouchableOpacity>
  );
  var AccountButton = (
    <TouchableOpacity
      onPress={() => navigation.navigate('Account', {})}
      style={headerStyles.headerNavIcon}>
      <FontAwesome5
        name={'user-circle'}
        size={25}
        color={themeColours.darkBlue}
      />
    </TouchableOpacity>
  );
  var SearchButton = (
    <TouchableOpacity
      onPress={() => navigation.navigate('UserSearch', {})}
      style={headerStyles.headerNavIcon}>
      <FontAwesome5 name={'search'} size={25} color={themeColours.darkBlue} />
    </TouchableOpacity>
  );

  return (
    <View style={headerStyles.headerNavView}>
      {feed == true ? FeedButton : <View />}
      {account == true ? AccountButton : <View />}
      {search == true ? SearchButton : <View />}
    </View>
  );
};
export default headerRightView;
