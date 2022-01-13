import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { modalBody } from '../../../../styles/modals';

const ModalBody = ({ children }) => {
  return <View style={modalBody}>{children}</View>;
};

export default ModalBody;

ModalBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ])
};
