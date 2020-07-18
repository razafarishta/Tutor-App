import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import firebase from 'react-native-firebase';
import ProfileImage from '../components/ProfileImage';
var data_array = [];
class StudentDetailScreen extends Component {
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
      .ref(`student/` + userId)
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
      /*
      <View style={{flex: 1}}>
        <View style={{width: '100%'}}>
          {/*  <View style>{this.renderHeader}</View>

          <FlatList
            style={{margin: 10}}
            data={this.state.data}
            extraData={this.state}
            // ListHeaderComponent={this.renderHeader}
            renderItem={({item, index}) => {
              console.log(item);
              return (
                <TouchableOpacity>
                  <View
                    style={{
                      borderBottomWidth: 5,
                      borderRadius: 10,
                      height: 300,
                      width: '100%',
                      backgroundColor: '#7a7aff',
                      borderColor: 'black',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        marginLeft: 20,
                        marginRight: 20,
                      //  height: 30,
                        //width: 80,
                        alignItems: 'center',
                        justifyContent: 'center',
                        // flex:1
                      }}>
                     <ProfileImage />
                    </View>
                    <Text style={{fontSize:25, paddingBottom:47}}>Name:</Text>
                   
                    <View style={{alignItems: 'center', padding: 10}}>
                      
                      <Text
                        style={{
                          fontSize: 25,
                          fontWeight: 'bold',
                          color: '#FFFFFF',
                        }}>
                      {item.name}
                      </Text>
                      <View>
                      <Text style={{fontSize:25, paddingRight:70}}>Phone No:</Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: '#FFFFFF',
                        }}>
                        {item.phone}
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          color: '#FFFFFF',
                          fontWeight: '600',
                        }}>
                        {item.city}
                      </Text>
                    </View>
                  </View>
                      </TouchableOpacity>

                      
              );
            }}
            keyExtractor={(item, index) => {
              index.toString();
            }}
          />
        </View>
          </View>*/
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
                    <ProfileImage />
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
StudentDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Detail',
    headerTintColor: '#7a7aff',
    headerRight: (
      <TouchableOpacity onPress={() => navData.navigation.navigate('Final')}>
        <Text style={{marginLeft: 60, paddingTop: 22}}>Go for Best TUTOR</Text>
        <Entypo
          name="chevron-small-right"
          size={40}
          style={{color: '#7a7aff', paddingLeft: 50, paddingBottom: 10}}
        />
      </TouchableOpacity>
    ),
  };
};
export default StudentDetailScreen;
