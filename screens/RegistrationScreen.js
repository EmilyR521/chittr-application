import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {createUser} from '../services/UserManagement';
import {styles} from '../styles/RegistrationScreen.style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {headerStyles} from '../styles/Header.style';
import GLOBAL from '../global';
import themeColours from '../styles/themeColours';
import {globalStyles} from '../styles/Global.style';

// Screen to allow new users to sign up
class RegistrationScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerStyle: headerStyles.headerBar,
    };
  };
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', given_name: '', family_name: ''};
  }

  async submit() {
    await createUser(
      this.state.given_name,
      this.state.family_name,
      this.state.email,
      this.state.password,
    );
    this.props.navigation.navigate('Landing');
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
          <Text style={styles.headline}>Introduce yourself!</Text>

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
                <Text style={styles.buttonText}>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default RegistrationScreen;
