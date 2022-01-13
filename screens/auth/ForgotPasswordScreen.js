import React, { useEffect, useCallback } from 'react';
import { Text } from 'react-native';
import $t from 'react-native-i18n';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { ForgotPasswordForm } from '../../components/auth/ForgotPasswordForm';
import { passwordForgot } from '../../store/actions/UserActions';
import { setForgotPasswordError } from '../../store/actions/ErrorActions';
import { forgotPasswordErrorSelector } from '../../store/selectors/ErrorSelector';
import ScreenWrap from '../../components/shared/ScreenWrap';
import { uFlexGrow, uPadTopXl2 } from '../../styles/utilities';
import { screenTitle } from '../../styles/screens';

const ForgotPasswordScreen = () => {
  const dispatch = useDispatch();

  const handlePasswordForgot = useCallback(data => dispatch(passwordForgot(data)));
  const handleSetForgotPasswordError = data => dispatch(setForgotPasswordError(data));

  const forgotPasswordError = useSelector(forgotPasswordErrorSelector());

  useEffect(() => {
    return () => handleSetForgotPasswordError(false);
  }, []);

  return (
    <ScreenWrap>
      <KeyboardAwareScrollView contentContainerStyle={[uFlexGrow, uPadTopXl2]}>
        <Text style={screenTitle}>{$t('auth.forgotPassword')}</Text>

        <ForgotPasswordForm
          onSubmit={handlePasswordForgot}
          forgotPasswordError={forgotPasswordError}
        />
      </KeyboardAwareScrollView>
    </ScreenWrap>
  );
};

ForgotPasswordScreen.navigationOptions = {
  title: 'Forgot Password'
};

export default ForgotPasswordScreen;
