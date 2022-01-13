import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { uGapTopXs, uTextError } from '../../../styles/utilities';

const ErrorText = props => {
  return <Text style={[uTextError, uGapTopXs]}>{props.error ? props.message : ''}</Text>;
};

ErrorText.propTypes = {
  error: PropTypes.bool,
  message: PropTypes.string
};

export default ErrorText;
