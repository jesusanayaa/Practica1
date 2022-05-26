import React, {Component} from 'react';
import {View, Text, Button, DevSettings} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
MapboxGL.setAccessToken(
  'sk.eyJ1IjoiamVzdWFuYXlhIiwiYSI6ImNsMnBvenlraTAybWYzam1qeXVseGI0am8ifQ.i5RiCI1ccb_pQofAdl6Tsg',
);
import {PermissionsAndroid} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContext} from '@react-navigation/native';

export default class Mapa extends Component {
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    this.state = {
      kilometros: 0,
      codigo: 0,
    };
  }

  onLocationUpdate = (e: any) => {
    //  this.onLocationUpdate(e);

    this.setState(
      {
        coordinates: [e.coords.longitude, e.coords.latitude],
      },
      () => {
        console.log(this.state.coordinates);
      },
    );
  };

  componentDidMount = async () => {
    const value = await AsyncStorage.getItem('DatosU');
    var jsonValue = JSON.parse(value);
    console.log(jsonValue);
    var xhttp = new XMLHttpRequest();
    let _this = this;
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        _this.setState({kilometros: xhttp.responseText});
        console.log(_this.state.kilometros);
      }
    };
    xhttp.open(
      'GET',
      'https://chups.000webhostapp.com/Avance.php?codigo=' +jsonValue[0],
      true,
    );
    xhttp.send();
  }

  render() {
    const navigation = this.context;
    const Permisos = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'PERMISO LOCALIZACION',
            message: 'PERIMISO LOCALIZACON ' + 'POSICION EN EL MAPA',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('Camera permission denied');
        }
      } catch {}
      DevSettings.reload();
    };

    return (
      <View style={{flex: 1, height: '100%', width: '100%', backgroundColor:'gray'}}>
        <Text style={{fontSize: 40, color: 'red', textAlign: 'center',marginBottom:20}}>
          Mi avance
        </Text>
        <View style={{marginLeft: 200, width:120, height:100}}>
          <AnimatedCircularProgress
            arcSweepAngle={180}
            rotation={-90}
            size={120}
            width={15}
            fill={this.state.kilometros}
            tintColor="#00e0ff"
            backgroundColor="#3d5875">
            {fill => <Text style={{color:"white"}}>{this.state.kilometros/10}  / 10 km</Text>}
          </AnimatedCircularProgress>
        </View>
        <View style={{marginTop: -100, marginLeft:50}}>
        <AnimatedCircularProgress
            arcSweepAngle={180}
            rotation={-90}
            size={120}
            width={15}
            fill={50}
            tintColor="#00e0ff"
            backgroundColor="#3d5875">
            {fill => <Text style={{color:"white"}}>3 dias / 5 dias</Text>}
          </AnimatedCircularProgress>
        </View>
        <MapboxGL.MapView
          styleURL={MapboxGL.StyleURL.Street}
          zoomLevel={16}
          centerCoordinate={[20.66611, -103.35607]}
          style={{flex: 1}}>
          <MapboxGL.UserLocation
            visible={true}
            onUpdate={this.onLocationUpdate}></MapboxGL.UserLocation>
          <MapboxGL.Camera
            zoomLevel={16}
            centerCoordinate={[3.33624, 6.57901]}
            animationMode={'flyTo'}
            animationDuration={0}
            followUserLocation={true}></MapboxGL.Camera>
        </MapboxGL.MapView>
        <Button title="Permisos" onPress={Permisos}></Button>
      </View>
    );
  }
}
