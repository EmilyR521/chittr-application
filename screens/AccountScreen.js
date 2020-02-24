import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, Image, Button } from 'react-native';

const CHITS = [
    {
        "timestamp": 0,
        "chit_content": "This is my most recent chit",
        "location": {
            "longitude": 0,
            "latitude": 0
        },
        "user": {
            "user_id": 8,
            "given_name": "Emily",
            "family_name": "Rogers",
            "email": "sampleemail@email.com"
        }
    },
    {
        "timestamp": 0,
        "chit_content": "This is an older chit",
        "location": {
            "longitude": 0,
            "latitude": 0
        },
        "user": {
            "user_id": 8,
            "given_name": "Emily",
            "family_name": "Rogers",
            "email": "sampleemail@email.com"
        }
    },

    {
        "timestamp": 0,
        "chit_content": "This is another chit",
        "location": {
            "longitude": 0,
            "latitude": 0
        },
        "user": {
            "user_id": 8,
            "given_name": "Emily",
            "family_name": "Rogers",
            "email": "sampleemail@email.com"
        }
    },

    {
        "timestamp": 0,
        "chit_content": "This is yet another chit",
        "location": {
            "longitude": 0,
            "latitude": 0
        },
        "user": {
            "user_id": 8,
            "given_name": "Emily",
            "family_name": "Rogers",
            "email": "sampleemail@email.com"
        }
    },
    {
        "timestamp": 0,
        "chit_content": "This is anooother chit",
        "location": {
            "longitude": 0,
            "latitude": 0
        },
        "user": {
            "user_id": 8,
            "given_name": "Emily",
            "family_name": "Rogers",
            "email": "sampleemail@email.com"
        }
    },
];

const styles = StyleSheet.create({
    chit_container: {

    },
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


class AccountScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { email: 'sampleemail@email.com', password: 'secret', firstName: "Emily", surname: "Rogers" };
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginVertical: 5
            }}>
                <View>
                    <Image
                        style={{ width: 200, height: 200, borderRadius: 200 / 2 }}
                        source={require('./../assets/personDefault.png')}
                    />
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flexDirection: "column" }}>
                        <Text style={styles.user}>{this.state.firstName} {this.state.surname}</Text>
                        <Text>{this.state.email}</Text>
                    </View>
                    <Image
                        style={{ width: 50, height: 50, alignSelf: "flex-end" }}
                        source={require('./../assets/EditPencil.png')}
                    />
                </View>
                <View style= {{flexDirection:"row", alignItems:"center", marginHorizontal:10}}>
                    <Button
                        title="Followers"
                        onPress={() => this.props.navigation.navigate('FollowList')}
                    />
                    <Button
                        title="Following"
                        onPress={() => this.props.navigation.navigate('FollowList')}
                    />
                </View>
                <ScrollView style={{
                    alignSelf: 'stretch',
                    flexGrow: 0
                }}>
                    <FlatList
                        data={CHITS}
                        renderItem={({ item }) => <Chit chit={item} />}
                        keyExtractor={item => item.user.user_id + item.timestamp}
                    />
                </ScrollView>
            </View >
        );
    }
}
export default AccountScreen;