import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { modalCloseBtn, modalScreen } from '../../../styles/modals';
import { iconBase } from '../../../styles/icons';
import IconClose from '../../../assets/icons/close.svg';
import variables from '../../../styles/variables';

const FullScreenModal = ({ navigation, children, closeIconColor = variables.colors.black }) => {
  return (
    <View style={modalScreen}>
      <TouchableOpacity
        style={modalCloseBtn}
        hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
        onPress={() => navigation.goBack()}
      >
        <IconClose style={iconBase} fill={closeIconColor} />
      </TouchableOpacity>

      {children}
    </View>
  );
};

export default FullScreenModal;

FullScreenModal.propTypes = {
  navigation: PropTypes.object,
  children: PropTypes.node,
  closeIconColor: PropTypes.string
};
