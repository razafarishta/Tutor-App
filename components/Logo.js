import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import lecture from '../assets/lecture.png';

const Logo = () => {
  return (
    <View style={styles.container}>
      <View style={{marginTop: 5}}>
      <Image style={styles.ImageView} source={lecture} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  TextView: {
    marginVertical: 15,
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 40,
    
  },
  ImageView: {
    height: 150,
    width: 150,
  },
});

export default Logo;
