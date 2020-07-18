import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Picker,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import firebase from 'react-native-firebase';

import Input from '../components/Input';

class StudentScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      phone: '',
      city: '',
      uid: '',
      board: '',
      classs: '',
      data: [],
    };
  }
  handleStudent() {
    const {currentUser} = firebase.auth();
    firebase
      .database()
      .ref(`student/${currentUser.uid}/student_info`)
      .set({
        name: this.state.name,
        phone: this.state.phone,
        city: this.state.city,
        board: this.state.board,
        classs: this.state.classs,
      })
      .then(data => {
        this.props.navigation.navigate('StudentDetail');
      })
      .catch(error => console.log(error));
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.textView}>Student Profile</Text>
          </View>

          <Input
            placeholder="STUDENT NAME"
            onChangeText={name => this.setState({name})}
            value={this.state.name}
          />

          <Input
            placeholder="YOUR PHONE #"
            onChangeText={phone => this.setState({phone})}
            value={this.state.phone}
          />

          <Input
            placeholder="YOUR class"
            onChangeText={classs => this.setState({classs})}
            value={this.state.class}
          />

          <View style={{flexDirection: 'row', width: '100%', flex: 1}}>
            <View style={{flex: 1, padding: 20}}>
              <Text
                style={{
                  fontSize: 20,
                  justifyContent: 'center',
                  color: 'white',
                }}>
                Board
              </Text>
              <Picker
                selectedValue={this.state.board}
                style={{
                  height: 60,
                  width: 150,
                  borderColor: 'red',
                  color: 'white',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({board: itemValue})
                }>
                <Picker.Item label="Sindh" value="Sindh" />
                <Picker.Item label="AKUEB" value="AKUEB" />
                <Picker.Item label="Federal" value="Federal" />
                <Picker.Item label="Cambridge" value="Cambridge" />
              </Picker>

              <Text
                style={{
                  fontSize: 20,
                  alignContent: 'center',
                  color: 'white',
                  Bottom: 10,
                }}>
                City
              </Text>
              <Picker
                selectedValue={this.state.city}
                style={{
                  height: 60,
                  width: 150,
                  borderColor: '#15b50c',
                  color: 'white',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({city: itemValue})
                }>
                <Picker.Item label="karachi" value="Karachi" />
                <Picker.Item label="lahore" value="Lahore" />
                <Picker.Item label="Islamabad" value="Islamabad" />
                <Picker.Item label="Quetta" value="Quetta" />
              </Picker>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#ffffff',
              height: 30,
              width: 80,
              borderRadius: 10,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginBottom: 50,
            }}
            onPress={this.handleStudent.bind(this)}>
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
          {/*
        <View style={{}}>
          <Button
            title="submit"
            //style={styles.btn}
            onPress={this.handleStudent.bind(this)}
          />
</View>*/}
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7a7aff',
    //height:'100%',
    height: 550,
    width: '100%',
  },
  inputView: {
    borderRadius: 1,
  },
  textView: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
export default StudentScreen;
