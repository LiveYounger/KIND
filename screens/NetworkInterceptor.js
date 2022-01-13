import React, { useEffect } from 'react';
import { View, StyleSheet, Platform, ImageBackground } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import PropTypes from 'prop-types';
import { withInAppNotification } from 'react-native-in-app-notification';
import { useSelector, useDispatch } from 'react-redux';

import { loaderSelector } from '../store/selectors/LoaderSelector';
import PasswordChangedModal from '../components/shared/modal/PasswordChangeModal';
import { passwordChangedSelector } from '../store/selectors/UserSelector';
import { setChangePasswordSuccess } from '../store/actions/UserActions';
import ErrorModal from '../components/shared/modal/ErrorModal';
import { socialLoginErrorSelector } from '../store/selectors/ErrorSelector';
import { setGlobalError, setSocialLoginError } from '../store/actions/ErrorActions';
import { OS_TYPES, DEFAULT, NOTIFICATION, NOTIFICATION_ORIGIN } from '../constants';
import { notificationHandleService } from '../services/NotificationHandleService';
import SocialLoginErrorModal from '../components/shared/modal/SocialLoginErrorModal';
import ActivityIndicatorComponent from '../components/shared/ActivityIndicatorComponent';
import { screenWrap } from '../styles/screens';
import image from '../assets/images/screen-bg.png';

const NetworkInterceptor = ({ showNotification, children }) => {
  const dispatch = useDispatch();

  const handleSetGlobalError = data => dispatch(setGlobalError(data));
  const handleSetSocialLoginError = data => dispatch(setSocialLoginError(data));
  const handleSetChangePasswordSuccess = data => dispatch(setChangePasswordSuccess(data));

  const loader = useSelector(loaderSelector());
  const passwordChanged = useSelector(passwordChangedSelector());
  const socialLoginError = useSelector(socialLoginErrorSelector());

  useEffect(() => {
    addNotificationListener();
  }, []);

  const addNotificationListener = async () => {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (Platform.OS === OS_TYPES.ANDROID) {
      Notifications.createChannelAndroidAsync(DEFAULT, {
        name: NOTIFICATION,
        sound: true
      });
    }
    Notifications.addListener(handleNotification);
  };

  const handleNotification = notification => {
    if (notification.origin === NOTIFICATION_ORIGIN.SELECTED) {
      notificationHandleService.handleOnClick(notification);
    } else {
      notificationHandleService.showInApp(
        notification,
        notification.notificationId,
        showNotification
      );
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={screenWrap}
        source={Platform.OS === 'ios' ? { uri: 'screen-bg' } : image}
      >
        {children}
        {loader && <ActivityIndicatorComponent animating />}
        <PasswordChangedModal
          isVisible={passwordChanged}
          closeModal={() => handleSetChangePasswordSuccess(false)}
        />
        <ErrorModal isVisible={false} closeModal={() => handleSetGlobalError(false)} />
        <SocialLoginErrorModal
          error={socialLoginError}
          closeModal={() => handleSetSocialLoginError('')}
        />
      </ImageBackground>
    </View>
  );
};

NetworkInterceptor.propTypes = {
  children: PropTypes.any,
  showNotification: PropTypes.func
};

export default withInAppNotification(NetworkInterceptor);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1
  }
});
