import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {firebaseAuth} from '../enviorment/config';
import Feather from 'react-native-vector-icons/Feather';
import tutor from '../assets/tutor.png';
import student from '../assets/student.png';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {currentUser: null, errorMessage: null};
  }
  componentDidMount() {
    const {currentUser} = firebaseAuth;
    this.setState({currentUser});
  }

  onPressButton = () => {
    firebaseAuth
      .signOut()
      .then(() => this.props.navigation.navigate('SignIn'))
      .catch(error => this.setState({errorMessage: error.message}));
  };
  render() {
    const {currentUser} = this.state;
    return (
      <View style={styles.container}>
        <Text style={{fontSize:20, marginBottom:10}}>Hi {currentUser && currentUser.email}!</Text>
      
        <TouchableOpacity
          style={{borderWidth:.5, borderColor:'#7a7aff'}}
          onPress={() => {
            this.props.navigation.navigate('Tutor');
          }}>
            <Image source={tutor} />
          <Text style={styles.btnText}>Tutor</Text>
        </TouchableOpacity>
        <View style={{marginTop:10}}>
          <TouchableOpacity 
          style={{borderWidth:.5, borderColor:'#7a7aff'}}
          onPress={()=>{this.props.navigation.navigate('Final')}}>
          <Image source={student} />
           <Text style={styles.btnText}>Student</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{marginTop: 13, backgroundColor:'#7a7aff', width: 100, height:35, borderWidth:3}} onPress={this.onPressButton}>
          <Text style={{textAlign:'center', alignItems:'center', justifyContent:'center'}}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

HomeScreen.navigationOptions = navData => {
  return {
    headerTitle: 'HOME',
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:'#7a7aff'
  },
  btnText: {
    fontSize: 20,
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
    color:'#7a7aff',
    fontWeight:'bold'
  },
  btn: {
    backgroundColor: '#7a7aff',
    borderRadius: 5,
    borderColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 35,
  },
});
export default HomeScreen;
