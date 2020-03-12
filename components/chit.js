import React, {Component} from 'react';
import {Image, View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {getChitPhoto} from '../services/PostingChits';
import {styles} from '../styles/Chit.style';
import {themeColours} from '../styles/themeColours';

class Chit extends Component {
  constructor(props) {
    super(props);
    this.state = {text: '', hasImage: false};
    this.checkForImage();
  }

  checkForImage = async () => {
    const {chit} = this.props;
    var response = await getChitPhoto(chit.chit_id);
    if (response == true) {
      this.setState({
        hasImage: true,
      });
    }
  };

  hasImageView() {
    const {chit} = this.props;
    if (this.state.hasImage == true) {
      return (
        <View
          style={{
            maxHeight: 300,
          }}>
          <Image
            source={{
              uri:
                `http://10.0.2.2:3333/api/v0.0.5/chit/${chit.chit_id}/photo?` +
                Date.now(),
            }}
            style={{height: 150, borderRadius: 10}}
          />
        </View>
      );
    } else {
      return null;
    }
  }

  render() {
    const {user} = this.props;
    const {chit} = this.props;
    const {navigation} = this.props;

    return (
      <View style={styles.chit}>
        <View style = {styles.chit_user_photo_wrapper}>
          <TouchableHighlight
            onPress={() =>
              navigation.push('Account', {
                userId: this.props.user.user_id,
              })
            }>
            <Image
              source={{
                uri:
                  `http://10.0.2.2:3333/api/v0.0.5/user/${user.user_id}/photo?` +
                  Date.now(),
              }}
              defaultSource={require('../assets/personDefault.png')}
              style={styles.chit_user_photo}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.chit_content}>
          <Text style={styles.user}>
            {' '}
            {user.given_name} {user.family_name}
          </Text>
          <Text style={styles.chitText}> {chit.chit_content}</Text>
          {this.hasImageView()}
        </View>
      </View>
    );
  }
}
export default Chit;
