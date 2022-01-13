import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types';

import { TextInputField } from '../shared/FormFields';
import { signUpValidationRules } from '../../validation/auth';
import $t from 'react-native-i18n';
import ErrorText from '../shared/Text/ErrorText';
import { btnBase, iconBtnTextLabelWhite } from '../../styles/buttons';
import {
  uFlexGrow,
  uGapHorLg,
  uTextBaseSize,
  uTextCenter,
  uTextSm,
  uTextWhite
} from '../../styles/utilities';

export const SignUpForm = ({ onSubmit, signUpErrors }) => (
  <View style={uFlexGrow}>
    <Formik
      initialValues={{
        first_name: '',
        email: '',
        password: ''
      }}
      onSubmit={onSubmit}
      validationSchema={signUpValidationRules}
    >
      {({ handleSubmit }) => (
        <>
          <View style={uFlexGrow}>
            <Field
              name="first_name"
              component={TextInputField}
              placeholder={$t('auth.enterFirstName')}
            />
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
            {!!signUpErrors.username && (
              <ErrorText error={!!signUpErrors.username} message={signUpErrors.username} />
            )}
            <Field
              name="password"
              component={TextInputField}
              secureTextEntry
              placeholder={$t('auth.enterPassword')}
            />
            <Text style={[uTextWhite, uTextBaseSize, uTextCenter, uTextSm, uGapHorLg]}>
              {$t('auth.forgotPasswordText')}
            </Text>
          </View>

          <TouchableOpacity style={btnBase} onPress={handleSubmit}>
            <Text style={iconBtnTextLabelWhite}>{$t('auth.signUp')}</Text>
          </TouchableOpacity>
        </>
      )}
    </Formik>
  </View>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func,
  signUpErrors: PropTypes.object
};
