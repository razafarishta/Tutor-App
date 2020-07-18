import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import firebase from 'react-native-firebase';

import Feather from 'react-native-vector-icons/Feather';
import tutor from '../assets/tutor.png';
import student from '../assets/student.png';
//import Carousel from '../components/Carousel';
var name_array = [];
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {currentUser: null, errorMessage: null, named: ''};
  }
  componentDidMount() {
    // var usid = firebase.auth().currentUser.uid;
    //var ref = firebase.database().ref(`users/`+ usid + "/");
    const {currentUser} = firebase.auth();
    this.setState({currentUser});
    this.showName();
  }
  showName() {
    var uid = firebase.auth().currentUser.uid;
    const {currentUser} = firebase.auth();
    var db = firebase
      .database()
      .ref(`users/${uid}`)
      .on('value', snapshot => {
        // let named=''
        snapshot.forEach(named => {
          //if(named.val().email!==uid)
          // console.log(named.val().email)
          name_array.push(named.val());
          console.log('named', name_array[1]);
        });
        this.setState({named: name_array});
        console.log('namenew', name_array[1]);
      });

    //this.arrayholder = name_array;
    //  const name_array = [];
  }

  onPressButton = () => {
    firebase
      .auth()
      .signOut()
      .then(() => this.props.navigation.navigate('SignIn'))
      .catch(error => this.setState({errorMessage: error.message}));
  };
  render() {
    // this.state={
    //   name: firebaseAuth.currentUser.name
    // }
    // const {currentUser} = this.state;
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20, marginBottom: 10}}>
          Hi {this.state.named}!
        </Text>
        {/*
    <FlatList 
      style={{margin:10}}
      named={this.state.named}
      extraData={this.state}  
      renderItem={({item, index}) => {
      return <Text style={{fontSize:50}}>Hi{item.name}</Text>
      }}
      keyExtractor={(item,index)=>{index.toString()}}
    />*/}

        <TouchableOpacity
          style={{borderWidth: 0.5, borderColor: '#7a7aff'}}
          onPress={() => {
            this.props.navigation.navigate('Tutor');
          }}>
          <Image source={tutor} />
          <Text style={styles.btnText}>Tutor</Text>
        </TouchableOpacity>
        <View style={{marginTop: 10}}>
          <TouchableOpacity
            style={{borderWidth: 0.5, borderColor: '#7a7aff'}}
            onPress={() => {
              this.props.navigation.navigate('Student');
            }}>
            <Image source={student} />
            <Text style={styles.btnText}>Student</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            marginTop: 13,
            backgroundColor: '#7a7aff',
            width: 100,
            height: 35,
            borderWidth: 3,
          }}
          onPress={this.onPressButton}>
          <Text
            style={{
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            Logout
          </Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#7a7aff',
    fontWeight: 'bold',
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
