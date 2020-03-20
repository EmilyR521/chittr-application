import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  Button,
  StatusBar,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {login} from '../services/UserManagement';
import {styles} from '../styles/LandingScreen.style';
import {headerStyles} from '../styles/Header.style';
import headerRightView from '../components/HeaderRight';
import GLOBAL from '../global';
import themeColours from '../styles/ThemeColours';
import {globalStyles} from '../styles/Global.style';
import {TouchableOpacity} from 'react-native-gesture-handler';

// Screen to show on app startup, allows login or registration, or skips to feed
class LandingScreen extends Component {
  //set navigation header styles and nav buttons
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: '',
      headerStyle: headerStyles.headerBar,
      headerRight: headerRightView(true, false, true, navigation),
    };
  };

  constructor(props) {
    super(props);

    //this.timeoutFunc = this.setTimeout.bind(this);
    this.state = {
      email: '',
      password: '',
      location: null,
      locationPermission: false,
    };
  }

  alertLoginDetailsWrong() {
    Alert.alert(
      'Sorry!',
      "Those details weren't quite right. Try again?",
      [
        {
          text: 'Okay',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  }

  async submit() {
    const responseJson = await login(this.state.email, this.state.password);
    if (responseJson == 'invalid') {
      this.alertLoginDetailsWrong();
    } else {
      GLOBAL.authToken = responseJson.token;
      (GLOBAL.currentUser = responseJson.id),
        this.props.navigation.navigate('Account', {});
    }
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
          <Image style={styles.logo} source={require('./../assets/logo.png')} />
          <View>
            <Text style={styles.infoText}> Email</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={email => this.setState({email})}
              value={this.state.email}
            />
          </View>
          <View>
            <Text style={styles.infoText}>Password</Text>
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
              <View style={styles.loginRegButton}>
                <Text style={styles.buttonText}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.hr} />
          <Text style={styles.infoText}>
            New here? Create an account to start your chittr story!
          </Text>
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Registration')}>
              <View style={styles.loginRegButton}>
                <Text style={styles.buttonText}>Register</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Feed')}>
              <View style={styles.skipLoginButton}>
                <Text style={styles.skipLoginText}>
                  No thanks, just take me to the feed.
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default LandingScreen;
