/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/**
 * 安装react-native-video有个Bug 修改react-native-video 里面的依赖
 * 
 * dependencies {
    provided 'com.facebook.react:react-native:+'
    compile 'com.yqritc:android-scalablevideoview:1.0.1'
}
 
 provided 改成 compile* 
 * 
 */


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';



import Video from 'react-native-video';

export default class ReactNativeVideoPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      download: false,     //是否已经下载
      isDownloading: false, //是否正在下载
      loadError: false,
      paused: false,   // 下载完成的时候 自动播放---这个也是组件bug 无法阻止它播放, 所以我们只能按照它来
      duration: 0.0,   //总时间
      currentTime: 0.0,
    }
  }


  _setStateAsync = (state) => {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }


  _onButtonPress = () => {
    //还没下载的话 先下载 即展示出Video组件, 后面就是控制暂停和播放
    if (!this.state.download) {
      

      //下面这样的写法可能会让人感到奇怪
      //因为 setState的批量更新策略，而且 当download为true的时候，video组件会加载进来
      //会直接造成程序crash,导致下载提示无法加载出来, 所以我们必须是先setState isDownloading
      //然后再加载video

      this._setStateAsync({
        isDownloading: true,
        loadError: false
      }).then(() => {
        setTimeout(()=> {  //这里的话 还必须放在异步setTimeout中

        this.setState({
          download: true
        });

        }, 0)
      });


    } else {
      this.setState({
        paused: !this.state.paused,
      })
    }
  }

  //这个用处不大
  _onLoadStart = () => {
    
  }

  //组件加载完成的时候 表示已经下载完成
  _onLoad = (data)=> {
    this.setState({ 
      duration: data.duration,
      isDownloading: false
    });
  }

  _onProgress = (data) => {
    this.setState({ currentTime: data.currentTime });
  }

  //播放结束的时候
  _onEnd = () => {
    this.setState({
      paused: true,
    });
    this.video.seek(0);
  }

  //当视频加载失败的时候
  // 这个函数基本也无法工作---所以这个库bug非常多
  _onError = () => {
    this.setState({
      download: false,
      loadError: true,
      isDownloading: false,
    });
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    }
    return 0;
  };


  //<Video source={{uri: "http://123.207.233.226:5000/static/audio/1.wav"}}
  //<Video source={require("../../assets/lixiang.mp3")} .mp3貌似获取不了进度
  render() {

    return (
      <View style={styles.container}>

          {
            this.state.download &&
            <Video source={require('../../assets/1.wav')}
              ref={(ref) => { this.video = ref }}
              onLoadStart={this._onLoadStart}
              onBuffer={this._onBuffer}
              onProgress={this._onProgress}
              onLoad={this._onLoad}
              onEnd={this._onEnd}
              onError={this._onError}
              paused={this.state.paused}
              rate={1}
              volume={1} 
              muted={false}
              resizeMode="cover" 
              repeat={false} 
              key="video1" />  
          }

          <TouchableOpacity onPress={this._onButtonPress}>
            <Image source={require("../../assets/listen_view.png")} style={styles.listen_view}>
                <Text style={styles.audioSeconds}>{parseInt(this.state.duration)}s</Text>
                <View style={[styles.progress, {width: this.getCurrentTimePercentage() * 300}]}/>
                {/*在react-native-video加载的时候，app会暂时crash, 导致ActivityIndicator无法显示动画*/}
                {/*所以这里用文本进行提示*/}
            </Image>
          </TouchableOpacity>
          { this.state.isDownloading && <Text style={ styles.textInCenter }>正在下载中。。。</Text>}
          {this.state.loadError && <Text style={ styles.textInCenter }>下载失败，请重试</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },

  listen_view: {
    resizeMode: 'stretch',
    height: 45, 
    width: 300,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 10,
    marginBottom: 10,
  },

  audioSeconds: {
    color: 'white', 
    fontSize: 15
  },

  //文本居中的一种实现思路
  textInCenter: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    textAlign: 'center',
    textAlignVertical : 'center' //这个是android中的属性 ios不知道是否支持
  },

  progress: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    height: 45, 
    width: 0,
    left: 0,
    top: 0,
  }

});




/***官方demo */

/*'use strict';

import React, {
  Component
} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Video from 'react-native-video';

class rnFsMp3Demo extends Component {

  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    paused: true,
  };

  video =  Video;

  onLoad = (data) => {
    this.setState({ duration: data.duration });
  };

  onProgress = (data) => {
    this.setState({ currentTime: data.currentTime });
  };

  onEnd = () => {
    this.setState({ paused: true })
    this.video.seek(0)
  };

  onAudioBecomingNoisy = () => {
    this.setState({ paused: true })
  };

  onAudioFocusChanged = (event) => {
    this.setState({ paused: !event.hasAudioFocus })
  };

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    }
    return 0;
  };

  renderRateControl(rate) {
    const isSelected = (this.state.rate === rate);

    return (
      <TouchableOpacity onPress={() => { this.setState({ rate }) }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
          {rate}x
        </Text>
      </TouchableOpacity>
    );
  }

  renderResizeModeControl(resizeMode) {
    const isSelected = (this.state.resizeMode === resizeMode);

    return (
      <TouchableOpacity onPress={() => { this.setState({ resizeMode }) }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
          {resizeMode}
        </Text>
      </TouchableOpacity>
    )
  }

  renderVolumeControl(volume) {
    const isSelected = (this.state.volume === volume);

    return (
      <TouchableOpacity onPress={() => { this.setState({ volume }) }}>
        <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
          {volume * 100}%
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.fullScreen}
          onPress={() => this.setState({ paused: !this.state.paused })}
        >
          <Video
            ref={(ref) => { this.video = ref }}
            source={require('./1.wav')}
            style={styles.fullScreen}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            onEnd={this.onEnd}
            onAudioBecomingNoisy={this.onAudioBecomingNoisy}
            onAudioFocusChanged={this.onAudioFocusChanged}
            repeat={false}
          />
        </TouchableOpacity>

        <View style={styles.controls}>
          <View style={styles.generalControls}>
            <View style={styles.rateControl}>
              {this.renderRateControl(0.25)}
              {this.renderRateControl(0.5)}
              {this.renderRateControl(1.0)}
              {this.renderRateControl(1.5)}
              {this.renderRateControl(2.0)}
            </View>

            <View style={styles.volumeControl}>
              {this.renderVolumeControl(0.5)}
              {this.renderVolumeControl(1)}
              {this.renderVolumeControl(1.5)}
            </View>

            <View style={styles.resizeModeControl}>
              {this.renderResizeModeControl('cover')}
              {this.renderResizeModeControl('contain')}
              {this.renderResizeModeControl('stretch')}
            </View>
          </View>

          <View style={styles.trackingControls}>
            <View style={styles.progress}>
              <View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
              <View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: 'white',
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
});
*/

