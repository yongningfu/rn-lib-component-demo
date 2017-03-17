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
import RecordAndPlayPageOfficalDemo from'./src/pages/RecordAndPlayPage/OfficalDemo.js';
import RecordAndPlayPageCustomDemo1 from './src/pages/RecordAndPlayPage/CustomDemo1.js';
import UpAndDownloadFilePage from './src/pages/UpAndDownloadFilePage.js';
import ScrollTabViewPage from './src/pages/ScrollableTabView/ScrollTabViewPage.js';
import SimulateQQTabbarPage  from './src/pages/ScrollableTabView/SimulateQQTabbarPage.js';
import SwiperPage from './src/pages/SwiperPage.js';
import AnimatedDemo from './src/pages/AnimatedDemo'

class App extends React.Component {
  render() {
    return (
      <Router
        getSceneStyle={getSceneStyle}
      >
        <Scene key="root">
          <Scene key="test" component={AnimatedDemo} title="test"/>
          <Scene key="DefaultPage" component={DefaultPage} title="index"/>
          <Scene key="ReactNativeVideoPage" component={ReactNativeVideoPage} title="react-native-video"/>
          <Scene key="RecordAndPlayPageOfficalDemo" component={RecordAndPlayPageOfficalDemo} title="audio sound"/>
          <Scene key="RecordAndPlayPageCustomDemo1" component={RecordAndPlayPageCustomDemo1} title="audio sound"/>
          <Scene key="UpAndDownloadFilePage" component={UpAndDownloadFilePage} title="fetch-blob"/>
          <Scene key="ScrollTabViewPage" component={ScrollTabViewPage} title="custom-tabbar"/>
          <Scene key="SimulateQQTabbarPage" component={SimulateQQTabbarPage} title="custom-tabbar"/>
          <Scene key="SwiperPage" component={SwiperPage} title="swiper"/>
        </Scene>
    </Router>)
  }
}


AppRegistry.registerComponent('rnLibComponentDemo', () => App);

