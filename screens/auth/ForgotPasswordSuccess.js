import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import $t from 'react-native-i18n';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ScreenWrap from '../../components/shared/ScreenWrap';
import { uFlexGrow, uPadTopXl2 } from '../../styles/utilities';
import { screenTitle } from '../../styles/screens';
import { btnBase, iconBtnTextLabelWhite } from '../../styles/buttons';

const ForgotPasswordSuccess = ({ navigation }) => {
  return (
    <ScreenWrap>
      <KeyboardAwareScrollView enableOnAndroid contentContainerStyle={[uFlexGrow, uPadTopXl2]}>
        <Text style={screenTitle}>{$t('auth.forgotPasswordSuccess')}</Text>
        <TouchableOpacity style={btnBase} onPress={() => navigation.navigate('SignIn')}>
          <Text style={iconBtnTextLabelWhite}>{$t('common.ok')}</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </ScreenWrap>
  );
};

ForgotPasswordSuccess.propTypes = {
  navigation: PropTypes.object
};

ForgotPasswordSuccess.navigationOptions = null;

export default ForgotPasswordSuccess;
