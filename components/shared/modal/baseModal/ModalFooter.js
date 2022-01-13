import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { modalFooter } from '../../../../styles/modals';

const ModalFooter = ({ children }) => {
  return <View style={modalFooter}>{children}</View>;
};

export default ModalFooter;

ModalFooter.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ])
};
