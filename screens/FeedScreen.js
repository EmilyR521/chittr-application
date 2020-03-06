import React, {Component} from 'react';

import {NavigationEvents} from 'react-navigation';
import {
  Image,
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Chit} from '../components/chit';
import CreateChit from '../components/createChit';
import {getChits} from '../services/PostingChits';
import {getUserDetails} from '../services/UserManagement';
import {postChit} from '../services/PostingChits';

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

class FeedScreen extends Component {
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
      chitData: [],
      authToken: token,
      userId: id,
      userData: null,
    };
  }

  componentDidMount() {
    this.getChitData();
    if (this.state.userId != '') {
      this.getUserData();
    }
  }

  onFocus() {
    this.getChitData();
    if (this.state.userId != '') {
      this.getUserData();
    }
  }

  onChangeTextHandler = e => {
    this.setState({
      inputText: e,
    });
  };
  async getChitData() {
    var responseJson = await getChits();
    this.setState({
      isLoading: false,
      chitData: responseJson,
    });
  }

  getUserData = async () => {
    console.log('state: ' + this.state);
    var responseJson = await getUserDetails(this.state.userId);
    this.setState({
      isLoading: false,
      userData: responseJson,
    });

    console.log('userData: ' + this.state.userData);
  };

  onSubmit = async () => {
    if (this.state.userData == null) {
      this.alertLoginNeeded;
    } else {
      var body = JSON.stringify({
        chit_id: Math.floor(Math.random() * 10000),
        timestamp: Date.now(),
        chit_content: this.state.inputText,
        location: {
          longitude: 0,
          latitude: 0,
        },
        user: {
          user_id: this.state.userId,
          given_name: this.state.userData.given_name,
          family_name: this.state.userData.family_name,
          email: this.state.userData.email,
        },
      });
      console.log('body: ' + body);

      await postChit(body, this.state.authToken);
    }
  };
  alertLoginNeeded() {
    Alert.alert(
      'Sorry!',
      'You need to log in to share chits.',
      [
        {
          text: 'Log in',
          onPress: () => this.props.navigation.navigate('Landing'),
        },
        {
          text: 'Sign up',
          onPress: () => this.props.navigation.navigate('Registration'),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
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
      <View style={styles.container}>
        <NavigationEvents onWillFocus={() => this.onFocus()} />

        <FlatList
          data={this.state.chitData}
          renderItem={({item}) => (
            <Chit chit_content={item.chit_content} user={item.user} />
          )}
          keyExtractor={item => item.chit_id}
        />

        <View style={styles.bottom}>
          <CreateChit
            onChangeTextHandler={this.onChangeTextHandler}
            onSubmit={this.onSubmit}
          />
        </View>
      </View>
    );
  }
}
export default FeedScreen;
