
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
  Platform
} from 'react-native';



import RNFetchBlob from 'react-native-fetch-blob'

const UPLOAD = 'UPLOAD',
      DOWNLOAD = 'DOWNLOAD',
      LOGIN = 'LOGIN';

export default class ReactNativeVideoPage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      imagePath: null, //代表图像是否下载了
      placeHolder: '占位符是空的，快下载'
    }
  }

  _renderDownLoadImage = () => {
    let imagePath = this.state.imagePath;
    if (imagePath) {
      return <Image resizeMode="stretch" 
                    source={{ uri : Platform.OS === 'android' ? 'file://' + imagePath  : '' + imagePath }}
                    style={styles.placeHolder}
                    />
    } else {
      return <View style={styles.placeHolder}>
                <Text>{ this.state.placeHolder }</Text>
              </View>
    }
  }

  _renderButton = (title, onPress) => {
      var style = (title === this.state.selected) ? styles.activeButtonText : styles.buttonText;
      return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={style}>
            {title}
          </Text>
        </TouchableOpacity>
      );
  }

  _onLoginPress = () => {
    
    this.setState({
      selected: LOGIN
    });

    //官方也给出了替换fetch的方法，可以RNFetchBlob内部的fetch替换react-native的fetch
    //RNFetchBlob的fetch基本实现了官方的fetch
    //这里我进行替换的原因是 和服务器的交互是用cookie进行身份识别的，不能某些接口使用官方的fetch
    //某些使用RNFetchBlob的fetch　RNFetchBlob的 fetch也会帮我们管理cookie
    const Fetch = RNFetchBlob.polyfill.Fetch
    // replace built-in fetch
    window.fetch = new Fetch({
        auto : true,
        binaryContentTypes : [
            'image/',
            'video/',
            'audio/',
            'foo/',
        ]
    }).build()


    // 下面是登录操作，由于上传服务需要cookie 发送这个api的话，服务器会自动
    //设置cookie, 并发送回客户端, react-native 和 RNFetchBlob都会自动管理cookie
    //所以登录后，再执行upload的话，upload会自动携带有登录带回来的cookie
    let form = new FormData();
    form.append('user_id', 12);
    form.append('token', '73d6633dccaf4f19a16e76d982d70800');

    fetch('http://123.207.233.226:5000/api/tklogin', {
      method: 'POST',
      body: form,
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data)
    })
    .catch((err)=> {
      console.log(err);
    })

  }

  _onDownLoadPress = () => {

    this.setState({
      selected: DOWNLOAD
    })

  
    let dirs = RNFetchBlob.fs.dirs;
    RNFetchBlob
      .config({
        // fileCache : true, 这个配置是将下载存入文件存入到临时路径(随机产生名称, 而且没有扩展名)
        // appendExt : 'png' 这个是配置扩展名
        path : dirs.DocumentDir + '/path-to-file.jpg' //这个可以直接规则下载到哪 而且叫什么名字
      })
      .fetch('GET', 'http://123.207.233.226:5000/static/avatar/default.jpg', {
      })
      .then((res) => {
        // the temp file path
        // res.path() 可以得到文件的路径
        console.warn('The file saved to ', res.path())
        this.setState({
          imagePath: res.path()
        });
      })
      .catch((err)=> {
        console.warn(err);
      })
  }

  _onUploadPress = () => {

    this.setState({
      selected: UPLOAD
    })

    if (!this.state.imagePath) {
      this.setState({
        placeHolder: '还行下载，先下载'
      })
      return;
    }


    RNFetchBlob.fetch('PATCH', 'http://123.207.233.226:5000/api/users/1', {
      'Content-Type' : 'multipart/form-data',
    }, [

      { name : 'avatar', filename : 'uploader.jpg', type:'image/foo', data: RNFetchBlob.wrap( RNFetchBlob.fs.dirs.DocumentDir + '/path-to-file.jpg')},
      { name : 'username', data : 'testtest'},
      { name : 'status', data : "uploadtest"},
      { name : 'description', data : "uploadtest"},
      { name : 'school', data : "uploadtest"},
      { name : 'school', data : "uploadtest"},
      { name : 'school', data : "uploadtest"},
      { name : 'grade', data : "uploadtest"},
  ])
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    
    if (data.status == 200) {
      this.setState({
        imagePath: false,
        placeHolder: '已成功上传'
      })
    } else {
      this.setState({
        imagePath: false,
        placeHolder: '请登录 然后获取图片 在上传'
      }) 
    }
  })
  .catch((err) => {
  })


  // 原始的java代码 可参看转成 react native
  /*@PATCH("api/users/{user_id}")
    @Multipart
    Call<UUidResult> requestUUid(@Path("user_id") int uid,
                                 @Part("username") RequestBody username,
                                 @Part("status") RequestBody status,
                                 @Part("description") RequestBody description,
                                 @Part("school") RequestBody school,
                                 @Part("major") RequestBody major,
                                 @Part("grade") RequestBody grade,
                                 @Nullable @Part MultipartBody.Part file);*/
  }


  render() {
    return (
      <View style={styles.container}>
        { this._renderDownLoadImage() }
        { this._renderButton(LOGIN, this._onLoginPress) }
        { this._renderButton(DOWNLOAD, this._onDownLoadPress) }
        { this._renderButton(UPLOAD, this._onUploadPress )}
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
  placeHolder: {
    width: 150,
    height: 150,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
  activeButtonText: {
    color: 'red'
  },
  buttonText: {

  }
});


