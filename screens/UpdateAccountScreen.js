import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {updateUser} from '../services/UserManagement';
import {styles} from '../styles/RegistrationScreen.style';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import themeColours from '../styles/themeColours';
import {globalStyles} from '../styles/Global.style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {headerStyles} from '../styles/Header.style';
import {setUserPhoto} from '../services/UserManagement';
import ImagePicker from 'react-native-image-picker';

class UpdateAccountScreen extends Component {
  static navigationOptions = () => {
    return {
      headerTitle: '',
      headerStyle: headerStyles.headerBar,
    };
  };

  constructor(props) {
    super(props);

    var imageData = this.props.navigation.state.params?.imageData;
    this.state = {
      email: '',
      password: '',
      given_name: '',
      family_name: '',
      filePath: '',
      imageData: imageData != null ? imageData : '',
    };
  }

  componentDidMount() {
      this.onFocus();
  }

  onFocus() {
    var imageData = this.props.navigation.state.params?.imageData;
    console.log('image:' + imageData);
    this.setState({
      imageData: imageData,
    });
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

  async setProfileImage(body) {
    await setUserPhoto(body);
  }

  async submit() {
    var body = {};
    if (this.state.email != '') {
      body.email = this.state.email;
    }
    if (this.state.password != '') {
      body.password = this.state.password;
    }
    if (this.state.given_name != '') {
      body.given_name = this.state.given_name;
    }
    if (this.state.family_name != '') {
      body.family_name = this.state.family_name;
    }

    console.log('body: ' + JSON.stringify(body));
    if (this.state.filePath != '') {
      console.log('set with filepath: ' + this.state.filePath);
      await this.setProfileImage(this.state.filePath);
    } else if (this.state.imageData != '') {
      console.log('set with data: ' + this.state.imageData.uri);
      await this.setProfileImage(this.state.imageData);
    }

    if (body != null) {
      var bodyString = JSON.stringify(body);
      await updateUser(bodyString);
    }

    this.props.navigation.navigate('Account');
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={globalStyles.bgContainer}
        resetScrollToCoords={{x: 0, y: 0}}
        contentContainerStyle={globalStyles.container}
        scrollEnabled={false}>
        <StatusBar backgroundColor={themeColours.darkBlue}></StatusBar>
        <View style={globalStyles.container}>
          <Text style={styles.headline}>Edit account</Text>

          <View>
            <Text>Time for a new profile image?</Text>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={this.chooseFile.bind(this)}>
                <View style={styles.submitButton}>
                  <FontAwesome5
                    name={'image'}
                    size={30}
                    color={themeColors.lightBlue}
                  />
                  <Text style={styles.buttonText}>Upload Profile Picture</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Camera', {
                    cameFrom: 'account',
                  })
                }>
                <View style={styles.submitButton}>
                  <FontAwesome5
                    name={'camera-retro'}
                    size={30}
                    color={themeColors.lightBlue}
                  />
                  <Text style={styles.buttonText}>
                    Take New Profile Picture
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Image
            source={{uri: 'data:image/jpeg;base64,' + this.state.filePath.data}}
            style={styles.imagePreview}
          />
          <View>
            <Text style={styles.infoText}> First Name</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={given_name => this.setState({given_name})}
              value={this.state.given_name}
            />
          </View>

          <View>
            <Text style={styles.infoText}> Surname</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={family_name => this.setState({family_name})}
              value={this.state.family_name}
            />
          </View>

          <View>
            <Text style={styles.infoText}> Email</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={email => this.setState({email})}
              value={this.state.email}
            />
          </View>

          <View>
            <Text style={styles.infoText}> Password</Text>
            <TextInput
              style={styles.textInput}
              secureTextEntry
              onChangeText={password => this.setState({password})}
              value={this.state.password}
            />
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                this.submit();
              }}>
              <View style={styles.submitButton}>
                <Text style={styles.buttonText}>Save Changes</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default UpdateAccountScreen;
