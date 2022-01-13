import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HealScreen from '../../screens/main/HealScreen';
import $t from 'react-native-i18n';
import HealIcon from '../../assets/icons/spa.svg';
import TabBarIcon from '../../components/TabBarIcon';
import ActiveLibraryItemScreen from '../../screens/main/ActiveLibraryItemScreen';
import { headerStyle } from '../../styles/screens';
import variables from '../../styles/variables';
import { uHidden } from '../../styles/utilities';
import HeaderBackButton from '../../components/shared/HeaderBackButton';

const HealStack = createStackNavigator(
  {
    Heal: {
      screen: HealScreen,
      navigationOptions: () => ({
        headerShown: false
      })
    },
    ActiveLibraryItem: {
      screen: ActiveLibraryItemScreen,
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
HealStack.navigationOptions = {
  headerTransparent: true,
  tabBarLabel: $t('main.heal'),
  tabBarIcon: ({ focused }) => <TabBarIcon Image={HealIcon} focused={focused} />
};

export default HealStack;
