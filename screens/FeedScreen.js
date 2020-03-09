import React, {Component} from 'react';

import Geolocation from 'react-native-geolocation-service';
import {NavigationEvents} from 'react-navigation';
import {
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import {Chit} from '../components/chit';
import CreateChit from '../components/createChit';
import {getChits} from '../services/PostingChits';
import {getUserDetails} from '../services/UserManagement';
import {postChit} from '../services/PostingChits';
import {styles} from '../styles/FeedScreen.style';

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
      location: null,
      locationPermission: false,
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
  };

  onSubmit = async () => {
    var loc = await this.findCoordinates();
    console.log('loc:' + JSON.stringify(loc));
    if (this.state.userData == null) {
      this.alertLoginNeeded;
    } else {
      var body = JSON.stringify({
        chit_id: Math.floor(Math.random() * 10000),
        timestamp: Date.now(),
        chit_content: this.state.inputText,
        location: {
          longitude:
            this.state.location != null ? this.state.location.longitude : 0,
          latitude:
            this.state.location != null ? this.state.location.latitude : 0,
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

      ///THEN ADD IMAGE

      this.getChitData();
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

  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app requires access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can access location');
        return true;
      } else {
        console.log('Location permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  }

  findCoordinates = async () => {
    if (!this.state.locationPermission) {
      this.state.locationPermission = await this.requestLocationPermission();
    }
    Geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
        this.setState({location});
      },
      error => {
        Alert.alert(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  };

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
          style={styles.list}
          data={this.state.chitData}
          renderItem={({item}) => <Chit chit={item} user={item.user} />}
          keyExtractor={item => item.chit_id}
        />

        <View style={styles.bottom}>
          <CreateChit
            onChangeTextHandler={this.onChangeTextHandler}
            onSubmit={this.onSubmit}
            navigation={this.props.navigation}
            authToken={this.state.authToken}
            userId={this.state.userId}
          />
        </View>
      </View>
    );
  }
}
export default FeedScreen;
