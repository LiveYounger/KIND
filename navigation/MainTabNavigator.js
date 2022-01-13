import React from 'react';
import { BottomTabBar, createBottomTabNavigator } from 'react-navigation-tabs';
import $t from 'react-native-i18n';

import ForYouStack from './tabs/ForYouStack';
import SleepStack from './tabs/SleepStack';
import MeditateStack from './tabs/MeditateStack';
import MoreStack from './tabs/MoreStack';
import LibraryStack from './tabs/HealStack';

import variables from '../styles/variables';
import { bottomTabBar, bottomTabBarWrap, headerStyle, tabBarActive } from '../styles/screens';
import { createStackNavigator } from 'react-navigation-stack';
import InfoScreen from '../screens/main/InfoScreen';
import UnlockPremiumScreen from '../screens/main/UnlockPremiumScreen';
import AudioPlayerScreen from '../screens/main/AudioPlayerScreen';
import { uHidden } from '../styles/utilities';
import HeaderBackButton from '../components/shared/HeaderBackButton';
import { useSelector } from 'react-redux';
import { currentAudioSelector } from '../store/selectors/AudioPlayerSelector';
import ScenePreviewScreen from '../screens/main/ScenePreviewScreen';
import { BlurView } from 'expo-blur';
import { sceneFocusedSelector } from '../store/selectors/ScenesSelector';
import DeactivateAlarmScreen from '../screens/main/DeactivateAlarmScreen';
import ShopItemWebViewScreen from '../screens/main/ShopItemWebViewScreen';

const TabBarComponent = props => {
  const isPlayerVisible = useSelector(currentAudioSelector());
  const sceneFocused = useSelector(sceneFocusedSelector());

  return sceneFocused ? null : (
    <BlurView
      intensity={97}
      tint="dark"
      style={[bottomTabBarWrap, isPlayerVisible && tabBarActive]}
    >
      <BottomTabBar style={bottomTabBar} {...props} />
    </BlurView>
  );
};

const BottomTabNavigator = createBottomTabNavigator(
  {
    ForYouStack,
    SleepStack,
    MeditateStack,
    Library: LibraryStack,
    MoreStack
  },
  {
    resetOnBlur: true,
    tabBarOptions: {
      style: bottomTabBar,
      activeTintColor: variables.colors.white,
      keyboardHidesTabBar: true
    },
    tabBarComponent: TabBarComponent
  }
);

export default createStackNavigator(
  {
    BottomTabNavigator: BottomTabNavigator,
    Info: InfoScreen,
    DeactivateAlarm: DeactivateAlarmScreen,
    ScenePreview: ScenePreviewScreen,
    UnlockPremium: UnlockPremiumScreen,
    ShopItemWebView: {
      screen: ShopItemWebViewScreen
    },
    AudioPlayerStack: {
      screen: AudioPlayerScreen,
      navigationOptions: ({ navigation }) => ({
        headerShown: true,
        headerTitle: $t('audioPlayer.currentlyPlaying'),
        headerBackTitleStyle: uHidden,
        headerLeft: <HeaderBackButton navigation={navigation} />
      })
    }
  },
  {
    mode: 'modal',
    defaultNavigationOptions: {
      headerShown: false,
      headerTransparent: true,
      headerStyle: headerStyle,
      headerTintColor: variables.colors.white
    }
  }
);
