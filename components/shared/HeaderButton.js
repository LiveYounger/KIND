import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import variables from '../../styles/variables';
import { btnBase, btnSm, btnTransparent } from '../../styles/buttons';

const HeaderButton = ({ Image, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[btnBase, btnTransparent, btnSm]}>
    <Image
      width={variables.sizes.iconLg}
      height={variables.sizes.iconLg}
      fill={variables.colors.white}
    />
  </TouchableOpacity>
);

HeaderButton.propTypes = {
  Image: PropTypes.func,
  onPress: PropTypes.func
};

export default HeaderButton;
