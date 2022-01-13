import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import { setScenePreview } from '../../../store/actions/ScenesActions';
import { BlurView } from 'expo-blur';
import variables from '../../../styles/variables';
import { uGapRight, uTextWhite } from '../../../styles/utilities';
import sceneService from '../../../services/SceneService';
import TrackPlayer, { usePlaybackState } from 'react-native-track-player';

const SceneItem = ({ scene, key, navigation, closeSceneModal }) => {
  const dispatch = useDispatch();

  const playbackState = usePlaybackState();

  const onClick = async () => {
    const playerWasPlaying = playbackState === TrackPlayer.STATE_PLAYING;
    dispatch(setScenePreview({ ...scene, playerWasPlaying }));
    sceneService.setActiveScene(scene);
    navigation.navigate('ScenePreview');
    TrackPlayer.pause();
    closeSceneModal();
  };

  return (
    <TouchableOpacity onPress={onClick} key={key} style={uGapRight}>
      <ImageBackground
        source={{ uri: scene.background.thumbnail }}
        style={style.image}
        imageStyle={style.imageObj}
      >
        <BlurView intensity={95} tint="dark" style={style.sceneHeading}>
          <Text style={uTextWhite}>{scene.name}</Text>
        </BlurView>
      </ImageBackground>
    </TouchableOpacity>
  );
};

SceneItem.propTypes = {
  scene: PropTypes.shape({
    name: 'string',
    background: 'string',
    sounds: PropTypes.array
  }),
  key: PropTypes.number,
  navigation: PropTypes.object,
  closeSceneModal: PropTypes.func
};

const style = StyleSheet.create({
  image: {
    height: 160,
    justifyContent: 'flex-end',
    width: 130
  },

  imageObj: {
    borderColor: variables.colors.white,
    borderRadius: 20,
    borderWidth: 2
  },

  sceneHeading: {
    borderRadius: 20,
    margin: 2,
    padding: variables.gutters.base
  }
});

export default SceneItem;
