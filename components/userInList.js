import React, {Component} from 'react';
import {Image, View, Text, StyleSheet, Button} from 'react-native';

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
    return (
      <View style={styles.chit}>
        <Image
          style={styles.chit_photo}
          source={require('./../assets/personDefault.png')}
        />
        <View style={styles.chit_content}>
          <Text style={styles.user}>
            {' '}
            {this.props.user.given_name} {this.props.user.family_name}
          </Text>
          <Button
            title="Follow"
            onPress={() => {
              console.log('hit follow');
              onFollow(this.props.user);
            }}
          />
        </View>
      </View>
    );
  }
}
export default UserInList;
