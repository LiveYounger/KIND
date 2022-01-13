import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { modalHeader } from '../../../../styles/modals';

const ModalHeader = ({ children }) => {
  return <View style={modalHeader}>{children}</View>;
};

export default ModalHeader;

ModalHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ])
};
