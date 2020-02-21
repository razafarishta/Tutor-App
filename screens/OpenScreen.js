import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
//import DrawerIcon from '../components/DrawerIcon';
//import {HeaderButtons, Item} from 'react-navigation-header-buttons';
//import Feather from 'react-native-vector-icons/Feather';
//import HeaderButton from '../components/HeaderButton';

const OpenScreen = ({navigation}) => {
  return (
    <View style={styles.containerStyle}>
      <Text
        style={styles.signText}
        onPress={() => navigation.navigate('SignIn')}>
        if u haven't signup press here
      </Text>
    </View>
  );
};
/*
OpenScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Food Resturant',
    headerLeft: (
      <Feather
        name="menu"
        size={25}
        onPress={() => {
          navData.navigation.toggleDrawer();
        }}
      />
    ),
  };
};
*/
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    //  backgroundColor:'orange'
  },

  textStyle: {
    alignSelf: 'center',
    color: '#FF6200',
    fontSize: 16,
    fontWeight: '700',
    paddingTop: 10,
    paddingBottom: 10,
  },

  ButtonStyle: {
    //flex: 1,
    alignSelf: 'stretch',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 400,
    borderRadius: 100,
    backgroundColor: '#FFFC00',
  },

  header: {
    paddingTop: Platform.OS == 'android' ? 25 : 0,
    backgroundColor: 'blue',
  },
  Drawer: {
    fontSize: 35,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
  },
  signText: {
    marginLeft: 50,
    alignItems: 'center',
    fontSize: 25,
    top: 180,
    color: '#FF0000',
  },
  Inline: {
    marginRight: 30,
  },
});
export default OpenScreen;
