import { createAppContainer } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from './AuthNavigator';

const AppNavigator = createAnimatedSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    AuthStack: AuthNavigator,
    MainStack: MainTabNavigator
  },
  {
    initialRouteName: 'AuthLoading',
    resetOnBlur: false
  }
);

export default createAppContainer(AppNavigator);
