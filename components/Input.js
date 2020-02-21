import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  secureTextEntry,
  name,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        style={styles.inputStyle}
        placeholderTextColor="#7a7aff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //width:100,
    //height:500,
    //flexGrow: 1,
    marginTop: 35,
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
    marginRight:300,
    

    //paddingBottom:10
  },
  inputStyle: {
    backgroundColor: 'white',
    width: 270,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    textAlign: 'center',
    color: '#7a7aff',
    margin:-20
    //marginBottom: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    //color:'#7a7aff'
  },
  button: {
    width: 300,
    backgroundColor: 'grey',
    borderRadius: 25,
    marginVertical: 7,
    paddingVertical: 13,
    //  height: 30,
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    marginRight: 300,
    fontWeight: 'bold',
    color:'white'
    //flex: 1,
  },
  LabelView: {
    //height:50,
    width: 50,
    fontFamily: 'bold',
    lineHeight: 45,
    marginLeft: 25,
  },
});
export default Input;
