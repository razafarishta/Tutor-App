import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {firebaseAuth} from '../enviorment/config';
class LoadingScreen extends Component {
  componentDidMount() {
    firebaseAuth.onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Home' : 'signup');
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default LoadingScreen;
