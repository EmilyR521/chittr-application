import React, { Component } from 'react';
import { Image, View, FlatList, StyleSheet, Text } from 'react-native';

const CHITS = [
    {
        "timestamp": 0,
        "chit_content": "I have this opinion I want to share",
        "location": {
            "longitude": 0,
            "latitude": 0
        },
        "user": {
            "user_id": 15,
            "given_name": "Internet",
            "family_name": "Person",
            "email": "internetperson1@email.com"
        }
    },
    {
        "timestamp": 0,
        "chit_content": "I hate seeing people's dumb opinions",
        "location": {
            "longitude": 0,
            "latitude": 0
        },
        "user": {
            "user_id": 12,
            "given_name": "Another",
            "family_name": "Person",
            "email": "anotherinternetperson@email.com"
        }
    },
];


function Chit({ chit }) {
    return (
        <View style={styles.chit}>
            <Image
                style={styles.chit_photo}
                source={require('./../assets/personDefault.png')}
            />
            <View style={styles.chit_content}>
                <Text style={styles.user}> {chit.user.given_name} {chit.user.family_name}</Text>
                <Text> {chit.chit_content}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    chit: {
        backgroundColor: '#fff1f0',
        marginVertical: 5,
        flexDirection: "row"
    },
    chit_photo: {
        width: 60, height: 60
    },
    chit_content: { 
        flexDirection: "column" 
    },
    user: {
        fontSize: 26,
    },
});

class FeedScreen extends Component {

    render() {
        return (
            <View>
                <FlatList
                    data={CHITS}
                    renderItem={({ item }) => <Chit chit={item} />}
                    keyExtractor={item => item.user.user_id + item.timestamp}
                />
            </View>
        );
    }
}
export default FeedScreen;