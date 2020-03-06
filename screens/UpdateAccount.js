import React, {Component} from 'react';
import {Text, View, TextInput, Button} from 'react-native';

import {updateUser} from '../services/UserManagement';
class UpdateAccountScreen extends Component {
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
      authToken: token,
      userId: id,
      email: '',
      password: '',
      given_name: '',
      family_name: '',
    };
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
    console.log('body:' + bodyString);

    await updateUser(this.state.userId, bodyString, this.state.authToken);

    this.props.navigation.navigate('Account', {
      authToken: this.state.authToken,
      userId: this.state.userId,
    });
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
