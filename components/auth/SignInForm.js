import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types';

import { TextInputField } from '../shared/FormFields';
import { signInValidationRules } from '../../validation/auth';
import $t from 'react-native-i18n';
import ErrorText from '../shared/Text/ErrorText';
import {
  uFlexGrow,
  uFlexJustifyEnd,
  uFlexRow,
  uGapBottom,
  uTextRight,
  uTextUnderline,
  uTextWhite
} from '../../styles/utilities';
import { btnBase, iconBtnTextLabelWhite } from '../../styles/buttons';

export const SignInForm = ({ onSubmit, signInError, navigation }) => {
  const goToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <View style={[uFlexGrow, uGapBottom]}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={signInValidationRules}
      >
        {({ handleSubmit }) => (
          <>
            <View style={uFlexGrow}>
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
              <Field
                name="password"
                component={TextInputField}
                secureTextEntry
                placeholder={$t('auth.enterPassword')}
              />
              {!!signInError && (
                <ErrorText error={!!signInError} message={$t('auth.invalidCredentials')} />
              )}

              <View style={[uFlexRow, uFlexJustifyEnd]}>
                <Text style={[uTextWhite, uTextRight, uTextUnderline]} onPress={goToForgotPassword}>
                  {$t('auth.forgotPassword')}
                </Text>
              </View>
            </View>

            <TouchableOpacity style={btnBase} onPress={handleSubmit}>
              <Text style={iconBtnTextLabelWhite}>{$t('auth.signIn')}</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

SignInForm.propTypes = {
  onSubmit: PropTypes.func,
  signInError: PropTypes.bool,
  navigation: PropTypes.object
};
