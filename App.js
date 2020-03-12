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

const AppStackNav = createStackNavigator({
  Landing: {
    screen: LandingScreen,
  },
  Registration: {
    screen: RegistrationScreen,
  },
  Feed: {
    screen: FeedScreen,
  },
  Account: {
    screen: AccountScreen,
  },
  UpdateAccount: {
    screen: UpdateAccountScreen,
  },
  FollowList: {
    screen: FollowListScreen,
  },
  UserSearch: {
    screen: UserSearchScreen,
  },
  Camera: {
    screen: CameraScreen,
  },
});

const AppContainer = createAppContainer(AppStackNav);

export default AppContainer;
