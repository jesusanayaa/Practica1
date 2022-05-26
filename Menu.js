import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LOGIN from "./Login"
import REGISTRO from "./Registro"
import INICIO from "./Inicio"
import MAPA from "./Mapa"
import RANKING from "./Ranking"


export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LOGIN} />
          <Stack.Screen name="Registro" component={REGISTRO} />
          <Stack.Screen name="Inicio" component={INICIO} />
          <Stack.Screen name="Mapa" component={MAPA} />
          <Stack.Screen name="Ranking" component={RANKING} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}