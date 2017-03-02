import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import Swiper from 'react-native-swiper';
const { width, height } = require('Dimensions').get('window');
import ImageCoverPage from './ImageCoverPage.js';

function SwiperPage() {

  return (
    <Swiper autoplay={true}>
      <ImageCoverPage />
      <ImageCoverPage />
      <ImageCoverPage />
      <ImageCoverPage />
    </Swiper>
  );
}

export default SwiperPage;



