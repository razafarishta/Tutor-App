/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from 'react-native';
import Input from '../components/Input';
//import Food from '../assets/Food.png';
import Logo from '../components/Logo';
import firebase from 'react-native-firebase';

class SignInnScreen extends Component {
  // static navigationOptions = {
  // header: null,
  //};
  state = {
    email: 'aliraza@gmail.com',
    password: '123456789',
    //name:'ali',
    errorMessage: null,
    loading: false,
    loggedIn: false,
  };
  handleLogin = () => {
    console.log('handleLogin');
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({loggedIn: true});
        this.props.navigation.navigate('Home');
      })
      .catch(error => this.setState({errorMessage: error.message}));
  };
  componentDidMount() {
    if (this.state.loggedIn) {
      this.props.navigation.push('Home');
    }
  }

  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView style={{flex: 1, justifyContent: 'center'}}>
          <View style={styles.container}>
            <Logo />
            {this.state.errorMessage && (
              <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
            )}

            <Input
              placeholder="user@gmail.com"
              value={this.state.email}
              onChangeText={email => this.setState({email})}
            />

            <Input
              secureTextEntry
              placeholder="Password"
              value={this.state.password}
              onChangeText={password => this.setState({password})}
            />

            <View style={{width: '80%', alignItems: 'center', flex: 0.8}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#ffffff',
                  height: 40,
                  width: '100%',
                  marginTop: 10,
                  borderRadius: 10,
                  justifyContent: 'center',
                }}
                onPress={this.handleLogin}>
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginTop: '20%',
                flex: 0.2,
                borderTopWidth: 1,
                borderColor: 'black',
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text
                style={{paddingBottom: '20%', fontSize: SCREEN_WIDTH * 0.05}}>
                Don't have an account?
                <Text style={{fontWeight: 'bold', color: 'black'}}>
                  Sign up
                </Text>
              </Text>
            </View>

            {/*
            <View style={styles.dontView}>
              <Button
                color="#7a7aff"
                title="Don't have an account? Sign Up"
                onPress={() => this.props.navigation.navigate('signup')}
                style={styles.signupDont}
              />
            </View>*/}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
SignInnScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Sign In',
    headerTintColor: '#7a7aff',
    headerStyle: {
      backgroundColor: '#ffffff',
      //fontWeight:'bold'
    },
  };
};
const styles = StyleSheet.create({
  inputView: {
    //marginLeft:5
    marginTop: -50,
  },
  input2View: {
    marginTop: -120,
  },
  errorMessage: {
    textAlign: 'center',
    marginTop: 10,
    color: '#ff0000',
  },
  container: {
    backgroundColor: '#7a7aff',
    flex: 1,
    //height:300,
    alignItems: 'center',
    justifyContent: 'center',
    // height: '100%',

    width: '100%',
  },
  signupText: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  signupDont: {
    fontSize: 50,
    //marginVertical: 50,
    color: '#7a7aff',
  },
  signupBtn: {
    marginBottom: 5,
    backgroundColor: '#7a7aff',
    borderWidth: 1,
    borderRadius: 5,
    //borderColor: 'blue',
    width: 100,
    height: 35,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
    //marginVertical: 10,
  },
  buttonText: {
    color: '#7a7aff',
    textAlign: 'center',
    fontWeight: 'bold',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
  },
  error: {
    color: '#E9446A',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },

  dontView: {
    marginVertical: 20,
  },
});
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
export default SignInnScreen;
