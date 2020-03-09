import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import RegistrationScreen from './screens/RegistrationScreen';
import LandingScreen from './screens/LandingScreen';
import FeedScreen from './screens/FeedScreen';
import AccountScreen from './screens/AccountScreen';
import FollowListScreen from './screens/FollowListScreen';
import UpdateAccountScreen from './screens/UpdateAccountScreen';
import UserSearchScreen from './screens/UserSearchScreen';
import CameraScreen from './screens/CameraScreen';

import React from 'react';
import {Button, Alert, View} from 'react-native';

const styles = {
  backgroundColor: '#FAE1DF',
  height: 40,
};

const AppStackNav = createStackNavigator({
  Landing: {
    screen: LandingScreen,
    navigationOptions: {
      headerStyle: styles,
    },
  },
  Registration: {
    screen: RegistrationScreen,
    navigationOptions: {
      headerStyle: styles,
    },
  },
  Feed: {
    screen: FeedScreen,
    navigationOptions: {
      headerStyle: styles,
    },
  },
  Account: {
    screen: AccountScreen,
    navigationOptions: {
      headerStyle: styles,
    },
  },
  UpdateAccount: {
    screen: UpdateAccountScreen,
    navigationOptions: {
      headerStyle: styles,
    },
  },
  FollowList: {
    screen: FollowListScreen,
    navigationOptions: {
      headerStyle: styles,
    },
  },
  UserSearch: {
    screen: UserSearchScreen,
    navigationOptions: {
      headerStyle: styles,
    },
  },
  Camera: {
    screen: CameraScreen,
    navigationOptions: {
      headerStyle: styles,
    },
  },
});

const AppContainer = createAppContainer(AppStackNav);

export default AppContainer;
