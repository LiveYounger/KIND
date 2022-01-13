import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import MeditateScreen from '../../screens/main/MeditateScreen';
import $t from 'react-native-i18n';
import IconMeditate from '../../assets/icons/meditate.svg';
import TabBarIcon from '../../components/TabBarIcon';
import { headerStyle } from '../../styles/screens';
import variables from '../../styles/variables';
import ActiveMeditationScreen from '../../screens/main/ActiveMeditationScreen';
import { uHidden } from '../../styles/utilities';
import HeaderBackButton from '../../components/shared/HeaderBackButton';

const MeditateStack = createStackNavigator(
  {
    Meditate: {
      screen: MeditateScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    ActiveMeditation: {
      screen: ActiveMeditationScreen,
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
MeditateStack.navigationOptions = {
  tabBarLabel: $t('main.meditate'),
  tabBarIcon: ({ focused }) => <TabBarIcon Image={IconMeditate} focused={focused} />
};

export default MeditateStack;
