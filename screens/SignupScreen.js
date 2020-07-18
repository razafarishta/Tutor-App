/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Input from '../components/Input';
import firebase from 'react-native-firebase';

import Feather from 'react-native-vector-icons/Feather';
class SignupScreen extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: null,
    name: '',
    uid: '',
  };
  handleSignUp = () => {
    console.log('handleSignUp');
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        if (firebaseAuth.currentUser) {
          var userId = firebaseAuth.currentUser.uid;
          console.log('userId', userId);

          if (userId) {
            firebase
              .database()
              .ref('users/' + userId)
              .set({
                name: this.state.name,
                email: this.state.email,
                userid: userId,
              })
              .then(success => this.props.navigation.push('SignIn'))
              .catch(error => this.setState({errorMessage: error.message}));
          }
        }
      });
  };

  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView style={{flex: 1, justifyContent: 'center'}}>
          <View style={styles.container}>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>Sign up</Text>
            {/* <Text style={{fontSize: 30, top: 40}}>Sign Up</Text>*/}
            {this.state.errorMessage && (
              <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
            )}
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Input
                placeholder="User Name"
                label="NAME:"
                onChangeText={name => this.setState({name})}
                value={this.state.name}
              />

              <Input
                // name={'user-circle'}
                placeholder="Email"
                label="Email:"
                onChangeText={email => this.setState({email})}
                value={this.state.email}
              />

              <Input
                // name={'envelope-open'}
                secureTextEntry
                placeholder="Password"
                label="Password:"
                onChangeText={password => this.setState({password})}
                value={this.state.password}
              />
            </View>
            <View style={styles.buttonsView}>
              <TouchableOpacity onPress={this.handleSignUp}>
                <View style={styles.signupBtn}>
                  <Text style={styles.buttonText}> Sign Up</Text>
                </View>
              </TouchableOpacity>
              <Button
                color="transparent"
                title="Already have an account? Login"
                borderColor="blue"
                onPress={() => this.props.navigation.navigate('SignIn')}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
SignupScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Sign Up',
    headerLeft: (
      <Feather
        name="menu"
        size={25}
        onPress={() => {
          navData.navigation.toggleDrawer();
        }}
      />
    ),
  };
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7a7aff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 600,
  },
  inputView: {
    // marginHorizontal: 0,
    flex: 1,

    //marginBottom: 5,
    marginTop: -25,
    marginBottom: -10,
    flexDirection: 'row',
    alignItems: 'center',
    //bottom: 30,
  },
  buttonView: {
    //marginBottom: 100,
  },
  input2View: {
    // marginHorizontal: 0,
    flex: 1,

    //marginBottom: 5,
    // marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -85,
    marginVertical: 10,
    // bottom: 30,
  },

  input3View: {
    // marginHorizontal: 0,
    flex: 1,

    //marginBottom: 5,
    marginTop: -150,
    flexDirection: 'row',
    alignItems: 'center',
    //bottom: 30,
  },
  error: {
    color: '#E9446A',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },

  errorMessage: {
    textAlign: 'center',
    marginTop: 10,
    color: '#ff0000',
  },
  signupBtn: {
    borderRadius: 1,
    marginBottom: 5,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'blue',
    width: 100,
    height: 35,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70,
    marginLeft: 80,
    bottom: 10,

    //marginBottom:30
  },
  buttonText: {
    color: 'blue',
    textAlign: 'center',
  },
  buttonsView: {
    marginBottom: 150,
    alignItems: 'flex-start',
    bottom: 25,
  },
});

export default SignupScreen;
