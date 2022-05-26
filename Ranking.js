import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Dimensions,
} from 'react-native';

export default class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persona: [],
      lugares: 0,
    };
  }

  componentDidMount() {
    var xhttp = new XMLHttpRequest();
    let _this = this;
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        console.log(xhttp.responseText);
        var temp = JSON.parse(xhttp.responseText);
        _this.setState({persona: temp});
      }
    };
    xhttp.open('GET', 'https://chups.000webhostapp.com/Ranking.php', true);
    xhttp.send();
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text
            style={{
              backgroundColor: 'black',
              color: 'orange',
              height: 40,
              width: 90,
              marginLeft: 160,
              marginTop: 10,
              textAlign: 'center',
              borderRadius: 5,
            }}>
            RANKING{' '}
          </Text>
          <FlatList
            keyExtractor={item => item.Codigo}
            data={this.state.persona}
            renderItem={({item}) => (
              <View style={styles.lista}>
                <Text style={styles.it1}>Codigo: {item.Codigo}</Text>
                <View>
                  <Text style={styles.datos}>Distancia: {item.Distancia}</Text>
                  <Text style={styles.datos}>Tiempo: {item.Tiempo}</Text>
                  <Text style={styles.datos}>Puntos: {item.Puntos}</Text>
                </View>
              </View>
            )}></FlatList>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  lista: {
    backgroundColor: 'orange',
    height: 100,
    width: 390,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 6,
    marginTop: 2,
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  container: {
    backgroundColor: 'grey',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  it1: {
    color: 'black',
  },
  datos: {
    textShadowColor: 100,
    color: 'white',
  },
  fondo: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
});
