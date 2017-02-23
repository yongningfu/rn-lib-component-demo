
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Platform
} from 'react-native';

var Dimensions = require('Dimensions');
var {height, width} = Dimensions.get('window');

export default class ReactNativeVideoPage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      imagePath: null, //代表图像是否下载了
      placeHolder: '占位符是空的，快下载'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/3.jpg')} style={styles.border}>
          <Image source={require('../../assets/home_border.png')} style={styles.inLineImg}></Image>
        </Image>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inLineImg: {
    width: width,
    height: 200,
    resizeMode: 'stretch',
  },
  border: {
    width: width,
    height: 200,
    resizeMode: 'stretch'
  }
});


