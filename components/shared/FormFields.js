import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { ErrorMessage } from 'formik';
import { inputField, fieldIsActive, inputFieldWrap } from '../../styles/forms';
import { uGapBottomSm, uGapLeftSm, uTextError, uTextWhite } from '../../styles/utilities';
import variables from '../../styles/variables';
import IconTick from '../../assets/icons/tick.svg';
import IconEyeOn from '../../assets/icons/eye-on.svg';
import IconEyeOff from '../../assets/icons/eye-off.svg';
import { iconBase, iconSm } from '../../styles/icons';

export const TextInputField = ({ field, form, secureTextEntry = false, ...props }) => {
  const [showPassword, setShowPassword] = useState(!secureTextEntry);
  const [isActive, setIsActive] = useState(false);

  const handleBlur = () => {
    setIsActive(false);
    form.handleBlur(field.name);
  };

  return (
    <View style={uGapBottomSm}>
      <View style={[inputFieldWrap, isActive && fieldIsActive]}>
        <TextInput
          style={[inputField, isActive && uTextWhite]}
          placeholderTextColor={variables.colors.white}
          value={field.value}
          onChangeText={form.handleChange(field.name)}
          onBlur={handleBlur}
          onFocus={() => setIsActive(true)}
          secureTextEntry={!showPassword}
          {...props}
        />

        {!form.errors[field.name] &&
          field.value != '' && (
          <IconTick style={[iconBase, iconSm]} fill={variables.colors.white} />
        )}

        {secureTextEntry && (
          <TouchableOpacity
            style={uGapLeftSm}
            hitSlop={{ top: 7, bottom: 7, left: 7, right: 7 }}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <IconEyeOn style={[iconBase, iconSm]} fill={variables.colors.white} />
            ) : (
              <IconEyeOff style={[iconBase, iconSm]} fill={variables.colors.gray} />
            )}
          </TouchableOpacity>
        )}
      </View>
      <ErrorMessage name={field.name} component={Text} style={uTextError} />
    </View>
  );
};

TextInputField.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  secureTextEntry: PropTypes.bool
};
