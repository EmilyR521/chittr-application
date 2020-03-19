import React, {Component} from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import themeColours from '../styles/themeColours';

//component for display a user in a list of users.
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
      <View style={styles.user}>
        <View style={styles.user_photo_wrapper}>
          <TouchableHighlight
            onPress={() =>
              navigation.push('Account', {
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
              style={styles.user_photo}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.user_content}>
          <Text style={styles.name}>
            {' '}
            {this.props.user.given_name} {this.props.user.family_name}
          </Text>
          <TouchableOpacity
            onPress={() => {
              onFollow(this.props.user, buttonTitle);
            }}>
            <View style={styles.followButton}>
              <Text style={styles.buttonText}>{buttonTitle}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  user: {
    flex: 1,
    alignSelf: 'stretch',
    marginVertical: 5,
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'stretch',
    backgroundColor: '#C0EEE8',
  },
  user_photo_wrapper: {
    alignSelf: 'flex-start',
  },
  user_photo: {
    margin: 10,
    width: 60,
    height: 60,
  },
  user_content: {
    marginTop: 5,
    marginRight: 10,
    marginBottom: 10,
    flexDirection: 'column',
  },
  name: {
    fontSize: 26,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    fontSize: 20,
    color: themeColours.darkBlue,
  },
  followButton: {
    backgroundColor: themeColours.darkBlue,
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 3,
  },
  buttonText: {
    color: 'white',
  },
});
export default UserInList;
