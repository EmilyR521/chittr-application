import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import {getChits, postChit, setChitPhoto} from '../services/PostingChits';
import {getUserDetails} from '../services/UserManagement';
import Geolocation from 'react-native-geolocation-service';
import GLOBAL from '../global';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';
import themeColours from '../styles/themeColours';
import {styles} from '../styles/CreateChit.styles';

class CreateChit extends Component {
  constructor(props) {
    super(props);

    const {imageData} = route.params;
    this.state = {
      text: '',
      chitData: [],
      location: null,
      locationPermission: false,
      filePath: imageData != null ? imageData : {},
    };

    if (GLOBAL.currentUser != '') {
      this.getUserData(GLOBAL.currentUser);
    }
  }

  getUserData = async () => {
    var responseJson = await getUserDetails(GLOBAL.currentUser);
    this.setState({
      userData: responseJson,
    });
  };

  setChitPhoto = async body => {
    var chits = await getChits();
    var chitsSortedByRecent = chits.sort(function(a, b) {
      a = new Date(a.chit_timestamp);
      b = new Date(b.chit_timestamp);
      return a > b ? -1 : a < b ? 1 : 0;
    });
    var mostRecentChitId = chitsSortedByRecent[0].chit_id;
    await setChitPhoto(body, mostRecentChitId);
  };

  onSubmit = async () => {
    var loc = await this.findCoordinates();
    console.log('loc:' + JSON.stringify(loc));
    if (this.state.userData == null) {
      this.alertLoginNeeded;
    } else {
      var body = this.createChitPOSTBody();
      console.log('body: ' + body);
      await postChit(body);

      const {imageData} = this.props;
      if (imageData != '') {
        await this.setChitPhoto(imageData);
      } else {
        if (this.state.filePath != '') {
          await this.setChitPhoto(this.state.filePath);
        }
      }
    }
  };

  createChitPOSTBody() {
    var body = JSON.stringify({
      chit_id: 0,
      timestamp: Date.now(),
      chit_content: this.state.text,
      location: {
        longitude:
          this.state.location != null ? this.state.location.longitude : 0,
        latitude:
          this.state.location != null ? this.state.location.latitude : 0,
      },
      user: {
        user_id: GLOBAL.currentUser,
        given_name: this.state.userData.given_name,
        family_name: this.state.userData.family_name,
        email: this.state.userData.email,
      },
    });
    return body;
  }

  chooseFile = () => {
    var options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        this.setState({
          filePath: response,
        });
      }
    });
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
    const {refreshList} = this.props;
    const {navigation} = this.props;
    return (
      <View style={styles.bar}>
        <View style={styles.barContent}>
          <View style={styles.imageIcons}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Camera', {cameFrom: 'createChit'})
              }>
              <FontAwesome5
                name={'camera-retro'}
                size={30}
                color={themeColors.lightBlue}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.chooseFile.bind(this)}>
              <FontAwesome5
                name={'image'}
                size={30}
                color={themeColors.lightBlue}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.textInput}
              {...this.props}
              multiline
              numberOfLines={3}
              maxLength={141}
              onChange={event => {
                this.setState({
                  text: event.nativeEvent.text,
                });
              }}
              value={this.state.text}
              placeholder={'Type a chit...'}
            />
          </View>
          <View style={styles.imageIcons}>
            <TouchableOpacity
              onPress={async () => {
                await this.onSubmit();
                refreshList();
              }}>
              <FontAwesome5
                name={'paper-plane'}
                size={60}
                color={themeColors.lightBlue}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
export default CreateChit;
