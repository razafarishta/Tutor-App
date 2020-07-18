import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  Linking,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firebase from 'react-native-firebase';

const data_array = [];
class FinalDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.state.params.itemData,
      data: [],
      loading: true,
    };
  }

  onMapPressed(latitude, longitude) {
    this.props.navigation.navigate('Maps', {
      latitude: this.state.item.tutor_info.latitude,
      longitude: this.state.item.tutor_info.longitude,
    });
    // console.log('map')
  }
  onCallPressed() {
    var phoneNo;
    if (Platform.OS !== 'android') {
      phoneNo = `telprompt:${this.state.item.tutor_info.phone}`;
    } else {
      phoneNo = `tel:${this.state.item.tutor_info.phone}`;
    }
    Linking.canOpenURL(phoneNo)
      .then(supported => {
        if (!supported) {
          Alert.alert('phone number not available');
        } else {
          Linking.openURL(phoneNo);
        }
      })
      .catch(err => console.log(err));
  }

  takedata() {
    var uid = firebase.auth().currentUser.email;
    //  console.log(uid)
    var db = firebase
      .database()
      .ref('users/')
      .on('value', snapshot => {
        snapshot.forEach(data => {
          //  console.log(uid)
          if (data.val().email !== uid) data_array.push(data.val());
          console.log('data', data_array);
        });
        this.setState({data: data_array}, () => {
          this.setState({loading: false});
        });
      });
    const data_array = [];
  }

  componentDidMount() {
    //var FCM = firebase.messaging();
    var usid = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref(`users/` + usid + '/');
    // FCM.getToken().then(token =>{
    // ref.update({pushToken: token});
    //})
    this.takedata();
  }

  onTutorChat(item) {
    this.props.navigation.navigate('Chat', {itemData: item});
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.nameView}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{padding: 10}}>
                <Text style={{fontSize: 20}}>Tutor Name:</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={{fontSize: 20, color: '#7a7aff'}}>
                  {this.state.item.tutor_info.name}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.nameView}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{padding: 10}}>
                <Text style={{fontSize: 20}}>city : </Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={{fontSize: 20, color: '#7a7aff'}}>
                  {this.state.item.tutor_info.city}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.nameView}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{padding: 10}}>
                <Text style={{fontSize: 20}}>Address:</Text>
              </View>
              <View style={{flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
                <Text style={{fontSize: 20, color: '#7a7aff'}}>
                  {this.state.item.tutor_info.address}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              this.onCallPressed();
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              marginLeft: 160,
              borderWidth: 2,
              borderRadius: 40,
              backgroundColor: 'green',
              height: 50,
              width: 50,
            }}>
            <Icon name="md-call" size={40} color="#7a7aff" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTutorChat(item)}
            style={{
              height: 50,
              width: 50,
              backgroundColor: 'orange',
              marginLeft: 160,
              flexDirection: 'row',
              bottom: 47,
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              left: 60,
              borderWidth: 2,
              borderRadius: 40,
            }}>
            <AntDesign name="message1" size={40} color="#7a7aff" />
          </TouchableOpacity>

          <View>
            <TouchableOpacity
              style={{
                color: 'blue',
                marginBottom: 50,
                alignItems: 'center',
                borderWidth: 1.5,
                marginVertical: 15,
                width: 220,
                marginLeft: 100,
              }}>
              <Text
                style={{
                  color: '#7a7aff',
                  fontWeight: 'bold',
                  fontSize: 20,
                  marginVertical: 20,
                }}>
                Send a Request
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                this.onMapPressed();
              }}>
              <FontAwesome name="map-marker" size={40} color="black" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
FinalDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Tutor Info',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#7a7aff',
    },
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#7a7aff',
  },
  nameView: {
    width: '100%',
    height: 60,
    borderColor: '#7a7aff',
    borderWidth: 0.1,
    justifyContent: 'center',
  },
  textView: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#29cf23',
  },
});
export default FinalDetailScreen;
