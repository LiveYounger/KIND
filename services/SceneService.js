import ApiService from './ApiService';
import AsyncStorage from '@react-native-community/async-storage';
import { Audio } from 'expo-av';
import TrackPlayer from 'react-native-track-player';
import convertToProxyURL from 'react-native-video-cache';

export const ENDPOINTS = {
  GET_SCENES: '/scenes/',
  SET_SCENE: '/scenes/'
};

class SceneServices extends ApiService {
  _sceneServiceInstance;
  player;
  activeScene;
  scenes = [];
  trackPlayingWhileSwitchingScene = false;
  positionMillis = null;
  isScenePaused = false;

  constructor(props) {
    super(props);
    this.init();
  }

  init = async () => {
    this.activeScene = JSON.parse(await AsyncStorage.getItem('activeScene'));

    if (this._sceneServiceInstance) {
      return this._sceneServiceInstance;
    }

    this._sceneServiceInstance = this;
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true
    });
    return (this.player = new Audio.Sound());
  };

  getScenes = async () => {
    const { data } = await this.apiClient.get(ENDPOINTS.GET_SCENES);
    this.activeScene = this.activeScene ?? data[0];
    this.scenes = data;

    return data;
  };

  setActiveScene = async scene => {
    this.activeScene = scene;
    await AsyncStorage.setItem('activeScene', JSON.stringify(this.activeScene));
    this.trackPlayingWhileSwitchingScene =
      this.trackPlayingWhileSwitchingScene ||
      (await TrackPlayer.getState()) === TrackPlayer.STATE_PLAYING;
    await this.playScene(this.getSceneAudio(scene));

    //iOS bug - playing a new scene pauses track player
    if (this.trackPlayingWhileSwitchingScene) {
      await TrackPlayer.play();
      // scene switching is finished
      this.trackPlayingWhileSwitchingScene = false;
    }

    return this.activeScene;
  };

  getActiveScene() {
    return this.activeScene || this.scenes[0];
  }

  getSceneAudio = scene => {
    return scene.sounds[0].audio_file;
  };

  playScene = async soundPath => {
    if (!soundPath) {
      soundPath = this.getSceneAudio(this.getActiveScene());
    }

    await this.player.unloadAsync();
    await this.player.loadAsync({ uri: convertToProxyURL(soundPath) });
    await this.player.setStatusAsync({ isLooping: true });
    await this.setSceneVolume(await this.getVolume());
    if (this.positionMillis) {
      await this.player.setPositionAsync(this.positionMillis);
    }
    await this.player.playAsync();
    this.isScenePaused = false;
  };

  stopLooping = () => this.player.setStatusAsync({ isLooping: false });

  getVolume = async () => {
    let volume = await AsyncStorage.getItem('sceneVolume');

    return volume ? JSON.parse(volume) : 0.5;
  };

  setSceneVolume = async volume => {
    await this.player.setVolumeAsync(volume);
    await AsyncStorage.setItem('sceneVolume', JSON.stringify(volume));
  };

  getSceneVolume = async () => {
    let volume = JSON.parse(await AsyncStorage.getItem('sceneVolume'));
    return volume;
  };

  setSceneVolumeWithoutSaving = volume => {
    return this.player.setVolumeAsync(volume);
  };

  stopScene = async () => {
    await this.player.stopAsync();
    this.positionMillis = null;
  };

  pauseScene = async () => {
    let status = await this.player.getStatusAsync();
    this.positionMillis = status.positionMillis;
    await this.player.pauseAsync();
    this.isScenePaused = true;
  };

  setSceneBackgroundTime = async time => {
    await AsyncStorage.setItem('backgroundTimeMilis', time + '');
  };
}

const sceneService = new SceneServices();
export default sceneService;
