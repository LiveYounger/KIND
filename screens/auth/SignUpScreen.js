import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import $t from 'react-native-i18n';
import { useDispatch, useSelector } from 'react-redux';

import { signUp, updateUser } from '../../store/actions/UserActions';
import { setSignUpErrors } from '../../store/actions/ErrorActions';
import { SignUpForm } from '../../components/auth/SignUpForm';
import { signUpErrorsSelector } from '../../store/selectors/ErrorSelector';
import ScreenWrap from '../../components/shared/ScreenWrap';
import { screenTitle } from '../../styles/screens';
import { uFlexGrow, uPadTopXl2 } from '../../styles/utilities';
import { userSelector } from '../../store/selectors/UserSelector';

const SignUpScreen = () => {
  const dispatch = useDispatch();

  const user = useSelector(userSelector());

  const handleSignUp = data => {
    if (user?.id) dispatch(updateUser({ ...data, id: user.id }));
    else dispatch(signUp(data));
  };

  const handleSetSignUpErrors = data => dispatch(setSignUpErrors(data));

  const signUpErrors = useSelector(signUpErrorsSelector());

  useEffect(() => {
    return () => handleSetSignUpErrors({});
  }, []);

  return (
    <ScreenWrap>
      <KeyboardAwareScrollView contentContainerStyle={[uFlexGrow, uPadTopXl2]}>
        <Text style={screenTitle}>{$t('auth.createAccount')}</Text>

        <SignUpForm onSubmit={handleSignUp} signUpErrors={signUpErrors} />
      </KeyboardAwareScrollView>
    </ScreenWrap>
  );
};
SignUpScreen.navigationOptions = {
  title: $t('common.back')
};

export default SignUpScreen;
