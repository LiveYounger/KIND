import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types';

import { TextInputField } from '../shared/FormFields';
import { changePasswordValidationRules } from '../../validation/profile';
import $t from 'react-native-i18n';
import ErrorText from '../shared/Text/ErrorText';
import { btnBase, iconBtnTextLabelWhite } from '../../styles/buttons';
import { uFlexGrow } from '../../styles/utilities';

export const ChangePasswordForm = ({ onSubmit, invalidOldPasswordError }) => (
  <Formik
    initialValues={{
      current_password: '',
      new_password: '',
      new_password_confirmation: ''
    }}
    onSubmit={onSubmit}
    validationSchema={changePasswordValidationRules}
  >
    {({ handleSubmit }) => (
      <View style={uFlexGrow}>
        <View style={uFlexGrow}>
          <Field
            name="current_password"
            component={TextInputField}
            secureTextEntry
            placeholder={$t('profile.changePassword.currentPassword')}
          />
          {!!invalidOldPasswordError && (
            <ErrorText
              error={!!invalidOldPasswordError}
              message={$t('profile.changePassword.invalidOldPassword')}
            />
          )}
          <Field
            name="new_password"
            component={TextInputField}
            secureTextEntry
            placeholder={$t('profile.changePassword.newPassword')}
          />
          <Field
            name="new_password_confirmation"
            component={TextInputField}
            secureTextEntry
            placeholder={$t('profile.changePassword.confirmNewPassword')}
          />
        </View>
        <TouchableOpacity style={btnBase} onPress={handleSubmit}>
          <Text style={iconBtnTextLabelWhite}>{$t('profile.changePassword.change')}</Text>
        </TouchableOpacity>
      </View>
    )}
  </Formik>
);

ChangePasswordForm.propTypes = {
  onSubmit: PropTypes.func,
  invalidOldPasswordError: PropTypes.bool
};
