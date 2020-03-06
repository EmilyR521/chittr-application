import React, {Component} from 'react';
import {Image, View, Button, StyleSheet, TextInput} from 'react-native';

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
    return (
      <View style={styles.bar}>
        <View style={styles.barContent}>
          <Image
            style={styles.photo_icon}
            source={require('./../assets/EditPencil.png')}
          />
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
                maxLength={40}
                onChange={event => {
                  console.log(
                    'event: ' + JSON.stringify(event.nativeEvent.text),
                  );
                  this.setState({
                    text: event.nativeEvent.text,
                  });
                  onChangeTextHandler(event.nativeEvent.text);
                }}
                value={this.state.text}
                placeholder={'Type a message...'}
              />
            </View>
          </View>
          <Button
            title="Submit"
            onPress={() => {
              console.log('submitted');
              onSubmit();
            }}
          />
        </View>
      </View>
    );
  }
}
export default CreateChit;
