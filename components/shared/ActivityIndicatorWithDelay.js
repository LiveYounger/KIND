import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

const ActivityIndicatorWithDelay = ({ delay = 1000, ...props }) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(true);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  return showLoader ? <ActivityIndicator {...props} /> : null;
};
export default ActivityIndicatorWithDelay;

ActivityIndicatorWithDelay.propTypes = {
  delay: PropTypes.number
};
