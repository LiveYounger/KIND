import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import ForgotPasswordSuccess from '../screens/auth/ForgotPasswordSuccess';
import ResetPasswordSuccess from '../screens/auth/ResetPasswordSuccess';
import WelcomeScreen from '../screens/main/WelcomeScreen';
import { headerStyle } from '../styles/screens';
import variables from '../styles/variables';
import HeaderBackButton from '../components/shared/HeaderBackButton';
import GuestUserButton from '../components/auth/GuestUserButton';

export default createStackNavigator(
  {
    Welcome: {
      screen: WelcomeScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <GuestUserButton navigation={navigation} />
      })
    },
    SignIn: {
      screen: SignInScreen,
      navigationOptions: {
        title: ''
      }
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: {
        title: ''
      }
    },
    ForgotPassword: {
      screen: ForgotPasswordScreen,
      navigationOptions: {
        title: ''
      }
    },
    ForgotPasswordSuccess,
    ResetPassword: ResetPasswordScreen,
    ResetPasswordSuccess
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerStyle: headerStyle,
      headerTintColor: variables.colors.white,
      headerLeft: <HeaderBackButton navigation={navigation} />
    })
  }
);
