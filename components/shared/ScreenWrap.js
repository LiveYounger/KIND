import React from 'react';
import { ImageBackground, Platform, View } from 'react-native';
import image from '../../assets/images/screen-bg.png';
import { screenContent, screenWrap } from '../../styles/screens';
import PropTypes from 'prop-types';
import OfflineWarning from './OfflineWarning';

const ScreenWrap = ({ children }) => (
  <ImageBackground style={screenWrap} source={Platform.OS === 'ios' ? { uri: 'screen-bg' } : image}>
    <View style={screenContent}>
      <OfflineWarning />
      {children}
    </View>
  </ImageBackground>
);

ScreenWrap.propTypes = {
  children: PropTypes.any
};

export default ScreenWrap;
