import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
  Button,
} from 'react-native';
import {
  getFollowList,
  followUser,
  unfollowUser,
  searchUser,
} from '../services/FollowerManagement';
import UserInList from '../components/userInList';
import {styles} from '../styles/UserSearchScreen.style';

class UserSearchScreen extends Component {
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
      authToken: token,
      userId: id,
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
      <View style={styles.container}>
        <TextInput
          {...this.props}
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
        <Button
          title="search"
          onPress={() => {
            console.log('searched' + this.state.query);
            this.onSubmit();
          }}
        />
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
    );
  }
}
export default UserSearchScreen;
