import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Input from '../components/Input';
import firebase from 'react-native-firebase';
import Geolocation from '@react-native-community/geolocation';
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
      longitude: 0,
      latitude: 0,
      data: [],
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(info => {
      this.setState(
        {latitude: info.coords.latitude, longitude: info.coords.longitude},
        () => {
          this.setState({loading: false});
        },
      );
    });
  }

  handleTutor() {
    const {currentUser} = firebase.auth();
    firebase
      .database()
      .ref(`tutors/${currentUser.uid}/tutor_info`)
      .set({
        name: this.state.name,
        phone: this.state.phone,
        city: this.state.city,
        address: this.state.address,
        longitude: this.state.longitude,
        latitude: this.state.latitude,
      })
      .then(data => {
        this.props.navigation.navigate('TutorDe');
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={{marginBottom: 90}}>
            <View style={{}}>
              <Text
                style={{
                  textAlign: 'center',
                  marginBottom: 20,
                  //backgroundColor: 'red',
                  fontSize: 30,
                }}>
                Info:
              </Text>
            </View>

            <Input
              placeholder="Name"
              onChangeText={name => this.setState({name})}
              value={this.state.name}
            />

            <Input
              placeholder="Phone No"
              onChangeText={phone => this.setState({phone})}
              value={this.state.phone}
            />

            <Input
              placeholder="City"
              onChangeText={city => this.setState({city})}
              value={this.state.city}
            />

            <Input
              placeholder="Address"
              onChangeText={address => this.setState({address})}
              value={this.state.address}
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#ffffff',
                height: 30,
                width: 80,
                borderRadius: 10,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                marginLeft: 110,
                marginTop: 20,
              }}
              onPress={this.handleTutor.bind(this)}>
              <Text
                style={{
                  color: '#7a7aff',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 20,
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
          {/*<View style={{}}>
            <Button
              title="submit"
              style={styles.btn}
              onPress={this.handleTutor.bind(this)}
            />
            </View>}*/}
        </View>
      </ScrollView>
    );
  }
}

TutorScreen.navigationOptions = {
  headerTitle: 'Detail of Tutor',
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7a7aff',
    flex: 1,
    width: '100%',
    height: 700,
    alignItems: 'center',
    justifyContent: 'center',
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
