import React, {Component} from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import {createUser} from '../services/UserManagement';
import {styles} from '../styles/RegistrationScreen.style';
class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', given_name: '', family_name: ''};
  }

  async submit() {    
    await createUser(this.state.given_name, this.state.family_name, this.state.email,this.state.password);
    this.props.navigation.navigate('Landing');
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
