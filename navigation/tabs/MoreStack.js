import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import MoreTabScreen from '../../screens/main/MoreTabScreen';
import CategoryScreen from '../../screens/main/CategoryScreen';
import ActiveCategoryItemScreen from '../../screens/main/ActiveCategoryItemScreen';
import SleepTimerSetupScreen from '../../screens/main/SleepTimerSetupScreen';
import SongListScreen from '../../screens/main/SongListScreen';
import AlarmSetupScreen from '../../screens/main/AlarmSetupScreen';
import ShopScreen from '../../screens/main/ShopScreen';
import { uHidden } from '../../styles/utilities';
import HeaderBackButton from '../../components/shared/HeaderBackButton';
import { headerStyle } from '../../styles/screens';
import variables from '../../styles/variables';
import $t from 'react-native-i18n';
import SearchActiveIcon from '../../assets/icons/search-active.svg';
import SearchInactiveIcon from '../../assets/icons/search-inactive.svg';
import TabBarIcon from '../../components/TabBarIcon';
import HealStack from './HealStack';
import EditProfile from '../../screens/main/profile/EditProfile';
import ForgotPasswordScreen from '../../screens/auth/ForgotPasswordScreen';
import ResetPasswordScreen from '../../screens/auth/ResetPasswordScreen';
import ChangePassword from '../../screens/main/profile/ChangePassword';

const MoreStack = createStackNavigator(
  {
    MoreTabScreen: {
      screen: MoreTabScreen,
      navigationOptions: () => ({
        headerBackTitleStyle: uHidden,
        headerShown: false
      })
    },
    Heal: {
      screen: HealStack,
      navigationOptions: ({ navigation }) => ({
        headerBackTitleStyle: uHidden,
        headerLeft: <HeaderBackButton navigation={navigation} />
      })
    },
    CategoryScreen: {
      screen: CategoryScreen,
      navigationOptions: () => ({
        headerBackTitleStyle: uHidden,
        headerShown: false
      })
    },
    ActiveCategoryItem: {
      screen: ActiveCategoryItemScreen,
      navigationOptions: ({ navigation }) => ({
        headerBackTitleStyle: uHidden,
        headerLeft: <HeaderBackButton navigation={navigation} />
      })
    },
    SleepTimerSetup: {
      screen: SleepTimerSetupScreen,
      navigationOptions: () => ({
        headerBackTitleStyle: uHidden,
        headerShown: false
      })
    },
    SongList: {
      screen: SongListScreen,
      navigationOptions: () => ({
        headerBackTitleStyle: uHidden,
        headerShown: false
      })
    },
    AlarmSetup: {
      screen: AlarmSetupScreen,
      navigationOptions: () => ({
        headerBackTitleStyle: uHidden,
        headerShown: false
      })
    },
    Shop: {
      screen: ShopScreen,
      navigationOptions: () => ({
        headerBackTitleStyle: uHidden,
        headerLeft: null,
        headerShown: false
      })
    },
    EditProfileMore: {
      screen: EditProfile,
      navigationOptions: ({ navigation }) => ({
        headerBackTitleStyle: uHidden,
        headerLeft: <HeaderBackButton navigation={navigation} />
      })
    },
    ForgotPasswordSuccessMore: ForgotPasswordScreen,
    ResetPasswordScreenMore: ResetPasswordScreen,
    ResetPasswordSuccessMore: ResetPasswordScreen,
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions: ({ navigation }) => ({
        headerBackTitleStyle: uHidden,
        headerLeft: <HeaderBackButton navigation={navigation} />
      })
    }
  },
  {
    defaultNavigationOptions: {
      headerTransparent: true,
      headerStyle: headerStyle,
      headerTintColor: variables.colors.white
    }
  }
);

/* eslint-disable react/prop-types, react/display-name */
MoreStack.navigationOptions = {
  tabBarLabel: $t('main.more'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon Image={SearchActiveIcon} InactiveImage={SearchInactiveIcon} focused={focused} />
  )
};

export default MoreStack;
