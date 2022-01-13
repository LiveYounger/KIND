import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, SafeAreaView, Text, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import alarmService from '../../services/AlarmService';
import PropTypes from 'prop-types';
import image from '../../assets/images/screen-bg.png';
import { screenContent, screenWrap } from '../../styles/screens';
import HeaderActions from '../../components/shared/HeaderActions';
import IconScenes from '../../assets/icons/theme.svg';
import IconLiveYoungLogo from '../../assets/icons/live-younger-logo-full.svg';
import { uGapHorMd } from '../../styles/utilities';
import { setSceneModalVisible } from '../../store/actions/ScenesActions';
import GestureRecognizer from 'react-native-swipe-gestures';
import variables from '../../styles/variables';
import { iconBase, iconLg } from '../../styles/icons';
import { ActivePlayer } from '../../components/shared/ActiveItemPlayist';
import $t from 'react-native-i18n';
import audioPlayerService from '../../services/AudioPlayerService';
import { setCurrentAudio } from '../../store/actions/AudioPlayerAction';

import {
  alarmSelector,
  bedTimeAlarmSelector,
  wakeUpAlarmSelector
  // alarmSelector
} from '../../store/selectors/AlarmSelector';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TrackPlayer from 'react-native-track-player';
import { currentAudioSelector } from '../../store/selectors/AudioPlayerSelector';
import { is24HourFormat } from 'react-native-device-time-format';
import moment from 'moment';

const DeactivateAlarmScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const wakeUpAlarmOptions = useSelector(wakeUpAlarmSelector());
  const bedTimeAlarmOptions = useSelector(bedTimeAlarmSelector());
  const [alarmType, setAlarmType] = useState(null);
  const [date, setDate] = useState(null);
  const currentAudio = useSelector(currentAudioSelector());
  const [is24, setIs24] = useState(false);
  const alarm = useSelector(alarmSelector());
  // const alarm = useSelector(alarmSelector());
  useEffect(() => {
    (async () => {
      const is = await is24HourFormat();
      setIs24(is);
    })();
  }, []);

  useEffect(
    () => {
      if (!alarm.isAlarmPlaying) {
        navigation.navigate('BottomTabNavigator');
      }
    },
    [alarm]
  );

  useEffect(() => {
    const listener = TrackPlayer.addEventListener(
      'playback-track-changed',
      async ({ track, nextTrack }) => {
        if (!nextTrack && currentAudio && currentAudio.id === track) {
          await audioPlayerService.seekTo(0);
          await audioPlayerService.pause();
        } else {
          const nextAudio = await TrackPlayer.getTrack(nextTrack);
          if (nextAudio) {
            dispatch(setCurrentAudio(nextAudio));
          }
        }
      }
    );

    return () => {
      listener.remove();
    };
  }, []);

  useEffect(() => {
    setAlarmType(alarmService.getNextAlarmType());
    setDate(new Date());
  }, []);

  const formatDateTimeToTime = timestamp => {
    let date = new Date(timestamp);
    return moment(date).format(is24 ? 'HH:mm' : 'hh:mm');
  };

  const getAMPM = timestamp => {
    let date = new Date(timestamp);
    if (!is24) {
      return date?.getHours() >= 12 ? 'PM' : 'AM';
    } else {
      return '';
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  });

  const HeaderActionsData = [
    {
      icon: IconScenes,
      onPress: () => dispatch(setSceneModalVisible(true))
    }
  ];
  return (
    <ImageBackground
      style={screenWrap}
      source={Platform.OS === 'ios' ? { uri: 'screen-bg' } : image}
    >
      <SafeAreaView style={screenContent}>
        <View style={uGapHorMd}>
          <HeaderActions actions={HeaderActionsData} />
        </View>
        <GestureRecognizer
          style={styles.gestureRecognizer}
          onSwipeUp={() => {
            alarmService.stopAlarmClock();
            navigation.navigate('BottomTabNavigator');
          }}
        >
          <IconLiveYoungLogo style={[iconBase, iconLg]} fill={variables.colors.white30} />
          <View style={styles.timeWrap}>
            <View style={styles.timeView}>
              <Text style={styles.timeText}>{formatDateTimeToTime(date)}</Text>
              <Text style={styles.amPmText}>{getAMPM(date)}</Text>
            </View>
            <View style={styles.alarmView}>
              <Text style={styles.alarmText}>
                Alarm set for{' '}
                {alarmType === 'SLEEP'
                  ? formatDateTimeToTime(new Date(bedTimeAlarmOptions.time))
                  : formatDateTimeToTime(new Date(wakeUpAlarmOptions.time))}{' '}
                {alarmType === 'SLEEP'
                  ? getAMPM(new Date(bedTimeAlarmOptions.time))
                  : getAMPM(new Date(wakeUpAlarmOptions.time))}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.stopWrap}
            onPress={() => {
              alarmService.stopAlarmClock();
              navigation.navigate('BottomTabNavigator');
            }}
          >
            <Text style={styles.stopText}>{$t('timers.stop')}</Text>
          </TouchableOpacity>
        </GestureRecognizer>
      </SafeAreaView>
      <ActivePlayer navigation={navigation} style={styles.player} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  alarmText: {
    color: variables.colors.white30,
    fontFamily: variables.fontFamily.extrabold,
    fontSize: variables.fontSize.md
  },
  alarmView: { alignItems: 'center', marginTop: 10 },
  amPmText: {
    color: variables.colors.white20,
    fontFamily: variables.fontFamily.extrabold,
    fontSize: variables.fontSize.screenTitleSm,
    marginBottom: 15,
    marginLeft: 10
  },
  gestureRecognizer: {
    alignItems: 'center',
    flex: 1
  },
  player: { bottom: 10 },
  stopText: {
    color: variables.colors.white30,
    fontFamily: variables.fontFamily.extrabold,
    fontSize: variables.fontSize.screenTitleSm
  },
  stopWrap: {
    marginTop: '50%'
  },
  timeText: {
    color: variables.colors.white50,
    fontFamily: variables.fontFamily.extrabold,
    fontSize: 75
  },
  timeView: {
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  timeWrap: {
    marginTop: 120
  }
});

DeactivateAlarmScreen.propTypes = {
  navigation: PropTypes.object
};

export default DeactivateAlarmScreen;
