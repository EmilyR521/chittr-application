import React, { Component } from 'react';
import { Image, View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';

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

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            chitData: []
        }
    }

    getData() {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    isLoading: false,
                    chitData: responseJson,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getData();
    }


    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <View>
                <FlatList
                    data={this.state.chitData}
                    renderItem={({ item }) => <Chit chit={item} />}
                    keyExtractor={item => item.chit_id}

                />
            </View>
        );
    }
}
export default FeedScreen;