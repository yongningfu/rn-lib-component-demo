import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Navigator,
  TouchableOpacity
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import SimulateQQTabbar from './SimulateQQTabbar.js';

export default class SimulateQQTabbarPage extends Component {
  
  render() {
    return (
      <ScrollableTabView
        renderTabBar={() => <SimulateQQTabbar /> }
      >
      <Text tabLabel='message'>消息对应的页面</Text>
      <Text tabLabel='phone'>电话对应的页面</Text>
      </ScrollableTabView>
    )
  }
}