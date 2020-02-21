import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
  ScrollView
} from 'react-native';
import * as firebase from 'firebase';
import Input from '../components/Input';
import {firebaseAuth} from '../enviorment/config';
import Feather from 'react-native-vector-icons/Feather';
console.disableYellowBox = true;
const data_array = [];
class TutorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      city: '',
      uid: '',
      address: '',
      data: [],
    };
  }

  handleTutor() {
    const {currentUser} = firebaseAuth;
    firebase
      .database()
      .ref(`tutors/${currentUser.uid}/tutor_info`)
      .set({
        name: this.state.name,
        phone: this.state.phone,
        city: this.state.city,
        address: this.state.address,
      })
      .then(data => {
        this.props.navigation.navigate('Final');
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={{}}>
          <Text style={{textAlign: 'center', marginBottom: 20, backgroundColor:'red', fontSize:20}}>
            Tutor Details
          </Text>
        </View>
        <View style={{bottom: 20}}>
          <View style={{marginBottom:-100}}>
          <Input
            placeholder="Name"
            label="Name"
            onChangeText={name => this.setState({name})}
            value={this.state.name}
          />
          </View>
          <View style={{marginBottom:-100}}>
          <Input
            placeholder="Phone No"
            label="Phone No:"
            onChangeText={phone => this.setState({phone})}
            value={this.state.phone}
          />
            </View>
            <View style={{marginBottom:-80}}>
          <Input
            placeholder="City"
            label="City"
            onChangeText={city => this.setState({city})}
            value={this.state.city}
          />
          </View>
          <View style={{marginBottom:-40}}>
          <Input
            placeholder="Address"
            label="Address"
            onChangeText={address => this.setState({address})}
            value={this.state.address}
          />
          </View>
        </View>
        <View style={{bottom: 15}}>
          <Button
            title="submit"
            style={styles.btn}
            onPress={this.handleTutor.bind(this)}
          />
        </View>
      </View>
      </ScrollView>
    );
  }
}

TutorScreen.navigationOptions = {
  headerTitle: 'Tutor Details',
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7a7aff',
    flex: 1,
  },

  btn: {
    backgroundColor: 'blue',
    borderColor: 'blue',
    borderRadius: 5,
    borderWidth: 1,
    width: 100,
    height: 35,
    alignItems: 'center',
  },
});

export default TutorScreen;
