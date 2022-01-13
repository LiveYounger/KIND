import React from 'react';
import PropTypes from 'prop-types';
import variables from '../styles/variables';
import { uGapBottomSm } from '../styles/utilities';

const TabBarIcon = ({ Image, focused, InactiveImage }) => {
  if (focused || !InactiveImage) {
    return (
      <Image
        width={variables.sizes.iconLg}
        height={variables.sizes.iconLg}
        style={uGapBottomSm}
        fill={focused ? variables.colors.white : variables.colors.white50}
      />
    );
  }

  return (
    <InactiveImage
      width={variables.sizes.iconLg}
      height={variables.sizes.iconLg}
      style={uGapBottomSm}
    />
  );
};

TabBarIcon.propTypes = {
  Image: PropTypes.func,
  InactiveImage: PropTypes.func,
  focused: PropTypes.bool
};

export default TabBarIcon;
