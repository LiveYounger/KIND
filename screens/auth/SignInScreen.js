import React, { useCallback } from 'react';
import { Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import $t from 'react-native-i18n';
import PropTypes from 'prop-types';

import { login } from '../../store/actions/UserActions';
import { SignInForm } from '../../components/auth/SignInForm';
import { signInErrorSelector } from '../../store/selectors/ErrorSelector';
import ScreenWrap from '../../components/shared/ScreenWrap';
import { uFlexGrow, uPadTopXl2 } from '../../styles/utilities';
import { screenTitle } from '../../styles/screens';

const SignInScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogin = useCallback(data => dispatch(login(data)), [dispatch]);
  const signInError = useSelector(signInErrorSelector());

  return (
    <ScreenWrap>
      <KeyboardAwareScrollView contentContainerStyle={[uFlexGrow, uPadTopXl2]}>
        <Text style={screenTitle}>{$t('auth.login')}</Text>
        <SignInForm onSubmit={handleLogin} signInError={signInError} navigation={navigation} />
      </KeyboardAwareScrollView>
    </ScreenWrap>
  );
};

SignInScreen.navigationOptions = {
  title: $t('common.back')
};

SignInScreen.propTypes = {
  navigation: PropTypes.object
};

export default SignInScreen;
