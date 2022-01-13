import React from 'react';
import { Text } from 'react-native';
import $t from 'react-native-i18n';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { passwordReset } from '../../store/actions/UserActions';
import { ResetPasswordForm } from '../../components/auth/ResetPasswordForm';
import { resetPasswordErrorSelector } from '../../store/selectors/ErrorSelector';
import ScreenWrap from '../../components/shared/ScreenWrap';
import { uFlexGrow, uPadBottomXxl } from '../../styles/utilities';
import { screenPadTop, screenTitle } from '../../styles/screens';

const ResetPasswordScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handlePasswordReset = data => dispatch(passwordReset(data));
  const resetPasswordError = useSelector(resetPasswordErrorSelector());

  const handleSubmit = resetPasswordData => {
    handlePasswordReset({
      ...resetPasswordData,
      token: navigation.getParam('forgot_password_token')
    });
  };

  return (
    <ScreenWrap>
      <KeyboardAwareScrollView contentContainerStyle={[uFlexGrow, screenPadTop, uPadBottomXxl]}>
        <Text style={screenTitle}>{$t('auth.resetPassword')}</Text>

        <ResetPasswordForm onSubmit={handleSubmit} resetPasswordError={resetPasswordError} />
      </KeyboardAwareScrollView>
    </ScreenWrap>
  );
};

ResetPasswordScreen.propTypes = {
  navigation: PropTypes.object
};

export default ResetPasswordScreen;
