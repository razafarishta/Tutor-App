import React, {Component} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {ChatInput} from '../components/ChatInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';
var msg_array = [];
class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.navigation.state.params.itemData,
      text: '',
      Reciever: '',
      sender: '',
      time: '',
      messages: [],
      loading: false,
      name: '',
      users: '',
      accepted: '',
    };
  }
  componentDidMount() {
    this.getMessage();
    console.log('item', this.state.item);
  }

  conversationId = (a, b) => {
    if (a > b) {
      return a + '-' + b;
    } else {
      return b + '-' + a;
    }
  };

  takeData() {
    var users_data = '';
    firebase
      .database()
      .ref('users/')
      .on('value', snapshot => {
        snapshot.forEach(data => {
          const uid = firebase.auth().currentUser.uid;
          if (data.val().userid === uid) {
            users_data = data.val().name;
          }
          console.log('Name', users_data);
        });
        this.setState({users: users_data}, () => {
          this.setState({loading: false});
        });
      });
    users_data = '';
  }
  onSend() {
    var uid = firebase.auth().currentUser.uid;
    var secuser = this.state.item.userid;
    console.log(uid);
    var today = new Date();
    var time = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    var hour = time.getHours();
    var minutes = time.getMinutes();
    var ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12;
    if (minutes.toString().length == 1) {
      minutes = '0' + minutes;
    }
    if (hour.toString().length == 1) {
      hour = '0' + hour;
    }

    time = hour + ':' + minutes + ' ' + ampm;

    var dbref = firebase.database().ref('messages/');
    var key = dbref.push().key;
    var convId = this.conversationId(uid, secuser);

    if (this.state.text !== '') {
      firebase
        .database()
        .ref('messages/' + convId)
        .child(key)
        .set({
          text: this.state.text,
          Reciever: secuser,
          senderuid: uid,
          timestamp: firebase.database.ServerValue.TIMESTAMP,
          time: time,
        });
      firebase
        .database()
        .ref(`messages/${convId}/lastMessage`)
        .set({
          lastMessage: this.state.text,
          Reciever: secuser,
          senderuid: uid,
          timestamp: firebase.database.ServerValue.TIMESTAMP,
          time: time,
          name: this.state.users,
          accepted: 'pending',
        });
    }
  }
  getMessage() {
    var uid = firebaseAuth.currentUser.uid;
    var recieverId = this.state.item.userid;
    var currId = this.conversationId(uid, recieverId);
    console.log(currId);

    firebase
      .database()
      .ref(`messages/${currId}`)
      .on('value', snapshot => {
        snapshot.forEach(messages => {
          msg_array.push(messages.val());
          //console.log("messages",msg_array)
        });
        this.setState({messages: msg_array}, () => {
          this.state.messages.reverse();
          this.setState({loading: false});
        });
        msg_array = [];
      });
  }

  renderchtBox(item) {
    var uid = firebase.auth().currentUser.uid;
    if (uid === item.senderuid) {
      return (
        <View
          style={{
            transform: [{scaleY: -1}],
            width: width / 2,
            borderColor: '#29cf23',
            borderWidth: 1,
            alignItems: 'flex-start',
            alignSelf: 'flex-end',
            borderColor: '#29cf23',
            padding: 10,
            marginTop: 10,
            borderRadius: 10,
            backgroundColor: '#29cf23',
          }}>
          <Text>{item.text}</Text>
          <Text>{item.time}</Text>
        </View>
      );
    }
    if (uid !== item.senderuid) {
      return (
        <View
          style={{
            transform: [{scaleY: -1}],
            borderColor: 'green',
            borderWidth: 1,
            alignItems: 'flex-start',
            alignSelf: 'flex-start',
            backgroundColor: 'green',
            padding: 10,
            marginTop: 10,
            borderRadius: 10,
          }}>
          <Text style={{color: 'white', fontSize: 16}}>{item.text}</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <ChatInput placeholder={'write message'} />
          <TouchableOpacity
            onPress={() => this.onSend()}
            style={{justifyContent: 'center', marginLeft: 5}}>
            <Ionicons name="md-send" size={25} color="#7a7aff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
export default ChatScreen;
