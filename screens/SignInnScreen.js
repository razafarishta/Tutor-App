/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import Input from '../components/Input';
//import Food from '../assets/Food.png';
import Logo from '../components/Logo';
import {firebaseAuth} from '../enviorment/config';

class SignInnScreen extends Component {
  // static navigationOptions = {
  // header: null,
  //};
  state = {
    email: 'aliraza@gmail.com',
    password: '123456789',
    errorMessage: null,
    loading: false,
    loggedIn: false,
  };
  handleLogin = () => {
    console.log('handleLogin');
    firebaseAuth
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
          <View style={styles.inputView}>
          <Input
            placeholder="user@gmail.com"
            label="mail:"
            value={this.state.email}
            onChangeText={email => this.setState({email})}
          />
          </View>
          <View style={styles.input2View}>
          <Input
            secureTextEntry
            label="Password:"
            placeholder="Password"
            value={this.state.password}
            onChangeText={password => this.setState({password})}
          />
          </View>
          <TouchableOpacity onPress={this.handleLogin}>
            <View style={styles.signupBtn}>
              <Text style={styles.buttonText}>Login</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.dontView}>
            <Button
             color='#7a7aff'
              title="Don't have an account? Sign Up"
              onPress={() => this.props.navigation.navigate('signup')}
              style={styles.signupDont}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
SignInnScreen.navigationOptions = (navData) =>{
  return{
    headerTitle:'Sign In',
    headerTintColor:'white',
   
    headerStyle:{
      backgroundColor:'#7a7aff',
      //fontWeight:'bold'
    }
  }
}
const styles = StyleSheet.create({
  inputView:{
    //marginLeft:5
    marginTop:-50
  },
  input2View:{
    marginTop:-120
  },
  errorMessage: {
    textAlign: 'center',
    marginTop: 10,
    color: '#ff0000',
  },
  container: {
    backgroundColor: '#7a7aff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    color:'#7a7aff'
  },
  signupBtn: {
    borderRadius: 1,
    marginBottom: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'blue',
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
    fontWeight:'bold'
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
export default SignInnScreen;
