import React, {Component} from 'react';
import {NavigationEvents} from 'react-navigation';

import {
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  Button,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';

import {Chit} from '../components/chit';
import {getUserDetails, logout} from '../services/UserManagement';
import {styles} from '../styles/AccountScreen.style';
import GLOBAL from '../global';

class AccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userId: GLOBAL.currentUser,
      userData: '',
      profileImageUri:'',
    };
  }

  async componentDidMount() {
    await this.getUserData();
    this.setState({
      isLoading: false,
    });
  }

  async onFocus() {
    this.setState({
      isLoading: true,
    });
    await this.getUserData();
    this.setState({
      isLoading: false,
    });
  }

  async getUserData() {
    var responseJson = await getUserDetails(this.state.userId);
    this.setState({
      userData: responseJson,
      profileImageUri: `http://10.0.2.2:3333/api/v0.0.5/user/${this.state.userId}/photo`
    });
  }

  async logout() {
    await logout(this.state.authToken);
    this.props.navigation.navigate('Landing');
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginVertical: 5,
          }}>
          <NavigationEvents onWillFocus={() => this.onFocus()} />
          <View>
            <Image
              source={{
                uri: this.state.profileImageUri + '?' + Date.now(),
              }}
              style={{width: 150, height: 150, borderRadius: 100}}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.user}>
                {this.state.userData.given_name}{' '}
                {this.state.userData.family_name}
              </Text>
              <Text>{this.state.userData.email}</Text>
            </View>
            <TouchableHighlight
              onPress={() =>
                this.props.navigation.navigate('UpdateAccount')
              }>
              <Image
                style={{width: 50, height: 50, alignSelf: 'flex-end'}}
                source={require('./../assets/EditPencil.png')}
              />
            </TouchableHighlight>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <Button
              title="Followers"
              onPress={() =>
                this.props.navigation.navigate('FollowList', {
                  followListType: 'followers',
                })
              }
            />
            <Button
              title="Following"
              onPress={() =>
                this.props.navigation.navigate('FollowList', {
                  followListType: 'following',
                })
              }
            />
            <Button
              title="Feed"
              onPress={() =>
                this.props.navigation.navigate('Feed')
              }
            />
            <Button
              title="Search"
              onPress={() =>
                this.props.navigation.navigate('UserSearch')
              }
            />
            <Button title="Logout" onPress={() => this.logout()} />
          </View>
          <ScrollView
            style={{
              alignSelf: 'stretch',
              flexGrow: 0,
            }}>
            <FlatList
              data={this.state.userData.recent_chits}
              renderItem={({item}) => (
                <Chit chit={item} user={this.state.userData} />
              )}
              keyExtractor={item => item.chit_id}
            />
          </ScrollView>
        </View>
      );
    }
  }
}
export default AccountScreen;
