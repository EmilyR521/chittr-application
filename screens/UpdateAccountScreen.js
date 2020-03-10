import React, {Component} from 'react';
import {Text, View, TextInput, Button, Image} from 'react-native';
import {updateUser} from '../services/UserManagement';
import {styles} from '../styles/UpdateAccountScreen.style';

import {setUserPhoto} from '../services/UserManagement';
import ImagePicker from 'react-native-image-picker';

class UpdateAccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      given_name: '',
      family_name: '',
      filePath: {},
    };
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
    var bodyString = JSON.stringify(body);
    
    if (this.state.filePath != '') {
      await this.setProfileImage(response);
    }
    await updateUser(bodyString);F

    this.props.navigation.navigate('Account');
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Text>Edit account</Text>
        <Button
          title="Upload Profile Picture"
          onPress={this.chooseFile.bind(this)}
        />
        <Image
          source={{
            uri: 'data:image/jpeg;base64,' + this.state.filePath.data,
          }}
          style={{width: 100, height: 100}}
        />

        <TextInput
          style={{height: 40}}
          placeholder="First Name"
          onChangeText={given_name => this.setState({given_name})}
          value={this.state.given_name}
        />

        <TextInput
          style={{height: 40}}
          placeholder="Surname"
          onChangeText={family_name => this.setState({family_name})}
          value={this.state.family_name}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Email"
          onChangeText={email => this.setState({email})}
          value={this.state.email}
        />

        <TextInput
          style={{height: 40}}
          placeholder="Password"
          onChangeText={password => this.setState({password})}
          value={this.state.password}
        />

        <Button
          title="Submit"
          onPress={() => {
            this.submit();
          }}
        />
      </View>
    );
  }
}
export default UpdateAccountScreen;
