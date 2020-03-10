import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
// import {RNCamera} from 'react-native-camera';
// import {setUserPhoto} from '../services/UserManagement';
// import {setChitPhoto} from '../services/PostingChits';

class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };

    console.log(JSON.stringify(this.state));
  }

  async takePicture() {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      if (this.state.chitId != '') {
        this.setChitImage(body);
      } else {
        this.setProfileImage(data);
      }
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}>
            <Text style={{fontSize: 16}}>CAPTURE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'column'},
  preview: {flex: 1, justifyContent: 'flex-end', alignItems: 'center'},
  capture: {
    flex: 0,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default CameraScreen;
