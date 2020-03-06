import React, {Component} from 'react';
import {NavigationEvents} from 'react-navigation';

import {
  Text,
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  Image,
  Button,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';

import {Chit} from '../components/chit';
import {getUserDetails, logout} from '../services/UserManagement';

const styles = StyleSheet.create({
  user: {
    fontSize: 26,
  },
});

class AccountScreen extends Component {
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
      userData: '',
      authToken: token,
      userId: id,
    };
  }

  componentDidMount() {
    this.getUserData();
  }
  onFocus() {    
    this.getUserData();
  }

  async getUserData() {
    var responseJson = await getUserDetails(this.state.userId);
    this.setState({
      isLoading: false,
      userData: responseJson,
    });
  }

  async logout() {
    var status = await logout(this.state.authToken);
    this.props.navigation.navigate('Landing');
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
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
            style={{width: 200, height: 200, borderRadius: 200 / 2}}
            source={require('./../assets/personDefault.png')}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.user}>
              {this.state.userData.given_name} {this.state.userData.family_name}
            </Text>
            <Text>{this.state.userData.email}</Text>
          </View>
          <TouchableHighlight
            onPress={() =>
              this.props.navigation.navigate('UpdateAccount', {
                authToken: this.state.authToken,
                userId: this.state.userId,
              })
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
            onPress={() => this.props.navigation.navigate('FollowList', {
                authToken: this.state.authToken,
                userId: this.state.userId,
                followListType: "followers"
              })}
          />
          <Button
            title="Following"
            onPress={() => this.props.navigation.navigate('FollowList', {
                authToken: this.state.authToken,
                userId: this.state.userId,
                followListType: "following"
              })}
          />
           <Button
            title="Feed"
            onPress={() =>  this.props.navigation.navigate('Feed', {
                authToken: this.state.authToken,
                userId: this.state.userId,
              })}
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
              <Chit
                chit_content={item.chit_content}
                user={this.state.userData}
              />
            )}
            keyExtractor={item => item.chit_id}
          />
        </ScrollView>
      </View>
    );
  }
}
export default AccountScreen;
