import React, {Component} from 'react';

import {NavigationEvents} from 'react-navigation';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {getFollowList, followUser, unfollowUser} from '../services/FollowerManagement';
import UserInList from '../components/userInList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
});

const USERS = [
  {
    user_id: 0,
    given_name: 'string',
    family_name: 'string',
    email: 'string',
  },
];
class FollowListScreen extends Component {
  constructor(props) {
    super(props);

    var token =
      this.props.navigation.state.params.authToken != null
        ? this.props.navigation.state.params.authToken
        : '';

    var id =
      this.props.navigation.state.params.userId != null
        ? this.props.navigation.state.params.userId
        : '';

    this.state = {
      isLoading: true,
      authToken: token,
      userId: id,
      followListType: this.props.navigation.state.params.followListType,
      userList: [],
    };
  }

  componentDidMount() {
    this.getUserList();
  }

  onFocus() {
    this.getUserList();
  }

  async getUserList() {
    var responseJson = await getFollowList(
      this.state.userId,
      this.state.followListType,
    );
    this.setState({
      isLoading: false,
      userList: responseJson,
    });
    console.log('userList' + JSON.stringify(this.state.userList));
  }

  async follow(userId) {
    var responseJson = await unfollowUser(
      userId,
      this.state.authToken,
    );
    console.log('followedUser: ' + JSON.stringify(responseJson));
  }


  onFollow = user => {
    this.follow(user.user_id);
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
              <UserInList user={item} onFollow={this.onFollow} />
            )}
            keyExtractor={item => item.user_id}
          />
        </View>
      );
    }
  }
}
export default FollowListScreen;
