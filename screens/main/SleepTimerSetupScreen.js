import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { screenContent, screenWrap } from '../../styles/screens';
import OfflineWarning from '../../components/shared/OfflineWarning';
import { uFlexRow, uFlexJustifyBetween } from '../../styles/utilities';
import { iconBase, base } from '../../styles/icons';
import variables from '../../styles/variables';
import { BlurView as ExpoBlurView } from 'expo-blur';
import SnoozeTimerIcon from '../../assets/icons/snooze.svg';
import IconChevron from '../../assets/icons/chevron.svg';
import IconMoon from '../../assets/icons/moon.svg';
import { uRotate180 } from '../../styles/utilities';
import $t from 'react-native-i18n';
import image from '../../assets/images/screen-bg.png';
import PropTypes from 'prop-types';
import { getAlarmSongs } from '../../store/actions/AlarmSongActions';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { bedTimeAlarmSelector, wakeUpAlarmSelector } from '../../store/selectors/AlarmSelector';
import { setAlarmOptions } from '../../store/actions/AlarmActions';
import { alarmSongSelector } from '../../store/selectors/AlarmSongSelector';
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-simple-toast';
import { is24HourFormat } from 'react-native-device-time-format';
import moment from 'moment';
import alarmService from '../../services/AlarmService';

const SleepTimerSetupScreen = ({ navigation }) => {
  let Touchable = TouchableOpacity;
  if (Platform.OS === 'android') {
    Touchable = TouchableNativeFeedback;
  }

  const wakeUpAlarmOptions = useSelector(wakeUpAlarmSelector());
  const bedTimeAlarmOptions = useSelector(bedTimeAlarmSelector());
  const alarmSongs = useSelector(alarmSongSelector());
  const [bedTimeSongs, setBedTimeSongs] = useState([]);
  const [wakeUpSongs, setWakeUpSongs] = useState([]);

  const [is24, setIs24] = useState(false);

  useEffect(() => {
    (async () => {
      const is = await is24HourFormat();
      setIs24(is);
    })();
  }, []);

  useEffect(
    () => {
      if (alarmSongs.results) {
        const bedTime = alarmSongs?.results?.filter(song => song.is_bedtime);
        const wakeUp = alarmSongs?.results?.filter(song => !song.is_bedtime);
        setBedTimeSongs(bedTime);
        setWakeUpSongs(wakeUp);
      }
    },
    [alarmSongs]
  );

  const dispatch = useDispatch();
  const windowHeight = Dimensions.get('window').height;
  useEffect(() => {
    dispatch(getAlarmSongs());
  }, []);

  const isTimeSet = type => {
    if (type === 'SLEEP')
      return bedTimeAlarmOptions?.time
        ? getCurrentHourFormat(bedTimeAlarmOptions.time) + ''
        : 'Not Set';
    else {
      return wakeUpAlarmOptions?.time
        ? getCurrentHourFormat(wakeUpAlarmOptions.time) + ''
        : 'Not Set';
    }
  };

  const getCurrentHourFormat = timestamp => {
    let date = new Date(timestamp);
    return moment(date).format(is24 ? 'HH:mm' : 'hh:mm A');
  };

  const toggleAlarmActive = async alarmType => {
    if (alarmType === 'SLEEP') {
      if (bedTimeAlarmOptions.time !== null && bedTimeSongs.length !== 0) {
        alarmService.saveBedtimeOptions({
          ...bedTimeAlarmOptions,
          isActive: !bedTimeAlarmOptions.isActive
        });
        dispatch(
          setAlarmOptions(alarmType, {
            ...bedTimeAlarmOptions,
            isActive: !bedTimeAlarmOptions.isActive
          })
        );
      } else {
        let message = 'Can\'t set an alarm';
        if (bedTimeAlarmOptions.time === null) {
          message += ', time not set';
        }
        Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM);
      }
    } else {
      if (wakeUpAlarmOptions.time !== null && wakeUpSongs.length !== 0) {
        alarmService.saveWakeUpOptions({
          ...wakeUpAlarmOptions,
          isActive: !wakeUpAlarmOptions.isActive
        });
        dispatch(
          setAlarmOptions(alarmType, {
            ...wakeUpAlarmOptions,
            isActive: !wakeUpAlarmOptions.isActive
          })
        );
      } else {
        let message = 'Can\'t set an alarm';
        if (wakeUpAlarmOptions.time === null) {
          message += ', time not set';
        }
        Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM);
      }
    }
  };

  const renderButtonText = type => {
    if (type === 'SLEEP') {
      return bedTimeAlarmOptions.isActive ? $t('timers.turnOff') : $t('timers.turnOn');
    } else {
      return wakeUpAlarmOptions.isActive ? $t('timers.turnOff') : $t('timers.turnOn');
    }
  };

  const renderSleepTimerCard = type => {
    let startButtonStyles;
    let startButtonTextStyles;
    if (type === 'SLEEP') {
      startButtonStyles = bedTimeAlarmOptions.isActive
        ? styles.startButtonInactive
        : styles.startButton;
      startButtonTextStyles = bedTimeAlarmOptions.isActive
        ? styles.startButtonTextInactive
        : styles.startButtonText;
    } else {
      startButtonStyles = wakeUpAlarmOptions.isActive
        ? styles.startButtonInactive
        : styles.startButton;
      startButtonTextStyles = wakeUpAlarmOptions.isActive
        ? styles.startButtonTextInactive
        : styles.startButtonText;
    }

    return (
      <>
        <Text style={styles.alarmTypeName}>
          {type === 'SLEEP' ? $t('timers.sleep') : $t('timers.wakeUp')}
        </Text>
        <Touchable onPress={() => navigation.navigate('AlarmSetup', { alarmType: type })}>
          <ExpoBlurView
            intensity={40}
            tint="dark"
            style={windowHeight < 700 ? styles.timeSetupCardSM : styles.timeSetupCard}
          >
            <View style={styles.iconView}>
              <SnoozeTimerIcon style={styles.icon} />
            </View>
            <View>
              <Text style={styles.sleepTimerTitle}>
                {type === 'SLEEP' ? $t('timers.bedtime') : $t('timers.wakeUpTime')}
              </Text>
              <Text style={styles.sleepTimerDescription}>Time: {isTimeSet(type)}</Text>
            </View>
            <IconChevron
              style={[iconBase, base, uRotate180, styles.iconChevron]}
              fill={variables.colors.white}
            />
          </ExpoBlurView>
        </Touchable>
        <Touchable onPress={() => navigation.navigate('SongList', { playListType: type })}>
          <ExpoBlurView intensity={40} tint="dark" style={styles.songsSetupCard}>
            <IconMoon style={styles.icon} />
            <View>
              <Text style={styles.sleepTimerTitle}>
                {type === 'SLEEP' ? $t('timers.bedtimeSongs') : $t('timers.wakeUpSongs')}
              </Text>
            </View>
            <IconChevron
              style={[iconBase, base, uRotate180, styles.iconChevron]}
              fill={variables.colors.white}
            />
          </ExpoBlurView>
        </Touchable>
        <Touchable onPress={() => toggleAlarmActive(type)}>
          <ExpoBlurView intensity={40} tint="dark" style={startButtonStyles}>
            <Text style={startButtonTextStyles}>{renderButtonText(type)}</Text>
          </ExpoBlurView>
        </Touchable>
      </>
    );
  };

  return (
    <ImageBackground
      style={screenWrap}
      source={Platform.OS === 'ios' ? { uri: 'screen-bg' } : image}
    >
      <SafeAreaView style={screenContent}>
        <OfflineWarning />
        <View style={[uFlexRow, uFlexJustifyBetween]}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign name="left" size={26} color={variables.colors.white} />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>{$t('timers.sleepTimer')}</Text>
          <View style={styles.zeroOpacity}>
            <AntDesign name="left" size={26} color={variables.colors.white} />
          </View>
        </View>
        <ScrollView
          style={styles.screenInnerContent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <View>{renderSleepTimerCard('SLEEP')}</View>
          <View style={styles.wakeUpContainer}>{renderSleepTimerCard('WAKE')}</View>
          <Text style={styles.alarmHintText}>
            {
              'Please keep the app turned on in the background in order to not stop the alarm\'s functionality'
            }
          </Text>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  alarmHintText: {
    color: variables.colors.white,
    fontFamily: variables.fontFamily.regular,
    fontSize: variables.fontSize.base,
    marginTop: 40,
    textAlign: 'center'
  },
  alarmTypeName: {
    color: variables.colors.white,
    fontFamily: variables.fontFamily.extrabold,
    fontSize: variables.fontSize.md
  },
  icon: {
    height: 24,
    marginLeft: 20,
    width: 24
  },
  iconChevron: {
    position: 'absolute',
    right: 20,
    top: '50%'
  },
  iconView: { height: '100%', justifyContent: 'center' },
  screenInnerContent: {
    flexDirection: 'column',
    flex: 1,
    height: '100%',
    paddingTop: 30
  },
  screenTitle: {
    color: variables.colors.white,
    fontFamily: variables.fontFamily.extrabold,
    fontSize: variables.fontSize.screenTitleSm
  },
  scrollViewContainer: { paddingBottom: 120 },
  sleepTimerDescription: {
    color: variables.colors.white50,
    fontFamily: variables.fontFamily.regular,
    fontSize: variables.fontSize.md,
    marginLeft: 16
  },

  sleepTimerTitle: {
    color: variables.colors.white,
    fontFamily: variables.fontFamily.regular,
    fontSize: variables.fontSize.md,
    marginLeft: 16
  },
  songsSetupCard: {
    alignItems: 'flex-start',
    borderColor: variables.colors.white,
    borderRadius: 15,
    borderWidth: 3,
    flexDirection: 'row',
    height: 70,
    marginTop: 10,
    paddingTop: 21,
    width: '100%'
  },
  startButton: {
    alignItems: 'center',
    borderColor: variables.colors.white,
    borderRadius: 15,
    borderWidth: 2,
    height: 50,
    justifyContent: 'center',
    marginLeft: '20%',
    marginTop: 10,
    width: '60%'
  },
  startButtonInactive: {
    alignItems: 'center',
    borderColor: variables.colors.white30,
    borderRadius: 15,
    borderWidth: 2,
    height: 50,
    justifyContent: 'center',
    marginLeft: '20%',
    marginTop: 10,
    width: '60%'
  },
  startButtonText: {
    color: variables.colors.white,
    fontFamily: variables.fontFamily.regular,
    fontSize: variables.fontSize.md
  },
  startButtonTextInactive: {
    color: variables.colors.white30,
    fontFamily: variables.fontFamily.regular,
    fontSize: variables.fontSize.md
  },
  timeSetupCard: {
    alignItems: 'center',
    borderColor: variables.colors.white,
    borderRadius: 15,
    borderWidth: 3,
    flexDirection: 'row',
    height: 96,
    marginTop: 10,
    paddingVertical: 24,
    width: '100%'
  },
  timeSetupCardSM: {
    alignItems: 'center',
    borderColor: variables.colors.white,
    borderRadius: 15,
    borderWidth: 3,
    flexDirection: 'row',
    height: 70,
    marginTop: 10,
    paddingVertical: 10,
    width: '100%'
  },
  wakeUpContainer: {
    marginTop: 20
  },
  zeroOpacity: { opacity: 0 }
});

SleepTimerSetupScreen.propTypes = {
  navigation: PropTypes.object
};

export default SleepTimerSetupScreen;
