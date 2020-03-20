import React, {Component} from 'react';
import {View, TextInput, TouchableOpacity, Alert} from 'react-native';
import {getChits, postChit, setChitPhoto} from '../services/PostingChits';
import {getUserDetails} from '../services/UserManagement';
import Geolocation from 'react-native-geolocation-service';
import {requestLocationPermission} from '../services/RequestPermissions';
import GLOBAL from '../global';
import {saveChitDraft} from '../services/PersistData';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';
import {styles} from '../styles/CreateChit.styles';

//component for adding to screens which allow creating a new chit
class CreateChit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      chitData: [],
      location: null,
      locationPermission: false,
      filePath: {},
    };

    //If user logged in, get user details
    if (GLOBAL.currentUser != '') {
      this.getUserData(GLOBAL.currentUser);
    }
  }

  //Get current user data to add to chit body
  getUserData = async () => {
    var responseJson = await getUserDetails(GLOBAL.currentUser);
    this.setState({
      userData: responseJson,
    });
  };

  // When chit submitted, check user is logged in. If so, create chit body and
  // call service to POST. If an image has been added by upload or camera.
  // set the photo to the chit that was just created.
  onSubmit = async () => {
    await this.findCoordinates();
    if (this.state.userData == null) {
      this.alertLoginNeeded;
    } else {
      var body = this.createChitPOSTBody();
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

  //create JSON body string for new chit HTTP call
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

  //get the most recently created chit and set the photo. Not feasible method for real,
  //multi user application.
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

  //show alert asking if user wants to save draft or go to drafts screen
  manageDrafts = () => {
    if (this.state.userData == null) {
      this.alertLoginNeeded();
    } else {
      Alert.alert(
        'Drafts...',
        'What would you like to do?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Manage drafts',
            onPress: () => this.props.navigation.navigate('Drafts'),
          },
          {
            text: 'Save chit as draft',
            onPress: () => {
              this.saveDraft();
            },
          },
        ],
        {cancelable: true},
      );
    }
  };

  //save current chit to async storage.
  saveDraft = async () => {
    var body = this.createChitPOSTBody();
    await saveChitDraft(this.state.text, body);
  };

  //launch imagePicker, set filePAth in state to chosen image
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

  //show alert that use must log in to create a chit
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

  //use location API to find location
  findCoordinates = async () => {
    if (!this.state.locationPermission) {
      this.state.locationPermission = await requestLocationPermission();
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
          <View style={styles.contentLeft}>
            <View style={styles.iconTabs}>
              <View style={styles.imageIcons}>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() =>
                    navigation.navigate('Camera', {cameFrom: 'createChit'})
                  }>
                  <FontAwesome5
                    name={'camera-retro'}
                    size={30}
                    color={themeColors.lightBlue}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={this.chooseFile.bind(this)}>
                  <FontAwesome5
                    name={'image'}
                    size={30}
                    color={themeColors.lightBlue}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.draftIcons}>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={async () => {
                    await this.manageDrafts();
                  }}>
                  <FontAwesome5
                    name={'ellipsis-h'}
                    size={30}
                    color={themeColors.lightBlue}
                  />
                </TouchableOpacity>
              </View>
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
          </View>
          <View style={styles.sendIcon}>
            <TouchableOpacity
              onPress={async () => {
                await this.onSubmit();
                refreshList();
              }}>
              <FontAwesome5
                name={'angle-double-right'}
                size={45}
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
