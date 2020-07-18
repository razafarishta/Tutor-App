import React, {Component} from 'react';
import {View, Text} from 'react-native';
import firebase from 'react-native-firebase';

class SettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {currentUser: null};
  }

  componentDidMount() {
    const {currentUser} = firebase.auth();
    this.setState({currentUser});
  }
  render() {
    const {currentUser} = this.state;
    return (
      <View style={{flex: 1, alignItems: 'flex-start'}}>
        <View style={{alignContent: 'flex-start'}}>
          <Text style={{alignItems: 'flex-start'}}>Name:</Text>
        </View>
        <View>
          <Text>{currentUser && currentUser.email}</Text>
        </View>
      </View>
    );
  }
}
export default SettingScreen;
