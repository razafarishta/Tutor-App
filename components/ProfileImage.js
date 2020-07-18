import React, {Component} from 'react';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import uuid from 'uuid/v4';

export default class ProfileImage extends Component {
  state = {
    profile: null,
    imageUri: null,
    url: '',
  };

  openImage() {
    const options = {
      title: 'Select Avatar',
      customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        //console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        //console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.path};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          profile: source,
          imageUri: response.path,
        });
      }
    });
  }
  uploadImage = () => {
    const ext = this.state.imageUri.split('.').pop(); // Extract image extension
    const filename = `${uuid()}.${ext}`; // Generate unique name
    //this.setState({ uploading: true });
    console.log(filename);
    var metadata = {
      contentType: 'image/jpeg',
    };
    var fileRef = firebase
      .storage()
      .ref(`images/`)
      .child(filename);
    fileRef
      .put(this.state.imageUri, metadata)
      .then(() => {
        fileRef.getDownloadURL();
      })
      .then(downloadUrl => {
        this.setState({url: downloadUrl});
      })
      .then(() => {
        firebase
          .database()
          .ref(`users/`)
          .set({
            url: this.state.url,
          });
      })

      .catch(error => {
        console.log('Error uploading image: ', error);
      });
  };

  render() {
    return (
      <View>
        <Image
          source={this.state.profile}
          style={{
            width: 200,
            height: 100,
            borderRadius: 10,
            backgroundColor: 'red',
          }}
        />
        <TouchableOpacity onPress={() => this.openImage()}>
          <Text>Select Image</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.uploadImage()}>
          <Text>uploadImage</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
