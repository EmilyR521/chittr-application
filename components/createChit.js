import React, {Component} from 'react';
import {
  Image,
  View,
  Button,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#C0EEE8',
  },
  barContent: {
    flexDirection: 'row',
  },
  photo_icon: {
    width: 70,
    height: 70,
  },
  content: {flex: 1},
  user: {
    fontSize: 26,
  },
});

class CreateChit extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    const {onChangeTextHandler} = this.props;
    const {onSubmit} = this.props;
    const {navigation} = this.props;

    return (
      <View style={styles.bar}>
        <View style={styles.barContent}>
          <TouchableHighlight
            onPress={() =>
              navigation.navigate('Camera')
            }>
            <Image
              style={styles.photo_icon}
              source={require('./../assets/CameraIcon.png')}
            />
          </TouchableHighlight>
          <View style={styles.content}>
            <View
              style={{
                backgroundColor: 'white',
                borderBottomColor: '#000000',
                borderBottomWidth: 1,
              }}>
              <TextInput
                {...this.props}
                multiline
                numberOfLines={3}
                editable
                maxLength={141}
                onChange={event => {
                  this.setState({
                    text: event.nativeEvent.text,
                  });
                  onChangeTextHandler(event.nativeEvent.text);
                }}
                value={this.state.text}
                placeholder={'Type a chit...'}
              />
            </View>
          </View>
          <Button
            title="Submit"
            onPress={() => {
              onSubmit();
            }}
          />
        </View>
      </View>
    );
  }
}
export default CreateChit;
