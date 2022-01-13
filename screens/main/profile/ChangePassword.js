import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import $t from 'react-native-i18n';
import { Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ChangePasswordForm } from '../../../components/profile/ChangePasswordForm';
import { changePassword } from '../../../store/actions/UserActions';
import { changePasswordErrorSelector } from '../../../store/selectors/ErrorSelector';
import ScreenWrap from '../../../components/shared/ScreenWrap';
import { uFlexGrow, uPadBottomXxl, uPadTopXl } from '../../../styles/utilities';
import { screenTitle } from '../../../styles/screens';

const ChangePassword = () => {
  const dispatch = useDispatch();

  const handleChangePassword = useCallback(data => dispatch(changePassword(data)));

  const invalidOldPasswordError = useSelector(changePasswordErrorSelector());

  return (
    <ScreenWrap>
      <KeyboardAwareScrollView contentContainerStyle={[uFlexGrow, uPadTopXl, uPadBottomXxl]}>
        <Text style={screenTitle}>{$t('auth.changePass')}</Text>
        <ChangePasswordForm
          onSubmit={handleChangePassword}
          invalidOldPasswordError={invalidOldPasswordError}
        />
      </KeyboardAwareScrollView>
    </ScreenWrap>
  );
};

export default ChangePassword;
