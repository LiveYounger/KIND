import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import { btnTransparent, btnGradientWrap } from '../../styles/buttons';
import variables from '../../styles/variables';

const GradientButton = ({
  children,
  buttonStyles,
  buttonColorsProps,
  onPress,
  style = [],
  ...rest
}) => {
  const additionalStyles = style instanceof Array ? style : [style];
  const additionalButtonStyles = buttonStyles instanceof Array ? style : [style];
  const buttonColors = buttonColorsProps
    ? buttonColorsProps
    : [variables.colors.black, variables.colors.black];

  return (
    <LinearGradient
      colors={buttonColors}
      style={[btnGradientWrap, ...additionalStyles]}
      start={{ x: 0, y: 1 }}
    >
      <TouchableOpacity
        style={[btnTransparent, ...additionalButtonStyles]}
        onPress={onPress}
        {...rest}
      >
        {children}
      </TouchableOpacity>
    </LinearGradient>
  );
};

GradientButton.propTypes = {
  children: PropTypes.node.isRequired,
  imageSource: PropTypes.any,
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  buttonStyles: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  buttonColorsProps: PropTypes.array
};

export default GradientButton;
