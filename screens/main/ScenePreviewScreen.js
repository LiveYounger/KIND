import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SceneBackground from '../../components/shared/Scenes/SceneBackground';
import sceneService from '../../services/SceneService';
import {
  setActiveScene,
  setSceneFocused,
  setSceneModalVisible
} from '../../store/actions/ScenesActions';
import { activeSceneSelector, scenePreviewSelector } from '../../store/selectors/ScenesSelector';
import PropTypes from 'prop-types';
import { screenContent } from '../../styles/screens';
import { uGapBottomLg, uGapHorLg, uTextBlack } from '../../styles/utilities';
import { btnBase, btnWhite, iconBtnTextLabelWhite } from '../../styles/buttons';
import $t from 'react-native-i18n';
import { modalCloseBtn } from '../../styles/modals';
import { iconBase } from '../../styles/icons';
import IconClose from '../../assets/icons/close.svg';
import variables from '../../styles/variables';
import TrackPlayer from 'react-native-track-player';

const ScenePreviewScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const scene = useSelector(scenePreviewSelector());
  const activeScene = useSelector(activeSceneSelector());

  const handleSetScene = () => {
    dispatch(setActiveScene(scene));
    navigation.navigate('ForYou');
  };

  const handleClose = () => {
    sceneService.setActiveScene(activeScene);
    dispatch(setSceneModalVisible(true));
    navigation.goBack();
  };

  useEffect(() => {
    dispatch(setSceneFocused(false));

    return () => {
      if (scene.playerWasPlaying) TrackPlayer.play();
    };
  }, []);

  return (
    <SceneBackground style={screenContent} scene={scene}>
      <TouchableOpacity style={modalCloseBtn} onPress={handleClose}>
        <IconClose style={iconBase} fill={variables.colors.white} />
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSetScene}
          style={[btnBase, btnWhite, uGapBottomLg, uGapHorLg, styles.buttonPosition]}
        >
          <Text style={[iconBtnTextLabelWhite, uTextBlack]}>{$t('scenes.setScene')}</Text>
        </TouchableOpacity>
      </View>
    </SceneBackground>
  );
};

ScenePreviewScreen.propTypes = {
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-end'
  }
});

export default ScenePreviewScreen;
