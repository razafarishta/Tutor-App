import React, {Component} from 'react';
import {View, SafeAreaView} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'

class MapScreen extends Component{
  constructor(props){
    super(props)
    this.state={
      latitude:0,
      longitude:0,
      coordinate :[]
    }

  }
  componentDidMount(){
    Geolocation.getCurrentPosition(info => {
      this.setState({latitude:info.coords.latitude,longitude:info.coords.longitude, coordinate:this.state.coordinate.concat({
        latitude:info.coords.latitude,
        longitude:info.coords.longitude
      })},()=>{
          this.setState({loading:false})
      })
  });
  }

  animate(){
    let r = {
        latitude: 42.5,
        longitude: 15.2,
        latitudeDelta: 7.5,
        longitudeDelta: 7.5,
    };
    this.mapView.root.animateToRegion(r, 1000);
}
  render(){
    return(
      
        <MapView
        provider={PROVIDER_GOOGLE}
        ref = {(ref)=>this.mapView=ref}
          style={{flex:1}}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421, 

          }}
          onPress={()=> this.anim}
        >
          
              <Marker
        coordinate={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
        }}>
    </Marker>
        </MapView>
      
    )
  }
}
export default MapScreen;