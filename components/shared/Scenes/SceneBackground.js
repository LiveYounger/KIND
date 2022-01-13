import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { screenWrap } from '../../../styles/screens';
import { Video } from 'expo-av';
import Layout from '../../../constants/Layout';
import convertToProxyURL from 'react-native-video-cache';
import { uGapTopXs, uTextCenter, uTextWhite } from '../../../styles/utilities';
import $t from 'react-native-i18n';
import { SafeAreaView } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { sceneFocusedSelector } from '../../../store/selectors/ScenesSelector';
import { setSceneFocused } from '../../../store/actions/ScenesActions';

const SceneBackground = ({ scene, children }) => {
  const [videoLoading, setVideoLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const sceneFocused = useSelector(sceneFocusedSelector());
  const dispatch = useDispatch();

  const handleLoadStart = async () => {
    setVideoLoading(true);
  };

  const handleLoadFinished = async () => {
    setVideoLoading(false);
    setShowLoader(false);
  };

  useEffect(
    () => {
      if (sceneFocused) fadeOut();
      else fadeIn();
    },
    [sceneFocused]
  );

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  useEffect(
    () => {
      let timer;
      if (videoLoading) {
        timer = setTimeout(() => {
          setShowLoader(true);
        }, 1000);
      }
      return () => {
        if (timer) clearTimeout(timer);
      };
    },
    [videoLoading]
  );

  return (
    <View>
      <ImageBackground
        source={{ uri: scene?.background.large_square }}
        style={[screenWrap, styles.backgroundImage]}
      >
        {!!scene?.video && (
          <Video
            source={{ uri: convertToProxyURL(scene.video) }}
            rate={1.0}
            resizeMode="cover"
            shouldPlay
            isMuted
            isLooping
            style={[styles.video, videoLoading ? styles.hidden : {}]}
            onLoadStart={handleLoadStart}
            onLoad={handleLoadFinished}
          />
        )}
        {!!scene?.video &&
          showLoader && (
          <SafeAreaView>
            <Text style={[uTextWhite, uTextCenter, uGapTopXs]}>{$t('scenes.downloading')}</Text>
          </SafeAreaView>
        )}
        <Animated.View style={{ opacity: fadeAnim }}>{children}</Animated.View>

        {sceneFocused && (
          <TouchableWithoutFeedback onPress={() => dispatch(setSceneFocused(false))}>
            <View style={styles.video} />
          </TouchableWithoutFeedback>
        )}
      </ImageBackground>
    </View>
  );
};

SceneBackground.propTypes = {
  scene: PropTypes.object,
  children: PropTypes.node,
  sceneFocused: PropTypes.bool,
  setSceneFocused: PropTypes.func
};

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: 'cover'
  },
  hidden: {
    opacity: 0
  },
  video: {
    height: Layout.window.height,
    position: 'absolute',
    width: Layout.window.width
  }
});

export default SceneBackground;
