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
      userData:null
    };
  }

  onFocus() {
    if (this.state.userId != '') {
      this.getUserData();
    }
  }

  async getUserData() {
    var responseJson = await getUserDetails(this.state.userId);
    this.setState({
      isLoading: false,
      userData: responseJson,
    });
  }

  componentDidMount() {
    this.getChitData();
  }

  onFocus() {
    this.getChitData();
  }

  onChangeTextHandler = e => {
    this.setState({
      inputText: e,
    });
    console.log('change: ' + e);
  };

  onSubmit = () => {
    if (this.state.userData == null) {
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
    } else {
      var body = JSON.stringify({
        chit_id:
          Math.random()
            .toString(36)
            .substring(2, 15) +
          Math.random()
            .toString(36)
            .substring(2, 15),
        timestamp: Date.now().toString(),
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
    }
  };

  async getChitData() {
    var responseJson = await getChits();
    this.setState({
      isLoading: false,
      chitData: responseJson,
    });
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
