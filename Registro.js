import React, {Component, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import {NavigationContext} from '@react-navigation/native';
import {Input, Icon, Button} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default class Registro extends Component {
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      codigo: '',
      correo: '',
      telefono: '',
      password: '',
      centro: '',
      semestre: '',
    }
  }
  
  render() {
    const navigation = this.context;
    
    const regresarALogin = () => {
      navigation.navigate('Login');
    };

    const Enviar = () => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          // Typical action to be performed when the document is ready:
          console.log(xhttp.responseText);
          if(xhttp.responseText == '4'){
            Alert.alert('Error!!', 'No puedes dejar un campo vacio', [
              {text: 'OK', onPress: () => console.log('user error')},
            ]);
          }
          if(xhttp.responseText == '0'){
            Alert.alert('Error!!', 'Ocurrio un error en el registro', [
              {text: 'OK', onPress: () => console.log('user error')},
            ]);
          }
          if(xhttp.responseText == '1'){
            console.log('Usuario registrado');
            navigation.navigate('Login');
          }
          if (xhttp.responseText == '3') {
            Alert.alert('Error!!', 'Usuario Ya Existente', [
              {text: 'OK', onPress: () => console.log('user error')},
            ]);
          }
          if (xhttp.responseText == '5') {
            Alert.alert('Error!!', 'El campo nombre solo puede incluir letras', [
              {text: 'OK', onPress: () => console.log('user error')},
            ]);
          }
          if (xhttp.responseText == '6') {
            Alert.alert('Error!!', 'El campo código solo puedo incluir números', [
              {text: 'OK', onPress: () => console.log('user error')},
            ]);
          }
          if (xhttp.responseText == '7') {
            Alert.alert('Error!!', 'El correo electronico es inválido', [
              {text: 'OK', onPress: () => console.log('user error')},
            ]);
          }
          if (xhttp.responseText == '8') {
            Alert.alert('Error!!', 'El campo teléfono solo acepta números', [
              {text: 'OK', onPress: () => console.log('user error')},
            ]);
          }
          if (xhttp.responseText == '9') {
            Alert.alert('Error!!', 'El campo teléfono debe tener 10 caracteres', [
              {text: 'OK', onPress: () => console.log('user error')},
            ]);
          }
          if (xhttp.responseText == '10') {
            Alert.alert('Error!!', 'El campo código debe tener 9 caracteres', [
              {text: 'OK', onPress: () => console.log('user error')},
            ]);
          }
        }
      };
      xhttp.open(
        'GET',
        'https://chups.000webhostapp.com/Registro.php?codigo=' +
        this.state.codigo +
        '&nombre=' +
        this.state.nombre +
          '&correo=' +
          this.state.correo +
          '&telefono=' +
          this.state.telefono +
          '&password=' +
          this.state.password +
          '&centro=' +
          this.state.centro +
          '&semestre=' +
          this.state.semestre,
        true,
      );
      xhttp.send();
    };

    return (
      <KeyboardAwareScrollView>
        <View>
          <ImageBackground
            source={require('./Imagenes/fondoRegistro.jpg')}
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
                width: 162,
                marginTop: -130,
                marginLeft: 120,
                fontSize: 20,
                color: 'black',
                opacity: 0.9,
                fontFamily: '',
                backgroundColor: '#084A68',
                borderRadius: 5,
              }}>
              Registro Carrera
            </Text>
            <View style={styles.contenedor}>
              <KeyboardAwareScrollView>
                <Input
                  placeholder="Código"
                  placeholderTextColor="black"
                  keyboardType='numeric'
                  leftIcon={
                    <Icon name="code" size={24} color="#084A68" />
                  }                  
                  onChangeText={codigo => this.setState({codigo})}
                  ></Input>
                  <Input
                    placeholder="Nombre"
                    placeholderTextColor="black"
                    leftIcon={
                      <Icon name="person" size={24} color="#084A68" />
                    }
                    onChangeText={nombre => this.setState({nombre})}
                    ></Input>
                <Input
                  placeholder="Contraseña"
                  placeholderTextColor="black"
                  secureTextEntry={true}
                  leftIcon={
                    <Icon name="lock" size={24} color="#084A68" />
                  }
                  onChangeText={password => this.setState({password})}
                  ></Input>
                <Input
                  placeholder="Teléfono"
                  placeholderTextColor="black"
                  keyboardType="numeric"
                  leftIcon={
                    <Icon name="call" size={24} color="#084A68" />
                  }
                  onChangeText={telefono => this.setState({telefono})}
                  ></Input>
                <Input
                  placeholder="Escuela"
                  placeholderTextColor="black"
                  leftIcon={
                    <Icon name="school" size={24} color="#084A68" />
                  }
                  onChangeText={centro => this.setState({centro})}
                  ></Input>
                <Input
                  placeholder="Grado"
                  placeholderTextColor="black"
                  keyboardType="numeric"
                  leftIcon={
                    <Icon name="grade" size={24} color="#084A68" />
                  }
                  onChangeText={semestre => this.setState({semestre})}
                  ></Input>
                <Input
                  placeholder="Correo"
                  placeholderTextColor="black"
                  keyboardType="email-address"
                  leftIcon={
                    <Icon name="mail" size={24} color="#084A68" />
                  }
                  onChangeText={correo => this.setState({correo})}
                  ></Input>
              </KeyboardAwareScrollView>
            </View>
            <View style={styles.btnEntrar}>
              <TouchableOpacity onPress={regresarALogin}>
                <Text style={styles.btnText}>Regresar</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnRegistrarse}>
              <TouchableOpacity onPress={Enviar}>
              <Text style={styles.btnText}>Enviar</Text>
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
    marginTop: 170,
    marginLeft: 20,
    width: 370,
    height: 510,
    borderRadius: 15,
  },
  btnEntrar: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#084A68',
    width: 110,
    height: 50,
    marginTop: 20,
    marginLeft: 80,
  },
  btnRegistrarse: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#084A68',
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
    marginTop: 100,
    marginLeft: 100,
    opacity: 0.9,
    backgroundColor: '#084A68',
    borderRadius: 20,
  },
});
