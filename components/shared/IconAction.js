import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import { iconBase, iconLg } from '../../styles/icons';
import variables from '../../styles/variables';
import { uPadVert } from '../../styles/utilities';
import { View } from 'react-native';

const IconAction = ({ onPress, Icon, key }) => {
  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component
      style={uPadVert}
      hitSlop={{
        top: variables.gutters.sm,
        bottom: variables.gutters.sm,
        left: variables.gutters.sm,
        right: variables.gutters.sm
      }}
      key={key}
      onPress={onPress}
    >
      <Icon style={[iconBase, iconLg]} fill={variables.colors.white} />
    </Component>
  );
};

IconAction.propTypes = {
  onPress: PropTypes.func,
  Icon: PropTypes.any,
  key: PropTypes.any
};

export default IconAction;
