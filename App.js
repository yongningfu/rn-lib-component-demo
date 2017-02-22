import React, { Component } from 'react';
import { 
  AppRegistry,
  Navigator
 } from 'react-native';

import DefaultPage from './src/index.js'

if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    error: () => {},
  }
}


const getSceneStyle = (props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ?
      0 : Navigator.NavigationBar.Styles.General.TotalNavHeight;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};


import {Scene, Router} from 'react-native-router-flux';


import ReactNativeVideoPage from './src/pages/ReactNativeVideoPage.js';


class App extends React.Component {
  render() {
    return (
      <Router
        getSceneStyle={getSceneStyle}
      >
        <Scene key="root">
          <Scene key="DefaultPage" component={DefaultPage} title="index"/>
          <Scene key="ReactNativeVideoPage" component={ReactNativeVideoPage} title="react-native-video"/>
        </Scene>
    </Router>)
  }
}


AppRegistry.registerComponent('rnLibComponentDemo', () => App);

