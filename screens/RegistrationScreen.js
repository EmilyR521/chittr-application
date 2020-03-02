import React, {Component} from 'react';
import {Text, View, TextInput, Button} from 'react-native';
class RegistrationScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {email: '', password: '', given_name: '', family_name: ''};
  }

  submit() {
    let bodyString = JSON.stringify({
      given_name: this.state.given_name,
      family_name: this.state.family_name,
      email: this.state.email,
      password: this.state.password,
    });
    console.log(bodyString);
    return fetch('http://10.0.2.2:3333/api/v0.0.5/user', {
      method: 'POST',
      body: bodyString,
    })
      .then(response => {
        this.props.navigation.navigate('Account');
      })
      .catch(error => {
        console.error(error);
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
        <Text>Introduce yourself!</Text>

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
export default RegistrationScreen;
