import React, {Component} from 'react';
import {NavigationEvents} from 'react-navigation';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  StatusBar,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {globalStyles} from '../styles/Global.style';
import Chit from '../components/chit';
import {getUserDetails, logout} from '../services/UserManagement';
import {styles} from '../styles/AccountScreen.style';
import GLOBAL from '../global';
import {headerStyles} from '../styles/Header.style';
import headerRightView from '../components/headerRight';
import themeColours from '../styles/themeColours';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class AccountScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: '',
      headerStyle: headerStyles.headerBar,
      headerRight: headerRightView(true, false, true, navigation),
    };
  };

  getNavParamId() {
    return (id =
      this.props.navigation.state.params.userId != null
        ? this.props.navigation.state.params.userId
        : GLOBAL.currentUser);
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userId: this.getNavParamId(),
      userData: '',
      profileImageUri: '',
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
      userId: this.getNavParamId(),
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
      profileImageUri: `http://10.0.2.2:3333/api/v0.0.5/user/${this.state.userId}/photo`,
    });
    this.render();
  }

  async logout() {
    await logout(this.state.authToken);
    this.props.navigation.navigate('Landing');
  }

  render() {
    const editButton = (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('UpdateAccount')}>
        <FontAwesome5
          name={'user-edit'}
          size={50}
          color={themeColors.midBlue}
        />
      </TouchableOpacity>
    );

    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <KeyboardAwareScrollView
          style={globalStyles.bgContainer}
          resetScrollToCoords={{x: 0, y: 0}}
          contentContainerStyle={globalStyles.container}
          scrollEnabled={false}>
          <StatusBar backgroundColor={themeColours.darkBlue}></StatusBar>
          <View style={globalStyles.container}>
            <NavigationEvents onWillFocus={() => this.onFocus()} />
            <View style={styles.imageBorder}>
              <Image
                source={{
                  uri: this.state.profileImageUri + '?' + Date.now(),
                }}
                style={styles.imageStyle}
              />
            </View>
            <View style={styles.nameAndEditButtonContainer}>
              <View style={styles.nameAndEmailContainer}>
                <Text style={styles.user}>
                  {this.state.userData.given_name}{' '}
                  {this.state.userData.family_name}
                </Text>
                <Text>{this.state.userData.email}</Text>
              </View>
              {this.state.userId == GLOBAL.currentUser ? editButton : null}
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('FollowList', {
                    followListType: 'followers',
                  })
                }>
                <View style={styles.followButton}>
                  <Text style={styles.buttonText}>Followers</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('FollowList', {
                    followListType: 'following',
                  })
                }>
                <View style={styles.followButton}>
                  <Text style={styles.buttonText}>Following</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.logout()}>
                <View style={styles.followButton}>
                  <Text style={styles.buttonText}>Logout</Text>
                </View>
              </TouchableOpacity>
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
                    chit={item}
                    user={this.state.userData}
                    navigation={this.props.navigation}
                  />
                )}
                keyExtractor={item => item.chit_id}
              />
            </ScrollView>
          </View>
        </KeyboardAwareScrollView>
      );
    }
  }
}
export default AccountScreen;
