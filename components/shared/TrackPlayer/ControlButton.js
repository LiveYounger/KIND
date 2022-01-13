import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { iconBase, iconLg } from '../../../styles/icons';
import variables from '../../../styles/variables';
import { btnBase, btnSm, btnTransparent } from '../../../styles/buttons';

const ControlButton = ({ Icon, onPress, isSmall, disabled }) => (
  <TouchableOpacity
    disabled={disabled}
    style={[btnBase, btnTransparent, isSmall && btnSm]}
    onPress={onPress}
  >
    <Icon
      style={[iconBase, !isSmall && iconLg]}
      fill={disabled ? variables.colors.white30 : variables.colors.white}
    />
  </TouchableOpacity>
);

ControlButton.propTypes = {
  Icon: PropTypes.any,
  onPress: PropTypes.func.isRequired,
  isSmall: PropTypes.bool,
  disabled: PropTypes.bool
};

export default ControlButton;
