import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
class RegistrationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { email: '', password: '', firstName: "", surname: "" };
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',

            }}>

                <Text>Introduce yourself!</Text>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="First Name"
                    onChangeText={(firstName) => this.setState({ firstName })}
                    value={this.state.firstName}
                />

                <TextInput
                    style={{ height: 40 }}
                    placeholder="Surname"
                    onChangeText={(surname) => this.setState({ surname })}
                    value={this.state.surname}
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
                    title="Submit"
                    onPress={() => this.props.navigation.navigate('Account')}
                />

            </View>
        );
    }
}
export default RegistrationScreen;