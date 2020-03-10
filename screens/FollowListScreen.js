import React, {Component} from 'react';
import {NavigationEvents} from 'react-navigation';
import {
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  getFollowList,
  followUser,
  unfollowUser,
} from '../services/FollowerManagement';
import UserInList from '../components/userInList';
import {styles} from '../styles/FollowListScreen.style';
import GLOBAL from '../global';

class FollowListScreen extends Component {
  constructor(props) {
    super(props);
    // var id =
    //   this.props.navigation.state.params.userId != null
    //     ? this.props.navigation.state.params.userId
    //     : '';

    this.state = {
      isLoading: true,
      userId: GLOBAL.currentUser,
      followListType: this.props.navigation.state.params.followListType,
      userList: [],
      peopleIFollow: [],
      peopleThatFollowMe: [],
    };
  }

  componentDidMount() {
    this.getUserLists();
  }

  onFocus() {
    this.getUserLists();
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

    this.setState({
      isLoading: false,
      userList:
        this.state.followListType == 'followers'
          ? this.state.peopleThatFollowMe
          : this.state.peopleIFollow,
    });
  }

  isUserFollowed(userId) {
    var index = this.state.peopleIFollow.findIndex(a => a.user_id == userId);
    return index != -1 ? true : false;
  }

  async follow(userId) {
    var responseJson = await followUser(userId, this.state.authToken);
    this.getUserLists();
  }

  async unfollow(userId) {
    var responseJson = await unfollowUser(userId, this.state.authToken);
    this.getUserLists();
  }

  onFollowPress = (user, followType) => {
    if (followType == 'Follow') {
      this.follow(user.user_id);
    } else if (followType == 'Unfollow') {
      this.unfollow(user.user_id);
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <NavigationEvents onWillFocus={() => this.onFocus()} />
          <FlatList
            data={this.state.userList}
            renderItem={({item}) => (
              <UserInList
                user={item}
                isFollowed={this.isUserFollowed(item.user_id)}
                onFollow={this.onFollowPress}
              />
            )}
            keyExtractor={item => item.user_id}
          />
        </View>
      );
    }
  }
}
export default FollowListScreen;
