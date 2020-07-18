import React, {Component} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';

import firebase from 'react-native-firebase';
var data_array = [];
class TutorDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: true,
    };
  }
  componentDidMount() {
    this.takeData();
  }

  takeData() {
    // var data_array = [];

    var userId = firebase.auth().currentUser.uid;
    var db = firebase
      .database()
      .ref(`tutors/` + userId)
      .on('value', snapshot => {
        snapshot.forEach(data => {
          data_array.push(data.val());

          console.log('data', data_array);
        });
        this.setState({data: data_array}, () => {
          this.setState({loading: false});
          console.log('statenew', this.state.data);
        });
        this.arrayholder = data_array;
        data_array = [];
      });
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          style={{margin: 10}}
          data={this.state.data}
          extraData={this.state}
          renderItem={({item, index}) => {
            console.log(item);
            return (
              <TouchableOpacity>
                <View
                  style={{
                    borderBottomWidth: 5,
                    borderRadius: 10,
                    height: 400,
                    width: '100%',
                    backgroundColor: '#7a7aff',
                    borderColor: 'black',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      marginRight: 20,
                      marginLeft: 20,
                      marginBottom: 170,
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        paddingTop: 10,
                      }}>
                      Your Name:
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        paddingTop: 10,
                      }}>
                      Your Phone No:
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        paddingTop: 10,
                      }}>
                      City:
                    </Text>
                  </View>
                  <View style={{paddingBottom: 32, marginRight: 40}}>
                    <Text style={{fontSize: 20, marginVertical: 5}}>
                      {item.name}
                    </Text>
                    <Text style={{fontSize: 20, marginVertical: 5}}>
                      {item.phone}
                    </Text>
                    <Text style={{fontSize: 20, marginVertical: 5}}>
                      {item.city}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

TutorDetail.navigationOptions = navData => {
  return {
    headerTitle: 'Your Details',
    headerTintColor: '#7a7aff',
    headerStyle: {
      backgroundColor: '#ffffff',
      //fontWeight:'bold'
    },
  };
};
export default TutorDetail;
