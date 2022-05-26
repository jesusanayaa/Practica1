import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import {NavigationContext} from '@react-navigation/native';
import MenuDrawer from 'react-native-side-drawer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button, Avatar} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ranking from './Ranking';

export default class Inicio extends Component {
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      nombre: '',
      codigo: '',
      centro: '',
      nc1: '',
      foto: '',
      persona: [],
    };
  }

  toggleOpen = () => {
    this.setState({open: !this.state.open});
  };

  CargaD = async () => {
    let _this = this;
    const value = await AsyncStorage.getItem('DatosU');
    var jsonValue = JSON.parse(value);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        console.log(xhttp.responseText);
        var d = xhttp.responseText;
        var dataU = d.split(',');
        _this.setState({nombre: dataU[0]});
        _this.setState({codigo: dataU[1]});
        _this.setState({centro: dataU[2]});
        _this.setState({nc1: dataU[3]});
        _this.setState({foto: dataU[4]});
      }
    };
    xhttp.open(
      'GET',
      'https://chups.000webhostapp.com/Contar_Corredor.php?codigo=' +
        jsonValue[0],
      true,
    );
    xhttp.send();
  };

  componentDidMount() {
    this.CargaD();
  }


  drawerContent = () => {
    const navigation = this.context;
    const Mapas = () => {
      navigation.navigate('Mapa');
    };
    
    return (
      <View>
        <View style={styles.iMenu}>
          <Avatar
            size={94}
            rounded
            source={{uri: this.state.foto}}
            title="Bj"
            containerStyle={{backgroundColor: 'red'}}>
            <Avatar.Accessory size={23} />
          </Avatar>
        </View>
        <Text style={styles.tmenu}>{this.state.nombre}</Text>
        <Text style={styles.tmenu}>{this.state.codigo}</Text>
        <Text style={styles.tmenu}>{this.state.centro}</Text>
        <View style={styles.boton}>
          <Button title="Mapa" onPress={Mapas}></Button>
        </View>
        <View style={styles.boton}>
          <Button title="Cerrar" onPress={this.toggleOpen}></Button>
        </View>
      </View>
    );
  };

  render() {
    const navigation = this.context;
    const Rank = () => {
      navigation.navigate('Ranking');
    };
    return (
      <View style={styles.container}>
        <MenuDrawer
          open={this.state.open}
          position={'left'}
          drawerContent={this.drawerContent()}
          drawerPercentage={45}
          animationTime={250}
          overlay={true}
          opacity={0.4}>
          <View style={styles.menu}>
            <Button title={'Perfil'} onPress={this.toggleOpen}></Button>
          </View>
          <View style={styles.ranking}>
            <Button title={'Ranking'} onPress={Rank}></Button>
          </View>
          <Text style={styles.nuC}>Numero de corredores: {this.state.nc1}</Text>
        </MenuDrawer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ranking: {
    marginTop: -50,
    marginLeft: 320,
    width: 90,
    height: 50,
  },
  fondo: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  nuC: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  menu: {
    width: 80,
    height: 50,
  },
  iMenu: {
    color: 'black',
    fontSize: 25,
    marginTop: 15,
  },
  tmenu: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#0A294F',
    zIndex: 0,
  },
  animatedBox: {
    flex: 1,
    backgroundColor: '#0A294F',
    padding: 10,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A294F',
  },
  boton: {
    marginTop: 5,
    width: 90,
    height: 50,
    size: 50,
  },
});
