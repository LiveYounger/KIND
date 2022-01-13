import React from 'react';
import { View, Text, Platform } from 'react-native';
import Logo from '../../components/shared/Logo';
import $t from 'react-native-i18n';
import { TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { googleLogin, facebookLogin, appleLogin } from '../../store/actions/UserActions';
import Button from '../../components/shared/Button';
import {
  uFlexJustifyCenter,
  uFlexRow,
  uGapBottom,
  uGapTop,
  uTextBaseSize,
  uTextBlack,
  uTextBold,
  uTextUnderline,
  uTextWhite
} from '../../styles/utilities';
import IconApple from '../../assets/icons/apple.svg';
import IconFacebook from '../../assets/icons/facebook.svg';
import IconGoogle from '../../assets/icons/google.svg';
import IconEnvelope from '../../assets/icons/envelope.svg';
import ScreenWrap from '../../components/shared/ScreenWrap';
import variables from '../../styles/variables';
import { iconBase, iconLg } from '../../styles/icons';
import { btnWhite, iconBtnTextLabelWhite } from '../../styles/buttons';
import { screenContentCenter } from '../../styles/screens';
import { OS_TYPES } from '../../constants';

const WelcomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <ScreenWrap>
      <View style={screenContentCenter}>
        <Logo />
        <Button style={[btnWhite, uGapBottom]} onPress={() => navigation.navigate('SignUp')}>
          <IconEnvelope style={[iconBase, iconLg]} fill={variables.colors.black} />
          <Text style={[iconBtnTextLabelWhite, uTextBlack]}>{$t('auth.continueWithEmail')}</Text>
        </Button>
        <Button icon={IconGoogle} style={uGapBottom} onPress={() => dispatch(googleLogin())}>
          <IconGoogle style={[iconBase, iconLg]} fill={variables.colors.white} />
          <Text style={iconBtnTextLabelWhite}>{$t('auth.continueWithGoogle')}</Text>
        </Button>
        <Button icon={IconFacebook} style={uGapBottom} onPress={() => dispatch(facebookLogin())}>
          <IconFacebook style={[iconBase, iconLg]} fill={variables.colors.white} />
          <Text style={iconBtnTextLabelWhite}>{$t('auth.continueWithFacebook')}</Text>
        </Button>
        {Platform.OS === OS_TYPES.IOS && (
          <Button icon={IconApple} style={uGapBottom} onPress={() => dispatch(appleLogin())}>
            <IconApple style={[iconBase, iconLg]} fill={variables.colors.white} />
            <Text style={iconBtnTextLabelWhite}>{$t('auth.continueWithApple')}</Text>
          </Button>
        )}

        <View style={[uFlexRow, uFlexJustifyCenter, uGapTop]}>
          <Text style={[uTextBaseSize, uTextWhite]}>{$t('auth.haveAccount')} </Text>
          <TouchableHighlight onPress={() => navigation.navigate('SignIn')}>
            <Text style={[uTextBaseSize, uTextWhite, uTextBold, uTextUnderline]}>
              {$t('auth.signIn')}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </ScreenWrap>
  );
};

WelcomeScreen.propTypes = {
  navigation: PropTypes.object
};

export default WelcomeScreen;
