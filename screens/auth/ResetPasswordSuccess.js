import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import $t from 'react-native-i18n';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ScreenWrap from '../../components/shared/ScreenWrap';
import { uFlexGrow, uPadTopXl } from '../../styles/utilities';
import { screenTitle } from '../../styles/screens';
import { btnBase, iconBtnTextLabelWhite } from '../../styles/buttons';

const ResetPasswordSuccess = ({ navigation }) => {
  return (
    <ScreenWrap>
      <KeyboardAwareScrollView enableOnAndroid contentContainerStyle={[uFlexGrow, uPadTopXl]}>
        <Text style={screenTitle}>{$t('auth.passwordResetSucces')}</Text>
        <TouchableOpacity style={btnBase} onPress={() => navigation.navigate('SignIn')}>
          <Text style={iconBtnTextLabelWhite}>{$t('common.ok')}</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </ScreenWrap>
  );
};

ResetPasswordSuccess.propTypes = {
  navigation: PropTypes.object
};

ResetPasswordSuccess.navigationOptions = null;

export default ResetPasswordSuccess;
