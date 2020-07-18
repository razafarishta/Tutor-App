/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, FlatList, Alert} from 'react-native';
import {SearchBar} from 'react-native-elements';
import firebase from 'react-native-firebase';
//import FinalDetailScreen from '../screens/FinalDetailScreen'
import IconIcon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
var arrayholder = [];
var data_array = [];
class FinalScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: true,
      //data_array: [],
      //searchValue: '',
    };
  }
  componentDidMount() {
    this.takeData();
  }

  takeData() {
    // var data_array = [];

    var uid = firebase.auth().currentUser.uid;
    var db = firebase
      .database()
      .ref(`tutors/`)
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
    firebaseAuth.signOut().then(() => this.props.navigation.navigate('SignIn'));
  };

  onCardPressed(item) {
    this.props.navigation.push('FinalDetail', {itemData: item});
    console.log(item);
  }
  //onPressButton = () => {
  //firebaseAuth.signOut().then(() => this.props.navigation.navigate('SignIn'));
  //};
  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Search your Tutor"
        lightTheme
        placeholderTextColor="#7a7aff"
        //                  inputStyle={{backgroundColor:'#FFFFFF'}}
        //                    buttonStyle={{backgroundColor:'#FFFFFF'}}
        //               leftIconContainerStyle={{color:'#FFFFFF'}}
        searchIcon={{color: '#7a7aff'}}
        inputContainerStyle={{backgroundColor: 'white'}}
        containerStyle={{
          backgroundColor: '#FFFFFF',
          borderWidth: 1,
          borderRadius: 2,
          height: 70,
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
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{width: '100%'}}>
          <View style>{this.renderHeader}</View>

          <FlatList
            style={{margin: 10}}
            data={this.state.data}
            extraData={this.state}
            ListHeaderComponent={this.renderHeader}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.onCardPressed(item);
                  }}>
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
      </View>
    );
  }
}
FinalScreen.navigationOptions = navData => {
  return {
    headerTitle: 'TUTOR',
    headerTintColor: 'white',
    headerRight: (
      <TouchableOpacity
        onPress={() =>
          Alert.alert('Logout Alert', 'Do you really want to Logout...', [
            {
              text: 'NO',
              onPress: () => console.warn('NO Pressed'),
              style: 'cancel',
            },
            {
              text: 'YES',
              onPress: () =>
                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    navData.navigation.navigate('SignIn');
                  }),
            },
          ])
        }>
        <AntDesign
          name="logout"
          style={{color: '#FFFFFF', marginRight: 10}}
          size={25}
          onPress={this.onPressButton}
        />
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: '#7a7aff',
    },
  };
};
export default FinalScreen;
