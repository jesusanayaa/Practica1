import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {NavigationContext} from '@react-navigation/native';
import {Input, Icon, Button} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Login extends Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    };
  }

  render() {
    const navigation = this.context;
    const Registrar = () => {
      navigation.navigate('Registro');
    };
    const Entrar = () => {
      let _this = this;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          // Typical action to be performed when the document is ready:
          console.log(xhttp.responseText);
          if (xhttp.responseText == '1') {
            //usuario reconocido
            navigation.navigate('Inicio');
            console.log('Usuario autentificado');
            //guardar datos
            const jsonValue = JSON.stringify([_this.state.login]);
            console.log("entrada" + jsonValue);
            AsyncStorage.setItem('DatosU', jsonValue);
          }
          if (xhttp.responseText == '2') {
            Alert.alert('Error!!', 'Password Erroneo intente de nuevo', [
              {text: 'OK', onPress: () => console.log('pass error')},
            ]);
          }
          if (xhttp.responseText == '0') {
            Alert.alert('Error!!', 'Usuario no reconocido', [
              {text: 'OK', onPress: () => console.log('user error')},
            ]);
          }
        }
      };
      xhttp.open(
        'GET',
        'https://chups.000webhostapp.com/Login.php?codigo=' +
          this.state.login +
          '&password=' +
          this.state.password,
        true,
      );
      xhttp.send();
    };

    return (
      <KeyboardAwareScrollView>
        <View>
          <ImageBackground
            source={require('./Imagenes/fondoLogin.jpg')}
            style={styles.fondo}>
            <View style={styles.fondoLogo}>
              <Image
                style={styles.logo}
                source={require('./Imagenes/logocucei.png')}
              />
            </View>
            <Text
              style={{
                height: 30,
                width: 137,
                marginTop: -130,
                marginLeft: 135,
                fontSize: 20,
                color: 'black',
                opacity: 0.9,
                fontFamily: '',
                backgroundColor: 'orange',
                borderRadius: 5,
              }}>
              Login Carrera
            </Text>
            <View style={styles.contenedor}>
              <Input
                placeholder="Código"
                placeholderTextColor="black"
                keyboardType="numeric"
                leftIcon={<Icon name="person" size={24} color="orange" />}
                onChangeText={login => this.setState({login})}></Input>
              <Input
                placeholder="Contraseña"
                placeholderTextColor="black"
                secureTextEntry={true}
                leftIcon={<Icon name="lock" size={24} color="orange" />}
                onChangeText={password => this.setState({password})}></Input>
            </View>
            <View style={styles.btnEntrar}>
              <TouchableOpacity onPress={Entrar}>
                <Text style={styles.btnText}>Entrar</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnRegistrarse}>
              <TouchableOpacity onPress={Registrar}>
                <Text style={styles.btnText}>Registrar</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  fondo: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  contenedor: {
    backgroundColor: 'white',
    marginTop: 140,
    marginLeft: 20,
    width: 370,
    height: 140,
    justifyContent: 'space-around',
    borderRadius: 10,
    opacity: 0.9,
  },
  btnEntrar: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: 'orange',
    width: 110,
    height: 50,
    marginTop: 20,
    marginLeft: 80,
  },
  btnRegistrarse: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: 'orange',
    width: 110,
    height: 50,
    marginTop: -49,
    marginLeft: 220,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  logo: {
    resizeMode: 'contain',
    height: 100,
    width: 200,
  },
  fondoLogo: {
    height: 100,
    width: 200,
    marginTop: 390,
    marginLeft: 100,
    opacity: 0.9,
    backgroundColor: 'orange',
    borderRadius: 20,
  },
});
