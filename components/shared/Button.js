import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { btnBase } from '../../styles/buttons';

const Button = ({ children, onPress, style = [], ...rest }) => {
  const additionalStyles = style instanceof Array ? style : [style];

  return (
    <TouchableOpacity style={[btnBase, ...additionalStyles]} onPress={onPress} {...rest}>
      {children}
    </TouchableOpacity>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  imageSource: PropTypes.any,
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default Button;
