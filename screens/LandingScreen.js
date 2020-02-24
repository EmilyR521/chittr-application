import React, { Component } from 'react';
import { Text, View, Image, TextInput, Button } from 'react-native';
//import {logo} from'./../assets/logo.png';
class LandingScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                
            }}>
                <Image
                    style={{
                        width: 100,
                        height: 100
                    }}
                    source={require('./../assets/logo.png')}
                />

                <TextInput
                    style={{ height: 40 }}
                    placeholder="Email"
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                />

                <TextInput
                    style={{ height: 40 }}
                    placeholder="Password"
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                />

                <Button
                    title="Login"
                    onPress={() => this.props.navigation.navigate('Feed')}
                />

                <View
                    style={{
                        alignSelf:'stretch',
                        borderBottomColor: 'black',
                        borderBottomWidth: 0.5,
                    }}
                />

                <Text>New here? Create an account to start your chittr story!</Text>

                <Button
                    title="Register"
                    onPress={() => this.props.navigation.navigate('Registration')}
                />

            </View>
        );
    }
}
export default LandingScreen;