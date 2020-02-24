import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
class HomeScreen extends Component {
    render() {
        return (
            <View>
                <Text>Home Screen</Text>
                <Button
                    title="Landing"
                    onPress={() => this.props.navigation.navigate('Landing')}
                />
            </View>

        );
    }
}
export default HomeScreen;