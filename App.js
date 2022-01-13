import React from 'react';
import {
  AppState,
  BackHandler,
  StatusBar,
  StyleSheet,
  View,
  YellowBox,
  Text,
  TextInput,
  Platform
} from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as Icon from '@expo/vector-icons';
import BackgroundTimer from 'react-native-background-timer';

import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { InAppNotificationProvider } from 'react-native-in-app-notification';

import store, { persistor } from './store';
import NavigationService from './services/NavigationService';
import AppNavigator from './navigation/AppNavigator';
import NetworkInterceptor from './screens/NetworkInterceptor';
import ConfirmExitModal from './components/shared/modal/ConfirmExitModal';
// eslint-disable-next-line no-unused-vars
import sceneService from './services/SceneService';
import PrefersHomeIndicatorAutoHidden from 'react-native-home-indicator';
import { PersistGate } from 'redux-persist/integration/react';

import ScreenWrap from './components/shared/ScreenWrap';
import AsyncStorage from '@react-native-community/async-storage';
import TrackPlayer from 'react-native-track-player';

YellowBox.ignoreWarnings(['react-native-i18n module is not correctly linked']);
console.disableYellowBox = true;
class App extends React.Component {
  state = {
    isLoadingComplete: false,
    confirmExit: false
  };

  static propTypes = {
    skipLoadingScreen: PropTypes.bool
  };

  saveSceneVolume = async () => {
    let volume = await sceneService.getSceneVolume();
    await AsyncStorage.setItem('savedVolume', JSON.stringify(volume));
  };

  restoreSceneVolume = async () => {
    let savedVolume = JSON.parse(await AsyncStorage.getItem('savedVolume'));
    if (savedVolume) await sceneService.setSceneVolume(savedVolume);
  };

  setBackgroundTimers = async () => {
    const time = await AsyncStorage.getItem('backgroundTimeMilis');
    if (Platform.OS === 'android') {
      this.intervalId = BackgroundTimer.setInterval(async () => {
        await this.saveSceneVolume();
        sceneService.setSceneVolumeWithoutSaving(0);
      }, parseInt(time));
    } else {
      //does not work on android
      BackgroundTimer.start();
      clearTimeout(this.backgroundPlayerTimeout);
      this.backgroundPlayerTimeout = setTimeout(async () => {
        await this.saveSceneVolume();
        sceneService.setSceneVolumeWithoutSaving(0);
      }, parseInt(time));
      BackgroundTimer.stop();
    }
  };

  removeBackgroundTimers = async () => {
    if (this.backgroundPlayerTimeout) {
      clearTimeout(this.backgroundPlayerTimeout);
    }
    if (this.intervalId) {
      BackgroundTimer.clearInterval(this.intervalId);
    }
  };

  shouldPlayOutside = async () => {
    let play = await AsyncStorage.getItem('playOutside');
    return play;
  };

  handleAppBackgorund = async () => {
    let shouldPlay = await this.shouldPlayOutside();
    if (shouldPlay == 'false') {
      sceneService.pauseScene();
    }
  };

  componentDidMount() {
    Text.defaultProps = {
      allowFontScaling: false
    };
    TextInput.defaultProps = {
      allowFontScaling: false
    };
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.setState(state => ({ confirmExit: !state.confirmExit }));
      return true;
    });
    AppState.addEventListener('change', async state => {
      if (state === 'background' || state === 'inactive') {
        // this.handleAppBackgorund();
        this.setBackgroundTimers();
      } else {
        this.removeBackgroundTimers();
        sceneService.setSceneVolumeWithoutSaving(await sceneService.getVolume());
        // this.restoreSceneVolume();
        const isTrackPlaying = (await TrackPlayer.getState()) === TrackPlayer.STATE_PLAYING;
        if (
          !isTrackPlaying &&
          !['Welcome', 'SignUp', 'SignIn'].includes(NavigationService.getCurrentRoute()) &&
          sceneService.isScenePaused
        ) {
          sceneService.playScene(sceneService.getSceneAudio(await sceneService.getActiveScene()));
        }
      }
    });
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <PersistGate loading={<ScreenWrap />} persistor={persistor}>
            <InAppNotificationProvider height={150}>
              <NetworkInterceptor>
                <StatusBar hidden />
                <PrefersHomeIndicatorAutoHidden />
                <View style={styles.container}>
                  <ConfirmExitModal
                    isVisible={this.state.confirmExit}
                    closeModal={() => this.setState({ confirmExit: false })}
                    exitApp={this.handleExitApp}
                  />
                  <AppNavigator
                    ref={navigatorRef => {
                      NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                  />
                </View>
              </NetworkInterceptor>
            </InAppNotificationProvider>
          </PersistGate>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png')
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        'urbanist-black': require('./assets/fonts/Urbanist-Black.ttf'),
        'urbanist-bold': require('./assets/fonts/Urbanist-Bold.ttf'),
        'urbanist-extrabold': require('./assets/fonts/Urbanist-ExtraBold.ttf'),
        'urbanist-semibold': require('./assets/fonts/Urbanist-SemiBold.ttf'),
        'urbanist-regular': require('./assets/fonts/Urbanist-Regular.ttf')
      })
    ]);
  };

  _handleLoadingError = error => {
    console.log(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1
  }
});

export default App;
