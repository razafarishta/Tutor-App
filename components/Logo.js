import React from 'react';
import {StyleSheet, Image} from 'react-native';
import lecture from '../assets/lecture.png';

const Logo = () => {
  return (
    
      <Image style={styles.ImageView} source={lecture} />
   
    
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
    marginBottom:80,
    //backgroundColor:'red'
  },
});

export default Logo;
