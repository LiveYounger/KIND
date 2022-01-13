import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  SafeAreaView
} from 'react-native';
import { screenContent, screenWrap } from '../../styles/screens';
import image from '../../assets/images/screen-bg.png';
import OfflineWarning from '../../components/shared/OfflineWarning';
import { uFlexJustifyBetween, uFlexRow } from '../../styles/utilities';
import variables from '../../styles/variables';
import $t from 'react-native-i18n';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';
import { bedTimeAlarmSelector, wakeUpAlarmSelector } from '../../store/selectors/AlarmSelector';
import { userSelector } from '../../store/selectors/UserSelector';
import { setAlarmOptions } from '../../store/actions/AlarmActions';
import { useDispatch, useSelector } from 'react-redux';
import { alarmSongSelector } from '../../store/selectors/AlarmSongSelector';
import alarmService from '../../services/AlarmService';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { AntDesign } from '@expo/vector-icons';
import { is24HourFormat } from 'react-native-device-time-format';
import moment from 'moment';

const AlarmSetupScreen = ({ navigation }) => {
  let Touchable = TouchableOpacity;
  if (Platform.OS === 'android') {
    Touchable = TouchableNativeFeedback;
  }

  const user = useSelector(userSelector());

  const wakeUpAlarmOptions = useSelector(wakeUpAlarmSelector());
  const bedTimeAlarmOptions = useSelector(bedTimeAlarmSelector());

  const alarmSongs = useSelector(alarmSongSelector());

  const [is24, setIs24] = useState(false);

  useEffect(() => {
    (async () => {
      const is = await is24HourFormat();
      setIs24(is);
    })();
  }, []);

  const alarmType = navigation.getParam('alarmType');
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [showPickerAndroid, setShowPickerAndroid] = useState(false);
  const [pickedTime, setPickedTime] = useState(new Date());
  const onChange = e => {
    let d = new Date(e.nativeEvent.timestamp);
    d.setSeconds(0);
    setPickedTime(d);
  };

  const setPickedTimeAndroid = date => {
    date.setSeconds(0);
    setPickedTime(date);
  };

  const showDatePicker = () => {
    setShowPickerAndroid(true);
  };

  const hideDatePicker = () => {
    setShowPickerAndroid(false);
  };

  useEffect(
    () => {
      if (alarmType === 'SLEEP') {
        setDate(bedTimeAlarmOptions.time ? new Date(bedTimeAlarmOptions.time) : new Date());
        setPickedTime(bedTimeAlarmOptions.time ? new Date(bedTimeAlarmOptions.time) : new Date());
      } else {
        setDate(wakeUpAlarmOptions.time ? new Date(wakeUpAlarmOptions.time) : new Date());
        setPickedTime(wakeUpAlarmOptions.time ? new Date(wakeUpAlarmOptions.time) : new Date());
      }
    },
    [bedTimeAlarmOptions, wakeUpAlarmOptions]
  );

  const formatDateTimeToTime = date => {
    return moment(date).format(is24 ? 'HH:mm' : 'hh:mm A');
  };

  useEffect(
    () => {
      if ((bedTimeAlarmOptions.isActive || wakeUpAlarmOptions.isActive) && alarmSongs) {
        alarmService.setAlarm(
          alarmSongs.results,
          bedTimeAlarmOptions,
          wakeUpAlarmOptions,
          user.is_premium
        );
      }
    },
    [bedTimeAlarmOptions, wakeUpAlarmOptions]
  );

  const saveAlarm = async () => {
    if (alarmType === 'SLEEP') {
      await alarmService.saveBedtimeOptions({
        ...bedTimeAlarmOptions,
        isActive: true,
        time: pickedTime.getTime()
      });
      dispatch(
        setAlarmOptions(alarmType, {
          ...bedTimeAlarmOptions,
          isActive: true,
          time: pickedTime.getTime()
        })
      );
    } else {
      await alarmService.saveWakeUpOptions({
        ...wakeUpAlarmOptions,
        isActive: true,
        time: pickedTime.getTime()
      });
      dispatch(
        setAlarmOptions(alarmType, {
          ...wakeUpAlarmOptions,
          isActive: true,
          time: pickedTime.getTime()
        })
      );
    }
    navigation.goBack();
  };

  const renderIosTimePicker = useMemo(
    () => {
      return (
        <RNDateTimePicker
          value={date}
          mode="time"
          collapsable={false}
          textColor="white"
          is24Hour={false}
          onChange={onChange}
          display={Platform.OS === 'ios' ? 'spinner' : 'clock'}
          style={styles.datePicker}
        />
      );
    },
    [date]
  );

  const renderAndroidTimePicker = useMemo(
    () => {
      return (
        <DateTimePickerModal
          isVisible={showPickerAndroid}
          mode="time"
          is24Hour={is24}
          date={pickedTime ? pickedTime : new Date()}
          onConfirm={e => {
            setPickedTimeAndroid(e);
            setShowPickerAndroid(false);
          }}
          style={styles.datePicker}
          onChange={onChange}
          onCancel={hideDatePicker}
        />
      );
    },
    [showPickerAndroid]
  );

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
          <Text style={styles.screenTitle}>{$t('common.liveYounger')}</Text>
          <View style={styles.zeroOpacity}>
            <AntDesign name="left" size={26} color={variables.colors.white} />
          </View>
        </View>
        <View style={styles.motivationalWrap}>
          <Text style={styles.motivationalText}>
            {
              'Please keep the app turned on in the background in order to not stop the alarm\'s functionality'
            }
          </Text>
          <Touchable>
            <Text style={styles.learnMoreText}>{$t('common.learnMore')}</Text>
          </Touchable>
        </View>
        <View style={styles.alarmContent}>
          <Touchable
            onPress={() => {
              if (Platform.OS === 'android') {
                showDatePicker();
              }
            }}
          >
            <Text style={styles.setAlarmText}>{$t('timers.setAlarm')}</Text>
          </Touchable>
          {Platform.OS === 'ios' ? renderIosTimePicker : null}
          {Platform.OS === 'android' ? renderAndroidTimePicker : null}

          {Platform.OS === 'android' ? (
            <TouchableOpacity
              onPress={() => {
                if (Platform.OS === 'android') {
                  showDatePicker();
                }
              }}
            >
              <Text style={styles.pickedTimeText}>
                {pickedTime ? formatDateTimeToTime(pickedTime) : ''}
              </Text>
            </TouchableOpacity>
          ) : null}
          <Touchable onPress={saveAlarm}>
            <View style={styles.setAlarmButtonView}>
              <Text style={styles.setAlarmButton}>{$t('timers.setAlarm')}</Text>
            </View>
          </Touchable>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  alarmContent: {
    alignItems: 'center',
    flex: 1,
    marginTop: 100
  },
  datePicker: { height: '25%', width: 200 },
  learnMoreText: {
    color: variables.colors.white,
    fontFamily: variables.fontFamily.regular,
    fontSize: variables.fontSize.base,
    marginTop: 20,
    textDecorationLine: 'underline'
  },
  motivationalText: {
    color: variables.colors.white,
    fontFamily: variables.fontFamily.regular,
    fontSize: variables.fontSize.base,
    textAlign: 'center'
  },
  motivationalWrap: {
    alignItems: 'center',
    marginTop: 25
  },
  pickedTimeText: {
    color: variables.colors.white,
    fontFamily: variables.fontFamily.extrabold,
    fontSize: variables.fontSize.screenTitleSm,
    marginTop: 20
  },
  screenTitle: {
    color: variables.colors.white,
    fontFamily: variables.fontFamily.extrabold,
    fontSize: variables.fontSize.screenTitleSm
  },
  setAlarmButton: {
    color: variables.colors.black,
    fontFamily: variables.fontFamily.bold,
    fontSize: variables.fontSize.md
  },
  setAlarmButtonView: {
    alignItems: 'center',
    backgroundColor: variables.colors.white,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    marginTop: 40,
    width: 200
  },
  setAlarmText: {
    color: variables.colors.white,
    fontFamily: variables.fontFamily.bold,
    fontSize: variables.fontSize.base
  },
  zeroOpacity: { opacity: 0 }
});

AlarmSetupScreen.propTypes = {
  navigation: PropTypes.object
};

export default AlarmSetupScreen;
