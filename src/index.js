import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import { List } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

import { Button } from 'antd-mobile';

export default class DefaultPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
      <List renderHeader={() => 'react-native第三方组件使用demo'}>
        <Item
          thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
          arrow="horizontal"
          onClick={() => {}}
        >demo1</Item>
        <Item thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png" arrow="horizontal">demo2</Item>
      </List>
      </View>
    )
  }
}