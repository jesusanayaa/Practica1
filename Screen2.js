import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Input, Icon, Button} from 'react-native-elements';
import {color} from 'react-native-elements/dist/helpers';

export default class Screen2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <ImageBackground
          style={styles.bg}
          source={{
            uri: 'https://i.pinimg.com/564x/fb/4a/d5/fb4ad562001a39c11a8746d31f093cd2.jpg',
          }}
          resizeMode="cover">
          <Text></Text>
          <View style={styles.ctn}>
            <Input
              placeholder="Nombre"
              placeholderTextColor="black"
              leftIcon={<Icon name="person" size={24} color="black" />}></Input>
            <Input
              placeholder="Password"
              placeholderTextColor="black"
              secureTextEntry={true}
              leftIcon={<Icon name="lock" size={24} color="black" />}></Input>
            <Button
              title="LOG IN"
              icon={{
                name: 'home',
                type: 'font-awesome',
                size: 15,
                color: 'black',
              }}
              buttonStyle={{
                backgroundColor: 'gray',
                borderWidth: 2,
                borderColor: 'black',
                borderRadius: 15,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 105,
                marginVertical: 10,
              }}
              titleStyle={{fontWeight: 'bold', color: 'orange'}}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  ctn: {
    marginTop: Dimensions.get('screen').height / 3,
  },
});
