import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import { List } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

import { Actions } from 'react-native-router-flux';

export default class DefaultPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
      <List renderHeader={() => 'react-native第三方组件使用demo'}>
        <Item thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
              arrow="horizontal"
              onClick={() => { Actions.ReactNativeVideoPage({}) }}>
          react-native-video
        </Item>
        <List renderHeader={() => 'react-native audio react-native-sound(需要先对官方版本录音)'}>
          <Item thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png" 
                arrow="horizontal"
                onClick={() => { Actions.RecordAndPlayPageOfficalDemo({}) }}>
            offical
          </Item>
          <Item thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                arrow="horizontal"
                onClick={() => { Actions.RecordAndPlayPageCustomDemo1({}) }}>
            custom
          </Item>
        </List>
        
      </List>
      </View>
    )
  }
}