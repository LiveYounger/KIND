import TrackPlayer from 'react-native-track-player';
import { isApproximatelyEqual } from '../helpers';
import { activityService } from './ActivityService';
import sceneService from './SceneService';

const TRACK_STARTED_THRESHOLD = 5;
const TRACK_FINISHED_THRESHOLD = 5;

const STATE_LOADING_ANDROID = 8;

let previousState;

const interruptSoundActivity = async () => {
  const position = await TrackPlayer.getPosition();
  if (position < TRACK_STARTED_THRESHOLD) return;
  const track = await TrackPlayer.getCurrentTrack();
  activityService.interruptSound({
    sound: track,
    seconds_listened: Math.floor(position)
  });
};

module.exports = async function() {
  TrackPlayer.addEventListener('remote-play', () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener('remote-pause', () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener('remote-next', () => {
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener('remote-previous', () => {
    TrackPlayer.skipToPrevious();
  });

  TrackPlayer.addEventListener('remote-stop', () => {
    TrackPlayer.stop();
    sceneService.stopScene();
  });

  TrackPlayer.addEventListener('playback-state', async ({ state }) => {
    if (state === TrackPlayer.STATE_PAUSED) {
      interruptSoundActivity();

      /* Android bug - player goes to pause for a moment while loading causing the scene to
      play and then pause again. */
      if (previousState !== STATE_LOADING_ANDROID) {
        sceneService.player.playAsync();
      }
    }
    if (state === TrackPlayer.STATE_PLAYING) {
      sceneService.player.pauseAsync();
    }
    previousState = state;
  });

  TrackPlayer.addEventListener('playback-track-changed', async ({ track, position, nextTrack }) => {
    if (nextTrack || (track && isApproximatelyEqual(position, 0, 1)))
      activityService.startSound({ sound: nextTrack });
    if (track && position > TRACK_STARTED_THRESHOLD)
      activityService.interruptSound({
        sound: track,
        seconds_listened: Math.floor(position)
      });
    const trackData = await TrackPlayer.getTrack(track);
    if (trackData && trackData.duration - position < TRACK_FINISHED_THRESHOLD) {
      await activityService.finishSound({ sound: track });
    }
  });
};
