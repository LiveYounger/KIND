import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types';

import { TextInputField } from '../shared/FormFields';
import { resetPasswordValidationRules } from '../../validation/auth';
import $t from 'react-native-i18n';
import ErrorText from '../shared/Text/ErrorText';
import { uFlexGrow } from '../../styles/utilities';
import { btnBase, iconBtnTextLabelWhite } from '../../styles/buttons';

export const ResetPasswordForm = ({ onSubmit, resetPasswordError }) => (
  <View style={uFlexGrow}>
    <Formik
      initialValues={{ password: '', password_confirmation: '' }}
      onSubmit={onSubmit}
      validationSchema={resetPasswordValidationRules}
    >
      {({ handleSubmit }) => (
        <>
          <View style={uFlexGrow}>
            <Field
              name="password"
              component={TextInputField}
              secureTextEntry
              placeholder={$t('auth.enterPassword')}
            />
            <Field
              name="password_confirmation"
              component={TextInputField}
              secureTextEntry
              placeholder={$t('auth.confirmPassword')}
            />
            {!!resetPasswordError.password && (
              <ErrorText
                error={!!resetPasswordError.password}
                message={resetPasswordError.password}
              />
            )}
          </View>
          <TouchableOpacity style={btnBase} onPress={handleSubmit}>
            <Text style={iconBtnTextLabelWhite}>{$t('auth.resetPassword')}</Text>
          </TouchableOpacity>
        </>
      )}
    </Formik>
  </View>
);

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func,
  resetPasswordError: PropTypes.bool
};
