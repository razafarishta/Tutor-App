/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {firebaseAuth} from '../enviorment/config';
import * as firebase from 'firebase';
//import FinalDetailScreen from '../screens/FinalDetailScreen'
import IconIcon from 'react-native-vector-icons/Ionicons';
var arrayholder = [];
var data_array = [];
class FinalScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: true,
      //data_array: [],
      searchValue: '',
    };
  }
  componentDidMount() {
    this.takeData();
  }

  takeData() {
    // var data_array = [];

    var uid = firebaseAuth.currentUser.uid;
    var db = firebase
      .database()
      .ref('tutors/')
      .on('value', snapshot => {
        snapshot.forEach(data => {
         
            data_array.push(data.val());
          

          console.log('data', data_array);
        });
        this.setState({data: data_array}, () => {
          this.setState({loading: false});
        });
        this.arrayholder = data_array;
        data_array = [];
      });
    }

      onPressButton = () => {
        firebaseAuth
          .signOut()
          .then(() => this.props.navigation.navigate('SignIn'))
          .catch(error => this.setState({errorMessage: error.message}))
      }
  
  onCardPressed(item){
    this.props.navigation.push('FinalDetail', {itemData:item})
    console.log(item)
  }
  //onPressButton = () => {
  //firebaseAuth.signOut().then(() => this.props.navigation.navigate('SignIn'));
  //};
  /*renderHeader = () => {
    return (
      <SearchBar
        placeholder="Search your course"
        lightTheme
        placeholderTextColor="#15b50c"
        //                  inputStyle={{backgroundColor:'#FFFFFF'}}
        //                    buttonStyle={{backgroundColor:'#FFFFFF'}}
        //               leftIconContainerStyle={{color:'#FFFFFF'}}
        searchIcon={{color: '#15b50c'}}
        inputContainerStyle={{backgroundColor: 'white'}}
        containerStyle={{
          backgroundColor: '#FFFFFF',
          borderWidth: 0,
          borderRadius: 0,
        }}
        style={{backgroundColor: 'white'}}
        round
        value={this.state.searchValue}
        onChangeText={text => {
          this.setState({searchValue: text});
          this.searchFilterFunction(text);
        }}
        autoCorrect={false}
      />
    );
  };
  searchFilterFunction = text => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.tutor_info.phone.toUpperCase()}
      ${item.tutor_info.city.toUpperCase()} ${item.tutor_info.name.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    this.setState({data: newData});
  };*/

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{width: '100%'}}>
          {/*<View style>{this.renderHeader}</View>*/}

          <FlatList
            style={{margin: 10}}
            data={this.state.data}
            extraData={this.state}
            //ListHeaderComponent={this.renderHeader}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={()=>{this.onCardPressed(item)}}>
                  <View
                    style={{
                      borderBottomWidth: 5,
                      borderRadius: 10,
                      height: 100,
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
                        height: 30,
                        width: 80,
                        alignItems: 'center',
                        justifyContent: 'center',
                        // flex:1
                      }}>
                      <IconIcon name="ios-book" size={100} color="#FFFFFF" />
                    </View>
                    <View style={{alignItems: 'center', padding: 20}}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: '#FFFFFF',
                        }}>
                        {item.tutor_info.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: '#FFFFFF',
                        }}>
                        {item.tutor_info.phone}
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          color: '#FFFFFF',
                          fontWeight: '600',
                        }}>
                        {item.tutor_info.city}
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
        <TouchableOpacity style={{marginTop: 32}} onPress={this.onPressButton}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default FinalScreen;
