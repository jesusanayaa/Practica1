import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Button, TextInput} from 'react-native';
// importacion de los objetos

export default class Screen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // poner todas las variables locales y globales
      Miles: 1,
      contrario: 0,
      Goles1: '',
      Goles2: '',
    };
  }

  render() {
    // codigo para que funcionen los elementos graficos y func
    const Cmarcador = () => {
      // asignar valores a las variables
      this.setState({Miles: this.state.Goles1});
      this.setState({contrario: this.state.Goles2});
    };
    return (
      <View>
        <Text style={styles.Texto}> Partido </Text>
        <Image style={styles.logo} source={require('./Imagenes/985969.jpg')} />
        <Text style={styles.textoVS}>VS</Text>
        <Image
          style={styles.logo}
          source={{
            uri: 'https://i2.wp.com/codigoespagueti.com/wp-content/uploads/2022/01/Tobey-Maguire-spidermna-no-way-home.jpg?resize=1280%2C720&quality=80&ssl=1',
          }}
        />
        <View>
          <Text style={styles.Tmarcador}>Marcador:</Text>
          <Text style={styles.Marcador}>Miles: {this.state.Miles}</Text>
          <Text style={styles.Marcador}>Tobey: {this.state.contrario}</Text>
        </View>
        <View style={styles.Tinput}>
          <TextInput
            placeholder="Anotaciones Equipo 1"
            onChangeText={Goles1 => this.setState({Goles1})}></TextInput>
        </View>
        <View style={styles.Tinput}>
          <TextInput
            placeholder="Anotaciones Equipo 2"
            onChangeText={Goles2 => this.setState({Goles2})}></TextInput>
        </View>
        <View style={styles.BotonCambiarMarcador}>
          <Button
            color="brown"
            title="Cambiar Marcador"
            onPress={Cmarcador}></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Texto: {
    fontSize: 50,
    color: 'black',
    textAlign: 'center',
    marginTop: 30,
  },
  logo: {
    marginLeft: 143,
    width: 120,
    height: 120,
  },
  textoVS: {
    fontSize: 50,
    textAlign: 'center',
    color: 'gray',
  },
  Tmarcador: {
    fontSize: 40,
    color: 'red',
    textAlign: 'center',
  },
  Marcador: {
    fontSize: 25,
    color: 'gray',
    textAlign: 'center',
  },
  BotonCambiarMarcador: {
    marginTop: 10,
    width: 200,
    height: 50,
    marginLeft: 100,
  },
  Tinput: {
    borderWidth: 1,
    borderColor: 'gray',
    width: 170,
    height: 50,
    marginLeft: 10,
    marginTop: 10,
  },
});
