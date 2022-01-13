import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types';
import $t from 'react-native-i18n';

import { TextInputField } from '../shared/FormFields';
import { forgotPasswordValidationRules } from '../../validation/auth';
import ErrorText from '../shared/Text/ErrorText';
import { uFlexGrow, uGapTopLg, uTextBaseSize, uTextWhite } from '../../styles/utilities';
import { btnBase, iconBtnTextLabelWhite } from '../../styles/buttons';

export const ForgotPasswordForm = ({ onSubmit, forgotPasswordError }) => (
  <View style={uFlexGrow}>
    <Formik
      initialValues={{ email: '' }}
      onSubmit={onSubmit}
      validationSchema={forgotPasswordValidationRules}
    >
      {({ handleSubmit }) => (
        <>
          <Text style={[uTextBaseSize, uTextWhite]}>{$t('auth.forgotPasswordIntro')}</Text>
          <View style={[uFlexGrow, uGapTopLg]}>
            <Field
              name="email"
              component={TextInputField}
              placeholder={$t('auth.enterEmail')}
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="email"
            />
            <ErrorText error={!!forgotPasswordError} message={$t('auth.emailDoesNotExist')} />
          </View>
          <TouchableOpacity style={btnBase} onPress={handleSubmit}>
            <Text style={iconBtnTextLabelWhite}>{$t('auth.sendEmail')}</Text>
          </TouchableOpacity>
        </>
      )}
    </Formik>
  </View>
);

ForgotPasswordForm.propTypes = {
  onSubmit: PropTypes.func,
  forgotPasswordError: PropTypes.bool
};
