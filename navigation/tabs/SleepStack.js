import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import SleepScreen from '../../screens/main/SleepScreen';
import $t from 'react-native-i18n';
import IconSleep from '../../assets/icons/sleep.svg';
import TabBarIcon from '../../components/TabBarIcon';
import ActiveSleepScreen from '../../screens/main/ActiveSleepScreen';
import { headerStyle } from '../../styles/screens';
import variables from '../../styles/variables';
import { uHidden } from '../../styles/utilities';
import HeaderBackButton from '../../components/shared/HeaderBackButton';

const SleepStack = createStackNavigator(
  {
    Sleep: {
      screen: SleepScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    ActiveSleep: {
      screen: ActiveSleepScreen,
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
SleepStack.navigationOptions = {
  headerTransparent: true,
  tabBarLabel: $t('main.sleep'),
  tabBarIcon: ({ focused }) => <TabBarIcon Image={IconSleep} focused={focused} />
};

export default SleepStack;
