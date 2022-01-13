import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import $t from 'react-native-i18n';

import ForYouScreen from '../../screens/main/ForYouScreen';
import EditProfile from '../../screens/main/profile/EditProfile';
import ChangePassword from '../../screens/main/profile/ChangePassword';
import IconLiveYounger from '../../assets/icons/live-younger-logo.svg';
import TabBarIcon from '../../components/TabBarIcon';
import { headerStyle } from '../../styles/screens';
import variables from '../../styles/variables';
import HeaderBackButton from '../../components/shared/HeaderBackButton';

const ForYouStack = createStackNavigator(
  {
    ForYou: {
      screen: ForYouScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    EditProfile,
    ChangePassword
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

/* eslint-disable react/prop-types, react/display-name */
ForYouStack.navigationOptions = {
  tabBarLabel: $t('main.forYou'),
  tabBarIcon: ({ focused }) => <TabBarIcon Image={IconLiveYounger} focused={focused} />
};

export default ForYouStack;
