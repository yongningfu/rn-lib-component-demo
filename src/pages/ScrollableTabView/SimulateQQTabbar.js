/**
 * 模仿QQtabbar
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Navigator,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

var i18n = {
  message: '消息',
  phone: '电话'
}


export default class SimulateQQTabbar extends Component {

  _getTabStyle = (index) => {
    return this.props.activeTab == index? Styles.activeTab : Styles.normalTab;
  }

  //index为tab的index
  _renderTab = (index) => {

    let tabs = this.props.tabs; //tabs属性是系统自动注入的 这里的值为['message', 'phone']

    //修复安卓的 border-radius + overflow 文件
    let fixAndroidOverflow = (index === 0 && Styles.borderRadiusLeft) || 
                             (index === tabs.length - 1 && Styles.borderRadiusRight) || {};
    return  (
      <TouchableOpacity onPress={() => {this.props.goToPage(index)}}>
        <Text style={[this._getTabStyle(index), fixAndroidOverflow]}>{i18n[tabs[index]]}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={Styles.tabbar}>
        <TouchableOpacity>
          <Image source={require('../../../assets/avatar_.jpg')} style={[Styles.avatar, {marginLeft: 5}]}/>
        </TouchableOpacity>
        <View style={Styles.tabContain}>
          {/*利用tabs属性 根据用户传递过来的tabs进行扩展*/}

          {
            this.props.tabs.map((element, i) => {
              return this._renderTab(i);
            })
          }
        </View>
        <TouchableOpacity>
          <Icon name="plus"  color='white' size={30} style={{marginRight: 5}} />
          {/*<Image source={require('../../../assets/search.png')} style={[Styles.icon, {marginRight: 5}]} />*/}
        </TouchableOpacity>
      </View>
    )
  }
}


const Styles = StyleSheet.create({
  tabbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Navigator.NavigationBar.Styles.General.NavBarHeight,
    backgroundColor: '#11B7F3',
  },

  // 安卓的bug 目前还没修复 父容器设置了borderRadius和overflow 但是子组件还是会从
  //边缘溢出去 相当于 overflow无效
  //我们可以简单解决一下这个bug 如果是最左边的tab 那么设置它的borderTopLeftRadius 
  //borderBottomLeftRadius 和父的borderRadis一样即可

  tabContain: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: 8,
    borderColor: 'white',
    overflow:'hidden',
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'stretch'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  activeTab: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: 'white',
    color: '#11B7F3',
    fontSize: 18,
  },
  normalTab: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    fontSize: 18,
    color: 'white',
  },
  borderRadiusLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  borderRadiusRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  }
});
