
//引用参考:  http://www.alloyteam.com/2016/01/reactnative-animated/

/**
 * 动态要点:
 * 1.Animated动态变化 改变的仅仅只是动画value以及组件内部的setState而已
 * 2.具体变形的话 根据界面绑定的state执行
 * 3.transform是相对于父组件来进行变化定位的, 而且范围仅仅限制在父组件中
 * 4. 基本流程 设置一个value 然后把value绑定在组件props上面，然后写好动画value变化逻辑 start
 * 5. 基本动画类型 spring timing ?  组合动画类型 parallel sequence delay stagger
 * 6. Animated.Value 的值不能传递给 非Animated的元素(即除了 Animated.View Animated.Text Animated.Image)
 * 
 */


import React, { Component } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Easing
} from 'react-native'


export default class AnimatedDemo extends Component {
  constructor() {
    super();
    this.state = {

      //Animated的和Animated的元素 和值 value需要组合在一起使用
      //Animated可以给value绑定事件 value监听并触发对应的dom

      anim: [1, 2, 3].map(() => new Animated.Value(0))
    }
  }

  componentDidMount() {
    var timing = Animated.timing;
    Animated.sequence([
      Animated.stagger(200, this.state.anim.map(left => {
        return timing(left, {
          toValue: 1
        });
      }).concat(
        this.state.anim.map(left => {
          return timing(left, {
            toValue: 0,
          })
        })
      )),
      Animated.delay(400),
      timing(this.state.anim[0], {
        toValue: 1
      }),
      timing(this.state.anim[1], {
        toValue: -1
      }),
      timing(this.state.anim[2], {
        toValue: 0.5
      }),
      Animated.delay(400),      
      Animated.parallel(this.state.anim.map(ele => {
        return timing(ele, {
          toValue: 0
        })
      })),
    ]).start();
  }

  render() {
    var animatedViews = this.state.anim.map((value, index) => {
      return (
        <Animated.View
          key={index}
          style={{
            transform: [{translateX: value.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 200]
            })}]
          }}
        > 
          <Animated.Text style={{transform: [{scale: value }]}}>
            {`这是第${index}个view`}
          </Animated.Text>

          {/*

          value 为AnimatedVlaue类型 不能直接传递给原来的Text 只能传递给Animated Text
          因为在Animated.Text中 有个转化的过程

          <Text style={{transform: [{scale: value }]}}>
            {`这是第${index}个view`}
          </Text>*/}

        </Animated.View>
      )
    });

    console.warn('container组件render'); //只是显示一次 说明container只是触发一次

    return(
      <View style={{flex: 1, justifyContent: 'center',  alignItems: 'center'}}>
        {animatedViews}
      </View>
    );
  }
}
