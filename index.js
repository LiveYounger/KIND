import { registerRootComponent } from 'expo';
import TrackPlayer from 'react-native-track-player';
import { AppRegistry, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import App from './App';
import AsyncStorage from '@react-native-community/async-storage';
import audioPlayerService from './services/AudioPlayerService';
import store from './store';
import { formatSoundToTrackObject } from './helpers/audioHelper';

const MyHeadlessTask = async () => {
  const alarmConfig = await AsyncStorage.getItem('ALARM_SETTINGS');
  const { playlist, nextIndex, isBedtime } = JSON.parse(alarmConfig);
  if (!isBedtime) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Good morning',
        body: 'Tap here to stop alarm',
        data: { data: '' }
      },
      trigger: { seconds: 1 }
    });
  }

  store.dispatch({
    type: 'SET_CURRENT_AUDIO',
    payload: formatSoundToTrackObject(playlist[nextIndex].sounds[0], playlist[nextIndex])
  });
  store.dispatch({
    type: 'ALARM_PLAYING_SET',
    payload: true
  });
  await audioPlayerService.setupAlarmSongs(playlist);
  await audioPlayerService.play(playlist[nextIndex].sounds[0].id);
  await TrackPlayer.play();
};

registerRootComponent(App);
if (Platform.OS === 'android') {
  AppRegistry.registerHeadlessTask('Alarm', () => MyHeadlessTask);
}
TrackPlayer.registerPlaybackService(() => require('./services/track-player-remote-services'));
