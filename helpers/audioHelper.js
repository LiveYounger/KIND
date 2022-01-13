import TrackPlayer, { usePlaybackState } from 'react-native-track-player';

export const formatToTrackObject = sleepOrMeditation => {
  return sleepOrMeditation.sounds.map(song => formatSoundToTrackObject(song, sleepOrMeditation));
};

export const formatSoundToTrackObject = (song, sleepOrMeditation) => {
  return {
    itemId: sleepOrMeditation.id,
    artist: song.name,
    artwork: sleepOrMeditation.image.thumbnail,
    description: sleepOrMeditation.subtitle,
    duration: song.duration_seconds,
    id: song.id,
    title: sleepOrMeditation.title,
    url: song.audio_file,
    waveform: song.waveform,
    is_premium: song.is_premium
  };
};

export const isTrackPlayerInitialized = () => {
  const playbackState = usePlaybackState();

  return (
    playbackState === TrackPlayer.STATE_PLAYING ||
    playbackState === TrackPlayer.STATE_BUFFERING ||
    playbackState === TrackPlayer.STATE_PAUSED
  );
};

export const isTrackPlaying = async () => {
  const playbackState = await TrackPlayer.getState();

  return (
    playbackState === TrackPlayer.STATE_BUFFERING || playbackState === TrackPlayer.STATE_PLAYING
  );
};

export const shouldDisablePrevNextButtons = async () => {
  const currentTrackId = await TrackPlayer.getCurrentTrack();
  const queue = await TrackPlayer.getQueue();

  let currentTrackPosition;
  const isTrackInQueue = queue.some((track, index) => {
    if (track.id == currentTrackId) {
      currentTrackPosition = index;
      return true;
    }
  });

  return isTrackInQueue
    ? {
      disablePrevious: currentTrackPosition < 1,
      disableNext: currentTrackPosition == queue.length - 1
    }
    : {
      disablePrevious: true,
      disableNext: true
    };
};
