import React, {Component} from 'react';
import {Image, View, Text, StyleSheet, Button, TouchableHighlight} from 'react-native';

const styles = StyleSheet.create({
  chit: {
    backgroundColor: '#C0EEE8',
    marginVertical: 5,
    flexDirection: 'row',
  },
  chit_photo: {
    width: 60,
    height: 60,
  },
  chit_content: {
    flexDirection: 'column',
  },
  user: {
    fontSize: 26,
  },
});

class UserInList extends Component {
  constructor(props) {
    super(props);
    this.state = {follow: ''};
  }

  render() {
    const {onFollow} = this.props;    
    const {navigation} = this.props;
    var buttonTitle = this.props.isFollowed ? 'Unfollow' : 'Follow';
    return (
      <View style={styles.chit}>
        <View>
          <TouchableHighlight
            onPress={() =>
              this.props.navigation.navigate('Account', {
                authToken: this.state.authToken,
                userId: this.props.user.user_id,
              })
            }>
            <Image
              source={{
                uri:
                  `http://10.0.2.2:3333/api/v0.0.5/user/${this.props.user.user_id}/photo?` +
                  Date.now(),
              }}
              defaultSource={require('../assets/personDefault.png')}
              style={styles.chit_photo}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.chit_content}>
          <Text style={styles.user}>
            {' '}
            {this.props.user.given_name} {this.props.user.family_name}
          </Text>
          <Button
            title={buttonTitle}
            onPress={() => {
              console.log('hit follow');
              onFollow(this.props.user, buttonTitle);
            }}
          />
        </View>
      </View>
    );
  }
}
export default UserInList;
