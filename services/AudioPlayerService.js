import TrackPlayer from 'react-native-track-player';
import { formatToTrackObject } from '../helpers/audioHelper';

import { isPremiumUser } from '../helpers/userHelper';

class AudioPlayerService {
  _trackPlayer;

  constructor() {
    this.init();
  }

  init = async () => {
    if (this._trackPlayer) {
      return this._trackPlayer;
    }
    this._trackPlayer = TrackPlayer;

    await this.setupPlayer();

    this.updateOptions({
      stopWithApp: false,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
        TrackPlayer.CAPABILITY_SEEK_TO
      ],
      compactCapabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE]
    });
  };

  setupPlayer = () => {
    const buffering = 0.5;
    return TrackPlayer.setupPlayer({
      buffering: buffering,
      playBuffer: buffering,
      waitForBuffer: true,
      iosCategory: 'playback'
    });
  };

  get trackPlayer() {
    return this._trackPlayer;
  }

  updateOptions = async function(options) {
    await this._trackPlayer.updateOptions(options);
  };

  addSongs = async songs => {
    if (!(await isPremiumUser())) {
      songs = songs.filter(audio => !audio.is_premium);
    }
    await this._trackPlayer.add(songs);
  };

  setupSongs = async songs => {
    await this.reset();
    await this.addSongs(songs);
  };

  setupSleepOrMeditation = async sleepOrMeditation => {
    await this.reset();
    await this.addSongs(formatToTrackObject(sleepOrMeditation));
  };

  setupAlarmSongs = async alarmSongs => {
    await this.reset();
    for (let i = 0; i < alarmSongs.length; i++) {
      await this.addSongs(formatToTrackObject(alarmSongs[i]));
    }
  };

  play = async jumpToSong => {
    if (jumpToSong) {
      await this._trackPlayer.skip(jumpToSong.toString());
    }
    this._trackPlayer.play();
  };

  seekTo = seconds => {
    return this._trackPlayer.seekTo(seconds);
  };

  getQueue = async () => await this._trackPlayer.getQueue();

  pause = async () => {
    await this._trackPlayer.pause();
  };

  stop = async () => {
    await this._trackPlayer.stop();
  };

  reset = async () => {
    await this._trackPlayer.reset();
  };

  skipToNext = async () => {
    try {
      await this._trackPlayer.skipToNext();
    } catch (e) {
      console.log(e);
    }
  };

  skipToPrevious = async () => {
    try {
      await this._trackPlayer.skipToPrevious();
    } catch (e) {
      console.log(e);
    }
  };
}

const audioPlayerService = new AudioPlayerService();
export default audioPlayerService;
