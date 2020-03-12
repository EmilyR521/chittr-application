import React, {Component} from 'react';
import {NavigationEvents} from 'react-navigation';
import {View, FlatList, ActivityIndicator} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Chit from '../components/chit';
import CreateChit from '../components/createChit';
import {getChits} from '../services/PostingChits';
import {styles} from '../styles/FeedScreen.style';
import {headerStyles} from '../styles/Header.style';
import headerRightView from '../components/headerRight';
import {globalStyles} from '../styles/Global.style';

class FeedScreen extends Component {
  static navigationOptions = ({navigation}) => {
    var loggedIn = !(
      GLOBAL.currentUser == undefined || GLOBAL.currentUser == ''
    );
    return {
      headerTitle: '',
      headerStyle: headerStyles.headerBar,
      headerRight: headerRightView(false, loggedIn, true, navigation),
    };
  };

  constructor(props) {
    super(props);

    var imageData = this.props.navigation.state.params?.imageData;
    this.state = {
      isLoading: true,
      imageData: imageData != null ? imageData : {},
    };
  }
  componentDidMount() {
    this.onFocus();
  }
  onFocus() {
    this.getChitData();
    var imageData = this.props.navigation.state.params?.imageData;
    this.setState({
      filePath: imageData,
    });
  }

  getChitData = async () => {
    var responseJson = await getChits();
    this.setState({
      isLoading: false,
      chitData: responseJson,
    });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <KeyboardAwareScrollView
        style={globalStyles.bgContainer}
        resetScrollToCoords={{x: 0, y: 0}}
        contentContainerStyle={globalStyles.container}
        scrollEnabled={false}>
        <NavigationEvents onWillFocus={() => this.onFocus()} />
        <View style={globalStyles.container}>
          <FlatList
            style={styles.list}
            data={this.state.chitData}
            renderItem={({item}) => (
              <Chit
                chit={item}
                user={item.user}
                navigation={this.props.navigation}
              />
            )}
            keyExtractor={item => item.chit_id}
          />
        </View>
        <View style={styles.bottom}>
          <CreateChit
            navigation={this.props.navigation}
            imageData={this.imageData}
            refreshList={this.getChitData}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default FeedScreen;
