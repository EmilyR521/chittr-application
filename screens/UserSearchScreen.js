import React, {Component} from 'react';
import {
  View,
  FlatList,
  TextInput,
  Button,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {
  getFollowList,
  followUser,
  unfollowUser,
  searchUser,
} from '../services/FollowerManagement';
import UserInList from '../components/userInList';
import {styles} from '../styles/UserSearchScreen.style';
import GLOBAL from '../global';
import {headerStyles} from '../styles/Header.style';
import headerRightView from '../components/headerRight';
import themeColours from '../styles/themeColours';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {globalStyles} from '../styles/Global.style';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
class UserSearchScreen extends Component {
  static navigationOptions = ({navigation}) => {
    var loggedIn = GLOBAL.currentUser != '';
    return {
      headerTitle:"",
      headerStyle: headerStyles.headerBar,
      headerRight: headerRightView(true, loggedIn, false, navigation),
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      userId: GLOBAL.currentUser,
      query: '',
      userList: [],
      peopleThatFollowMe: [],
      peopleIFollow: [],
    };
  }

  async getUserLists() {
    var responseJson = await getFollowList(this.state.userId, 'following');
    this.setState({
      peopleIFollow: responseJson,
    });
    responseJson = await getFollowList(this.state.userId, 'followers');
    this.setState({
      peopleThatFollowMe: responseJson,
    });
  }

  searchUsers = async () => {
    var responseJson = await searchUser(this.state.query);
    this.setState({
      isLoading: false,
      userList: responseJson,
    });
    console.log('userList' + JSON.stringify(this.state.userList));
  };

  onSubmit() {
    this.searchUsers();
  }

  isUserFollowed(userId) {
    var index = this.state.peopleIFollow.findIndex(a => a.user_id == userId);
    return index != -1 ? true : false;
  }

  async follow(userId) {
    var responseJson = await followUser(userId, this.state.authToken);
    await this.getUserLists();
    this.searchUsers();
  }

  async unfollow(userId) {
    var responseJson = await unfollowUser(userId, this.state.authToken);
    await this.getUserLists();
    this.searchUsers();
  }

  onFollowPress = (user, followType) => {
    if (followType == 'Follow') {
      this.follow(user.user_id);
    } else if (followType == 'Unfollow') {
      this.unfollow(user.user_id);
    }
  };

  render() {
    return (
      <KeyboardAwareScrollView
        style={globalStyles.bgContainer}
        resetScrollToCoords={{x: 0, y: 0}}
        contentContainerStyle={globalStyles.container}
        scrollEnabled={false}>
        <StatusBar backgroundColor={themeColours.darkBlue}></StatusBar>
        <View style={globalStyles.container}>
        <View style = {styles.searchBar}>
          <TextInput
            {...this.props}
            style={styles.textInput}
            editable
            maxLength={40}
            onChange={event => {
              console.log('event: ' + JSON.stringify(event.nativeEvent.text));
              this.setState({
                query: event.nativeEvent.text,
              });
            }}
            value={this.state.text}
            placeholder={'Type a message...'}
          />
          <TouchableOpacity
            onPress={() => {
              console.log('searched' + this.state.query);
              this.onSubmit();
            }}>
            <FontAwesome5
              name={'chevron-circle-right'}
              size={35}
              color={themeColors.midBlue}
            />
          </TouchableOpacity>
          </View>
          <View style={styles.list}>
          <FlatList
            data={this.state.userList}
            renderItem={({item}) => (
              <UserInList
                user={item}
                navigation={this.props.navigation}
                isFollowed={this.isUserFollowed(item.user_id)}
                onFollow={this.onFollowPress}
              />
            )}
            keyExtractor={item => item.user_id}
          />
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default UserSearchScreen;
