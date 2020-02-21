import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  Linking,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class FinalDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.navigation.state.params.itemData,
    };
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
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.nameView}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{padding: 10}}>
                <Text style={{fontSize:20}}>Tutor Name:</Text>
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
                <Text style={{fontSize:20}}>city : </Text>
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
                <Text style={{fontSize:20}}>Address:</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={{fontSize: 20, color: '#7a7aff'}}>
                  {this.state.item.tutor_info.address}
                </Text>
              </View>
            </View>
          </View>

          <View style={{width:'100%',height:60,borderColor:'black',borderWidth:0.5,justifyContent:'center'}}>
                        <View style={{flexDirection:'row',justifyContent:'center'}}>
                        <View style={{padding:20, backgroundColor:'', borderRadius:60}}>  
                        <TouchableOpacity onPress={()=>{this.onCallPressed()}}>
                            <Icon name="md-call" size={40} color="#7a7aff"/>
                        </TouchableOpacity>
                        </View>
                        </View>
                    </View>
        </ScrollView>
      </View>
    );
  }
}
FinalDetailScreen.navigationOptions=(navData)=>{
    return{
        headerTitle:'Tutor Info',
        headerTintColor: 'white',
        headerStyle:{
            backgroundColor:"#7a7aff"
        }
    }
}
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
