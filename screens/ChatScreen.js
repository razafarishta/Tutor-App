import React, {Component} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {ChatInput} from '../components/ChatInput';
import Ionicons from 'react-native-vector-icons/Ionicons';

class ChatScreen extends Component {
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
