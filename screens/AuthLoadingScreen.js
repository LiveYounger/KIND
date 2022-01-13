import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { setActiveUser, getUser } from '../store/actions/UserActions';
import authService from '../services/AuthService';
import { userSelector } from '../store/selectors/UserSelector';
import { setActiveScene, getScenes } from '../store/actions/ScenesActions';
import sceneService from '../services/SceneService';
import { deepLinkService } from '../services/DeepLinkService';
import ScreenWrap from '../components/shared/ScreenWrap';
import ActivityIndicatorComponent from '../components/shared/ActivityIndicatorComponent';
import OfflineWarning from '../components/shared/OfflineWarning';

const AuthLoadingScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleGetUser = () => dispatch(getUser());
  const handleSetActiveUser = data => dispatch(setActiveUser(data));

  const user = useSelector(userSelector());

  useEffect(() => {
    bootstrapAsync();
    deepLinkService.init();
  }, []);

  useEffect(
    () => {
      if (user.id) {
        dispatch(getUser());
        dispatch(getScenes({ play: true }));
        dispatch(setActiveScene(sceneService.getActiveScene()));
        navigation.navigate('MainStack');
      }
    },
    [user.id, dispatch]
  );

  // Fetch the token from storage then navigate to our appropriate place
  const bootstrapAsync = async () => {
    const user = await authService.getUser();
    if (user) {
      handleSetActiveUser(user);
      handleGetUser();
    } else {
      navigation.navigate('AuthStack');
    }

    // This will switch to the Main screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
  };

  // Render any loading content that you like here
  return (
    <ScreenWrap>
      <OfflineWarning />
      <ActivityIndicatorComponent delay={0} />
      <StatusBar barStyle="default" />
    </ScreenWrap>
  );
};

AuthLoadingScreen.propTypes = {
  navigation: PropTypes.object
};

export default AuthLoadingScreen;
