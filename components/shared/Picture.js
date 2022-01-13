import React, { useState, Fragment } from 'react';
import { Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import config from '../../config';
import ActivityIndicatorWithDelay from './ActivityIndicatorWithDelay';

const { IMAGE_BASE_URL } = config;

const Picture = ({ source, uri, style }) => {
  const [loader, setLoader] = useState(true);
  const getSourceForImage = () => {
    if (source) {
      return source;
    }

    let result = uri.match(/^https?/) ? { uri } : { uri: IMAGE_BASE_URL + uri };
    return result;
  };

  const getStyle = () => {
    return style ? style : { width: 100, height: 100 };
  };

  return (
    <Fragment>
      <Image style={getStyle()} source={getSourceForImage()} onLoadEnd={() => setLoader(false)} />
      {loader && (
        <ActivityIndicatorWithDelay style={styles.loading} animating={loader} size="large" />
      )}
    </Fragment>
  );
};

Picture.propTypes = {
  uri: PropTypes.string,
  source: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  style: PropTypes.object
};

export default Picture;

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  }
});
