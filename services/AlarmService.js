import { Platform } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import store from '../store';
import audioPlayerService from './AudioPlayerService';
import { ALARM_PLAYING_SET } from '../store/actionTypes/AlarmSongActionTypes';
import { ALARM_OPTIONS_SET } from '../store/actionTypes/AlarmActionTypes';
import { formatSoundToTrackObject } from '../helpers/audioHelper';
import { SET_CURRENT_AUDIO } from '../store/actionTypes/AudioPlayerTypes';
import * as Notifications from 'expo-notifications';
import TrackPlayer from 'react-native-track-player';
import AsyncStorage from '@react-native-community/async-storage';

class AlarmService {
  MINUTES_EARLIER = 15;
  autoStopTimeout = null;
  startAlarmClock = async item => {
    const soundToBePlayed = item.sounds[0];
    if (soundToBePlayed) {
      if (!this.autoStopTimeout) this.setAutostopTimeout(soundToBePlayed.duration_seconds * 1000);
    }
    store.dispatch({
      type: SET_CURRENT_AUDIO,
      payload: formatSoundToTrackObject(soundToBePlayed, item)
    });
    store.dispatch({
      type: ALARM_PLAYING_SET,
      payload: true
    });
    await audioPlayerService.setupAlarmSongs(this.playlist);
    await audioPlayerService.play(soundToBePlayed.id);
    await TrackPlayer.play();
  };

  setAutostopTimeout = timeout => {
    if (Platform.OS === 'android') {
      this.autoStopTimeout = BackgroundTimer.setTimeout(() => {
        console.log('AUTOSTOP TIMEOUT CALLED');
        this.stopAlarmClock();
      }, timeout);
    } else {
      BackgroundTimer.start();
      setTimeout(() => {
        console.log('AUTOSTOP TIMEOUT CALLED');
        this.stopAlarmClock();
      }, timeout);
      BackgroundTimer.stop();
    }
  };

  clearAutoStopTimeout = () => {
    if (Platform.OS === 'android') {
      BackgroundTimer.clearTimeout(this.autoStopTimeout);
    } else {
      clearTimeout(this.autoStopTimeout);
    }
  };

  getNextAlarmType = () => {
    return this.nextAlarmType;
  };

  stopAlarmClock = async () => {
    if (this.autoStopTimeout) {
      console.log('CLEAR AUTOSTOP TIMEOUT');
      this.clearAutoStopTimeout();
    }
    await audioPlayerService.pause();
    store.dispatch({
      type: ALARM_PLAYING_SET,
      payload: false
    });
    if (this.nextAlarmType === 'SLEEP') {
      await this.saveBedtimeOptions({
        ...this.bedTimeOptions,
        lastPlayedSoundIndex: this.nextIndex
      });
      store.dispatch({
        type: ALARM_OPTIONS_SET,
        payload: {
          alarmType: this.nextAlarmType,
          options: {
            ...this.bedTimeOptions,
            lastPlayedSoundIndex: this.nextIndex
          }
        }
      });
    } else {
      await this.saveWakeUpOptions({
        ...this.wakeUpOptions,
        lastPlayedSoundIndex: this.nextIndex
      });
      store.dispatch({
        type: ALARM_OPTIONS_SET,
        payload: {
          alarmType: this.nextAlarmType,
          options: {
            ...this.wakeUpOptions,
            lastPlayedSoundIndex: this.nextIndex
          }
        }
      });
    }
  };

  saveBedtimeOptions = async options => {
    console.log('SAVING BEDTIME OPTIONS');
    await AsyncStorage.setItem('BEDTIME_OPTIONS', JSON.stringify(options));
  };

  saveWakeUpOptions = async options => {
    console.log('SAVING WAKEUP OPTIONS');
    await AsyncStorage.setItem('WAKEUP_OPTIONS', JSON.stringify(options));
  };

  getBedtimeOptions = async () => {
    let options = JSON.parse(await AsyncStorage.getItem('BEDTIME_OPTIONS'));
    console.log('BEDTIME_OPTIONS', options);
    return options;
  };

  getWakeUpOptions = async () => {
    let options = JSON.parse(await AsyncStorage.getItem('WAKEUP_OPTIONS'));
    console.log('WAKEUP_OPTIONS', options);
    return options;
  };

  setAlarm = async (songs, bedTimeOptions, wakeUpOptions, isPremiumUser) => {
    console.log('SET ALARM BEGIN');
    this.bedTimeOptions = await this.getBedtimeOptions();
    this.wakeUpOptions = await this.getWakeUpOptions();

    this.songs = songs;
    let bedTimeDate = bedTimeOptions.time ? new Date(bedTimeOptions.time) : null;

    let wakeUpTimeDate = wakeUpOptions.time ? new Date(wakeUpOptions.time) : null;
    const currnetDate = new Date();

    let bedOptions = { ...bedTimeOptions };
    let wakeUpOption = { ...wakeUpOptions };

    bedOptions.time = bedTimeOptions.isActive ? bedTimeOptions.time : null;
    wakeUpOption.time = wakeUpOptions.isActive ? wakeUpOptions.time : null;

    let nextAlarmType;
    if (!bedOptions.time && !wakeUpOption.time) {
      return;
    }
    if (bedOptions.time && !wakeUpOption.time) {
      nextAlarmType = 'SLEEP';
      bedTimeDate.setDate(currnetDate.getDate());
      bedTimeDate.setMonth(currnetDate.getMonth());
      bedTimeDate.setFullYear(currnetDate.getFullYear());
      bedTimeDate = new Date(bedTimeDate.getTime() - 30 * 60 * 1000);
    }
    if (!bedOptions.time && wakeUpOption.time) {
      nextAlarmType = 'WAKE';
      wakeUpTimeDate.setDate(currnetDate.getDate());
      wakeUpTimeDate.setMonth(currnetDate.getMonth());
      wakeUpTimeDate.setFullYear(currnetDate.getFullYear());
      wakeUpTimeDate = new Date(wakeUpTimeDate.getTime() - this.MINUTES_EARLIER * 60 * 1000);
    }

    if (!nextAlarmType) {
      bedTimeDate.setDate(currnetDate.getDate());
      bedTimeDate.setMonth(currnetDate.getMonth());
      bedTimeDate.setFullYear(currnetDate.getFullYear());
      bedTimeDate = new Date(bedTimeDate.getTime() - 30 * 60 * 1000);

      wakeUpTimeDate.setDate(currnetDate.getDate());
      wakeUpTimeDate.setMonth(currnetDate.getMonth());
      wakeUpTimeDate.setFullYear(currnetDate.getFullYear());
      wakeUpTimeDate = new Date(wakeUpTimeDate.getTime() - this.MINUTES_EARLIER * 60 * 1000);
    }

    if (bedTimeDate?.getTime() < currnetDate) {
      bedTimeDate = new Date(bedTimeDate.getTime() + 24 * 3600 * 1000);
    }

    if (wakeUpTimeDate?.getTime() < currnetDate) {
      wakeUpTimeDate = new Date(wakeUpTimeDate.getTime() + 24 * 3600 * 1000);
    }
    if (!nextAlarmType) {
      nextAlarmType = bedTimeDate.getTime() < wakeUpTimeDate.getTime() ? 'SLEEP' : 'WAKE';
    }

    console.log('NEXT ALARM TYPE =======================', nextAlarmType);

    this.nextAlarmType = nextAlarmType;
    let time = nextAlarmType === 'SLEEP' ? bedTimeDate.getTime() : wakeUpTimeDate.getTime();

    const isBedtime = nextAlarmType === 'SLEEP' ? true : false;
    const playlistFilter = songs.filter(song => song.is_bedtime === isBedtime);
    let playlist = [];
    if (!isPremiumUser) {
      playlistFilter.forEach(song => {
        if (!song.is_premium) {
          playlist.push(song);
        }
      });
    } else {
      playlist = playlistFilter;
    }
    this.playlist = playlist;
    const previousAlarmSongIndex =
      nextAlarmType === 'SLEEP'
        ? this.bedTimeOptions.lastPlayedSoundIndex
        : this.wakeUpOptions.lastPlayedSoundIndex;

    console.log('PREVIOUS INDEX', previousAlarmSongIndex);
    let nextIndex = -1;
    if (previousAlarmSongIndex >= 0 && previousAlarmSongIndex < playlist.length - 1) {
      nextIndex = previousAlarmSongIndex + 1;
    } else nextIndex = 0;

    console.log('NEXT INDEX', nextIndex);

    this.nextIndex = nextIndex;
    let backgroundTimerTime = time - currnetDate.getTime();
    if (Platform.OS === 'android') {
      if (nextAlarmType === 'SLEEP') {
        if (this.sleepAlarmIntervalId) {
          BackgroundTimer.clearTimeout(this.sleepAlarmIntervalId);
        }
        await Notifications.cancelAllScheduledNotificationsAsync();
        const notificationTime = backgroundTimerTime / 1000 - 15 * 60;
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Good evening 🌙',
            body: 'Your bedtime is in 45 minutes. Make sure the app is running in the background.',
            data: { data: '' }
          },
          trigger: { seconds: notificationTime }
        });
        this.sleepAlarmIntervalId = BackgroundTimer.setTimeout(() => {
          this.startAlarmClock(playlist[nextIndex]);
        }, backgroundTimerTime);
      } else {
        if (this.wakeUpAlarmIntervalId) {
          BackgroundTimer.clearTimeout(this.wakeUpAlarmIntervalId);
        }
        await Notifications.cancelAllScheduledNotificationsAsync();
        const wakeUpNotificationTime = backgroundTimerTime / 1000;
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Good morning ☀',
            body:
              'It\'s time to wake up in 15 minutes. Make sure the app is running in the background.',
            data: { data: '' }
          },
          trigger: { seconds: wakeUpNotificationTime }
        });
        this.wakeUpAlarmIntervalId = BackgroundTimer.setTimeout(() => {
          this.startAlarmClock(playlist[nextIndex]);
        }, backgroundTimerTime);
      }
    } else {
      BackgroundTimer.start();
      if (nextAlarmType === 'SLEEP') {
        if (this.sleepAlarmIntervalId) {
          clearTimeout(this.sleepAlarmIntervalId);
        }
        await Notifications.cancelAllScheduledNotificationsAsync();
        const notificationTime = backgroundTimerTime / 1000 - 15 * 60;
        console.log('NOTIFICATION TIME SECS', notificationTime);
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Good evening 🌙',
            body: 'Your bedtime is in 45 minutes. Make sure the app is running in the background.',
            data: { data: '' }
          },
          trigger: { seconds: notificationTime }
        });
        this.sleepAlarmIntervalId = setTimeout(() => {
          this.startAlarmClock(playlist[nextIndex]);
        }, backgroundTimerTime);
      } else {
        if (this.wakeUpAlarmIntervalId) {
          clearTimeout(this.wakeUpAlarmIntervalId);
        }
        await Notifications.cancelAllScheduledNotificationsAsync();
        const wakeUpNotificationTime = backgroundTimerTime / 1000;
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Good morning ☀',
            body:
              'It\'s time to wake up in 15 minutes. Make sure the app is running in the background.',
            data: { data: '' }
          },
          trigger: { seconds: wakeUpNotificationTime }
        });
        this.wakeUpAlarmIntervalId = setTimeout(() => {
          this.startAlarmClock(playlist[nextIndex]);
        }, backgroundTimerTime);
      }
      BackgroundTimer.stop();
    }
    console.log('backgroundTimerTime', backgroundTimerTime, 'nextAlarmType', nextAlarmType);
    return {
      playlist,
      isBedtime: nextAlarmType === 'SLEEP',
      nextIndex,
      backgroundTimerTime
    };
  };

  removeAlarms = async () => {
    if (this.backgroundPlayerTimeout) {
      clearTimeout(this.backgroundPlayerTimeout);
    }
    if (this.intervalId) {
      BackgroundTimer.clearInterval(this.intervalId);
    }
  };
}

const alarmService = new AlarmService();
export default alarmService;
