import React, { useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import $t from 'react-native-i18n';
import { useSelector, useDispatch } from 'react-redux';

import { userSelector } from '../../store/selectors/UserSelector';
import ScenesModal from '../../components/shared/Scenes/SceneModal';
import { getCategories } from '../../store/actions/CategoryActions';
import { screenPadTop } from '../../styles/screens';
import {
  uFlexGrow,
  uGapBottom,
  uGapHorMd,
  uPadBottomXxl,
  uPadBottomXxxl,
  uTextWhite,
  uTextXl,
  uPadTopXxl
} from '../../styles/utilities';
import variables from '../../styles/variables';
import {
  activeSceneSelector,
  sceneModalVisibleSelector
} from '../../store/selectors/ScenesSelector';
import sceneService from '../../services/SceneService';
import { ActivePlayer } from '../../components/shared/ActiveItemPlayist';
import RecentlyPlayed from '../../components/shared/RecentlyPlayed';
import { isTrackPlayerInitialized } from '../../helpers/audioHelper';
import HeaderActions from '../../components/shared/HeaderActions';
import IconUser from '../../assets/icons/user.svg';
import IconScenes from '../../assets/icons/theme.svg';
import IconLiveYoungLogo from '../../assets/icons/live-younger-logo-full.svg';
import { sectionRecentPlay } from '../../styles/forYouScreen';
import { getSections } from '../../store/actions/SectionActions';
import { sectionsSelector } from '../../store/selectors/SectionSelector';
import { SectionList } from '../../components/shared/Sections';
import { getLastFinished } from '../../store/actions/ActivityActions';
import { lastFinishedSelector } from '../../store/selectors/ActivitySelector';
import SceneBackground from '../../components/shared/Scenes/SceneBackground';
import { activityService } from '../../services/ActivityService';
import {
  getScenes,
  setSceneFocused,
  setSceneModalVisible
} from '../../store/actions/ScenesActions';
import useIsConnected from '../../helpers/netInfoHelper';
import OfflineWarning from '../../components/shared/OfflineWarning';
import { setWasPlaying } from '../../store/actions/AudioPlayerAction';
import TrackPlayer from 'react-native-track-player';
import useAppState from '../../helpers/appState';
import alarmService from '../../services/AlarmService';
import { alarmSongSelector } from '../../store/selectors/AlarmSongSelector';
import {
  alarmSelector,
  bedTimeAlarmSelector,
  wakeUpAlarmSelector
} from '../../store/selectors/AlarmSelector';
import { getAlarmSongs } from '../../store/actions/AlarmSongActions';
import * as Notifications from 'expo-notifications';
import { setCurrentAudio } from '../../store/actions/AudioPlayerAction';
import audioPlayerService from '../../services/AudioPlayerService';
import { currentAudioSelector } from '../../store/selectors/AudioPlayerSelector';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const ForYouScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const sceneModalVisible = useSelector(sceneModalVisibleSelector());
  const user = useSelector(userSelector());
  const scene = useSelector(activeSceneSelector()) || sceneService.getActiveScene();
  const lastFinished = useSelector(lastFinishedSelector());
  const currentAudio = useSelector(currentAudioSelector());

  const isConnected = useIsConnected();
  const appState = useAppState();
  const sections = useSelector(sectionsSelector());

  const alarmSongs = useSelector(alarmSongSelector());
  const bedTimeAlarmOptions = useSelector(bedTimeAlarmSelector());
  const wakeUpAlarmOptions = useSelector(wakeUpAlarmSelector());

  const alarm = useSelector(alarmSelector());

  const alarmPrevious = usePrevious(alarm);

  useEffect(() => {
    dispatch(getAlarmSongs());
  }, []);

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

  useEffect(
    () => {
      (async () => {
        if (
          appState === 'background' &&
          (bedTimeAlarmOptions.isActive || wakeUpAlarmOptions.isActive) &&
          alarmSongs
        ) {
          await alarmService.setAlarm(
            alarmSongs.results,
            bedTimeAlarmOptions,
            wakeUpAlarmOptions,
            user.is_premium
          );
        } else if (appState === 'active') {
          if (alarm.isAlarmPlaying) {
            navigation.navigate('DeactivateAlarm');
          } else if ((bedTimeAlarmOptions.isActive || wakeUpAlarmOptions.isActive) && alarmSongs) {
            await alarmService.setAlarm(
              alarmSongs.results,
              bedTimeAlarmOptions,
              wakeUpAlarmOptions,
              user.is_premium
            );
          }
        }
      })();
    },
    [appState, alarmSongs]
  );

  useEffect(
    () => {
      if (alarm.isAlarmPlaying && appState === 'active') {
        navigation.navigate('DeactivateAlarm');
      } else if (!alarm.isAlarmPlaying) {
        if (alarmPrevious?.isAlarmPlaying === true) {
          console.log('setting new alarm');
          alarmService.setAlarm(
            alarmSongs.results,
            bedTimeAlarmOptions,
            wakeUpAlarmOptions,
            user.is_premium
          );
        }
      }
    },
    [alarm]
  );

  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const HeaderActionsData = [
    {
      icon: IconScenes,
      onPress: () => dispatch(setSceneModalVisible(true))
    },
    {
      icon: IconLiveYoungLogo
    },
    {
      icon: IconUser,
      onPress: () => {
        if (user.is_guest) sceneService.stopScene();
        navigation.navigate(user.is_guest ? 'Welcome' : 'EditProfile');
      }
    }
  ];

  useEffect(
    () => {
      if (sceneModalVisible) dispatch(getScenes());
    },
    [sceneModalVisible]
  );

  useEffect(() => {
    dispatch(setSceneFocused(false));
    (async () => {
      if ((await TrackPlayer.getState()) === TrackPlayer.STATE_PLAYING) {
        dispatch(setWasPlaying(true));
      }
    })();
  }, []);

  useEffect(
    () => {
      if (isConnected) {
        dispatch(getSections());
        dispatch(getLastFinished());
      }

      activityService.onFinishSound = () => {
        dispatch(getLastFinished());
      };

      return () => {
        activityService.onFinishSound = () => {};
      };
    },
    [isConnected]
  );

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return $t('forYou.goodMorning');
    if (hours >= 12 && hours < 17) return $t('forYou.goodAfternoon');
    return $t('forYou.goodEvening');
  };

  const renderSections = sections =>
    sections.map(section => (
      <SectionList key={section.id} section={section} navigation={navigation} />
    ));

  return (
    <>
      <SceneBackground scene={scene}>
        <OfflineWarning />
        <ScrollView
          contentContainerStyle={[
            uFlexGrow,
            screenPadTop,
            uPadBottomXxl,
            isTrackPlayerInitialized() && uPadBottomXxxl
          ]}
        >
          <View style={uGapHorMd}>
            <HeaderActions actions={HeaderActionsData} />
            <TouchableWithoutFeedback onPress={() => dispatch(setSceneFocused(true))}>
              <View style={[uGapBottom, uPadTopXxl]}>
                <Text style={styles.greetingTitle}>{getGreeting()}</Text>
                <Text style={[uTextWhite, uTextXl]}>{user && user.first_name.split(' ')[0]}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <TouchableWithoutFeedback onPress={() => dispatch(setSceneFocused(true))}>
            <View style={sectionRecentPlay}>
              {!!lastFinished && <RecentlyPlayed activity={lastFinished} navigation={navigation} />}
            </View>
          </TouchableWithoutFeedback>

          {renderSections(sections)}
        </ScrollView>
      </SceneBackground>

      <ActivePlayer navigation={navigation} />

      <ScenesModal
        isVisible={sceneModalVisible}
        closeModal={() => dispatch(setSceneModalVisible(false))}
        navigation={navigation}
      />
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: 'cover'
  },
  greetingTitle: {
    color: variables.colors.white50,
    fontSize: variables.fontSize.base
  }
});

ForYouScreen.propTypes = {
  navigation: PropTypes.object
};

export default ForYouScreen;
