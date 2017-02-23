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



// Sound这个组件 Android并不支持从网上下载
//为了兼容 声音资源都是先从网上下载都本地，才进行播放

//对安卓进行测试 发现在官方提供的文件夹路径资源是无法获取的android/app/src/main/res/raw
// 但是 DocumentDirectoryPath 这个目录可以获取  看issue 好像安卓跟绝对路径有关
 

import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';

export default class ReactNativeVideoPage extends Component {

  constructor(props) {
    super(props);
    this.sound = null,     //声音对象
    this.audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac',
    this.state = {
      isPlaying: false,     //是否正在播放
      duration: 0.0,        //总时间
      currentTime: 0.0,
    }
  }


  componentWillUnmount() {
    //清楚定时器
    this.timer && clearInterval(this.timer);
    this.sound && this.sound.release();
  }

  _onButtonPress = () => {
    if (this.state.isPlaying) {
      this._pause();
    } else {
      if (!this.sound) {
        this._loadSoundAndPlay();
      } else {
        this._play();
      }
    }
  }

  _pause = () => {
    this.setState({
      isPlaying:false,
    }, () => {
      this.sound.pause();
    });
  }


  //还没load 使用这个play
  _loadSoundAndPlay = () => {

    this.sound = new Sound(this.audioPath, '', (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }

      this.setState({duration: this.sound.getDuration()});
      //做进度提示 由于这个react-native-sound 提供的函数的api的原因
      this.timer = setInterval(() => {
        this.sound.getCurrentTime((seconds, isPlaying) => {
          this.setState({
            currentTime: seconds,
          });
        });
      }, 100);

      this._play();

    });
  }


  //已经load 使用这个play
  _play = () => {
    this.setState({isPlaying: true}, () => {
      this.sound.play(() => {
        this.setState({
          isPlaying: false,
          currentTime: this.state.duration
        });
      });
    });
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


  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    }
    return 0;
  };

  render() {

    return (
      <View style={styles.container}>
          <TouchableOpacity onPress={this._onButtonPress}>
            <Image source={require("../../../assets/listen_view.png")} style={styles.listen_view}>
                <Text style={styles.audioSeconds}>{parseInt(this.state.duration)}s</Text>
                <View style={[styles.progress, {width: this.getCurrentTimePercentage() * 300}]}/>
            </Image>
          </TouchableOpacity>
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



/*
import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
const Sound = require('react-native-sound');

const Button = ({title, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.button}>{title}</Text>
  </TouchableOpacity>
);

const Header = ({children}) => (<Text style={styles.header}>{children}</Text>);

const Feature = ({title, onPress, description, buttonLabel = "PLAY"}) => (
  <View style={styles.feature}>
    <Header>{title}</Header>
    <Button title={buttonLabel} onPress={onPress}/>
  </View>);

const requireAudio = require('./advertising.mp3');

class MainView extends Component {

  constructor(props) {
    super(props);

    Sound.setCategory('Ambient', true); // true = mixWithOthers

    this.playSoundBundle = () => {
      const s = new Sound('advertising.mp3', Sound.MAIN_BUNDLE, (e) => {
        if (e) {
          console.log('error', e);
        } else {
          s.setSpeed(1);
          console.log('duration', s.getDuration());
          s.play(() => s.release()); // Release when it's done so we're not using up resources
        }
      });
    };

    this.playSoundFromRequire = () => {
      const s = new Sound(requireAudio, (e) => {
        if (e) {
          console.log('error', e);
          return;
        }

        s.play(() => s.release());
      });
    };



  }

  renderiOSOnlyFeatures() {
    return [
      <Feature key="require" title="Audio via 'require' statement" onPress={this.playSoundFromRequire}/>,
    ]
  }

  render() {
    return <View style={styles.container}>
      <Feature title="Main bundle audio" onPress={this.playSoundBundle}/>
      { Platform.OS === 'ios' ? this.renderiOSOnlyFeatures() : null }
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    fontSize: 20,
    backgroundColor: 'silver',
    padding: 5,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  feature: {
    padding: 20,
    alignSelf: 'stretch',
  }
});

export default MainView;*/