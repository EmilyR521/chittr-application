import GLOBAL from '../global';
import React, {Component, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {styles} from '../styles/DraftsScreen.style';
import Chit from '../components/Chit';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {globalStyles} from '../styles/Global.style';
import {headerStyles} from '../styles/Header.style';
import headerRightView from '../components/HeaderRight';
import themeColours from '../styles/ThemeColours';
import {
  View,
  Button,
  StatusBar,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import BackgroundTimer from 'react-native-background-timer';
import {postChit} from '../services/PostingChits';
import {getAllDrafts, retrieveChitDraft} from '../services/PersistData';

// Screen to display and schedule saved drafts
class DraftsScreen extends Component {
  //set navigation header styles and nav buttons
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: '',
      headerStyle: headerStyles.headerBar,
      headerRight: headerRightView(true, false, true, navigation),
    };
  };

  constructor(props) {
    super(props);
    this.timeoutFunc = this.setTimeout.bind(this);
    this.getDrafts();
    this.state = {
      isLoading: true,
    };
  }

  retrieveDraft = async key => {
    if (this.state.userData == null) {
      this.alertLoginNeeded;
    } else {
      let body = await retrieveChitDraft(key);
      console.log('retrieved:' + body);
    }
  };

  onSubmit = async key => {
    let body = await retrieveChitDraft(key);
    console.log('body: ' + body);
    await postChit(body);
  };

  setTimeout(key, milliseconds) {
    console.log('timerSet');
    BackgroundTimer.setTimeout(() => {
      console.log('timeComplete');
      this.onSubmit(key);
    }, milliseconds);
  }

  getDrafts = async () => {
    if (GLOBAL.currentUser == null) {
      this.alertLoginNeeded;
    } else {
      let drafts = await getAllDrafts();
      console.log('retrievedAll:' + drafts);
      this.setState({drafts: drafts, isLoading: false});
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <KeyboardAwareScrollView
          style={globalStyles.bgContainer}
          resetScrollToCoords={{x: 0, y: 0}}
          contentContainerStyle={globalStyles.container}
          scrollEnabled={false}>
          <StatusBar backgroundColor={themeColours.darkBlue}></StatusBar>
          <View style={globalStyles.container}>
            <View>
              <Text style={styles.title}>Your drafts:</Text>
            </View>
            <ScrollView
              style={{
                alignSelf: 'stretch',
                flexGrow: 0,
              }}>
              <FlatList
                data={this.state.drafts}
                renderItem={({item}) => (
                  <View style={styles.item}>
                    <Text>{item}</Text>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          this.onSubmit(item);
                        }}>
                        <View style={styles.draftSchedButton}>
                          <FontAwesome5
                            name={'angle-double-right'}
                            size={20}
                            color={themeColors.lightBlue}
                          />
                          <Text style={styles.buttonText}>Post Now</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.buttonRow}>
                      <View style={styles.instruction}>
                        <Text>Schedule for:</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          this.setTimeout(item, 60000);
                        }}>
                        <View style={styles.draftSchedButton}>
                          <FontAwesome5
                            name={'clock'}
                            size={20}
                            color={themeColors.midPink}
                          />
                          <Text style={styles.buttonText}>1 min</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          this.setTimeout(item, 60000 * 5);
                        }}>
                        <View style={styles.draftSchedButton}>
                          <FontAwesome5
                            name={'clock'}
                            size={20}
                            color={themeColors.midPink}
                          />
                          <Text style={styles.buttonText}>5 mins</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          this.setTimeout(item, 60000 * 30);
                        }}>
                        <View style={styles.draftSchedButton}>
                          <FontAwesome5
                            name={'clock'}
                            size={20}
                            color={themeColors.midPink}
                          />
                          <Text style={styles.buttonText}>30 mins</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => index}
              />
            </ScrollView>
          </View>
        </KeyboardAwareScrollView>
      );
    }
  }
}
export default DraftsScreen;
