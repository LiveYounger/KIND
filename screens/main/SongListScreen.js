import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { screenBlack, screenWrap, screenContent } from '../../styles/screens';
import { uFlexRow, uFlexJustifyBetween } from '../../styles/utilities';
import { ActivePlayer } from '../../components/shared/ActiveItemPlayist';
import $t from 'react-native-i18n';
import PropTypes from 'prop-types';
import Playlist from '../../components/shared/Playlist/Playlist';
import TrackPlayer from 'react-native-track-player';

import OfflineWarning from '../../components/shared/OfflineWarning';
import variables from '../../styles/variables';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentAudio } from '../../store/actions/AudioPlayerAction';
import { alarmSongSelector } from '../../store/selectors/AlarmSongSelector';
import audioPlayerService from '../../services/AudioPlayerService';
import { formatSoundToTrackObject } from '../../helpers/audioHelper';
import { AntDesign } from '@expo/vector-icons';
import { currentAudioSelector } from '../../store/selectors/AudioPlayerSelector';

const SongListScreen = ({ navigation }) => {
  const playListType = navigation.getParam('playListType');
  const alarmSongs = useSelector(alarmSongSelector());
  const [songs, setSongs] = useState([]);
  const [showPlayer, setShowPlayer] = useState(true);
  const currentAudio = useSelector(currentAudioSelector());

  useEffect(() => {
    const listener = TrackPlayer.addEventListener(
      'playback-track-changed',
      async ({ track, nextTrack }) => {
        if (!nextTrack && currentAudio && currentAudio.id === track) {
          await audioPlayerService.seekTo(0);
          await audioPlayerService.pause();
        } else {
          const nextAudio = await TrackPlayer.getTrack(nextTrack);
          if (nextAudio) {
            dispatch(setCurrentAudio(nextAudio));
          }
        }
      }
    );

    return () => {
      listener.remove();
    };
  }, []);

  useEffect(
    () => {
      const isBedtime = playListType === 'SLEEP' ? true : false;
      const filteredSongs = alarmSongs?.results?.filter(song => song.is_bedtime === isBedtime);
      setSongs(filteredSongs);
    },
    [alarmSongs]
  );

  const dispatch = useDispatch();

  const [formatedSounds, setFormatedSounds] = useState([]);

  useEffect(
    () => {
      const arr = [];
      songs?.forEach(alarmSong => {
        const item = {
          id: alarmSong.sounds[0].id,
          itemId: alarmSong.id,
          name: alarmSong.sounds[0].name,
          duration_seconds: alarmSong.sounds[0].duration_seconds,
          is_premium: alarmSong.is_premium
        };
        arr.push(item);
      });
      setFormatedSounds(arr);
    },
    [songs]
  );

  const play = async (id = null) => {
    setShowPlayer(true);
    let foundItem;
    songs.forEach(song => {
      song.sounds.forEach(sound => {
        if (sound.id === id) {
          foundItem = song;
        }
      });
    });

    dispatch(setCurrentAudio(formatSoundToTrackObject(foundItem.sounds[0], foundItem)));

    await audioPlayerService.setupAlarmSongs(songs);
    await audioPlayerService.play(id);
  };

  return (
    <View style={[screenBlack, screenWrap]}>
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
          <Text style={styles.screenTitle}>
            {playListType === 'SLEEP' ? $t('timers.bedtimeSongs') : $t('timers.wakeUpSongs')}
          </Text>
          <View style={styles.zeroOpacity}>
            <AntDesign name="left" size={26} color={variables.colors.white} />
          </View>
        </View>
        <View style={styles.playListView}>
          <Playlist
            navigation={navigation}
            sounds={formatedSounds}
            play={play}
            isAlarSongPlayList={true}
          />
        </View>
      </SafeAreaView>
      {showPlayer ? (
        <ActivePlayer
          navigation={navigation}
          onClosePress={() => {
            audioPlayerService.pause();
            setShowPlayer(false);
          }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  playListView: { flex: 1, marginTop: 30 },

  screenTitle: {
    color: variables.colors.white,
    fontFamily: variables.fontFamily.extrabold,
    fontSize: variables.fontSize.screenTitleSm
  },
  zeroOpacity: { opacity: 0 }
});

SongListScreen.propTypes = {
  navigation: PropTypes.object
};

export default SongListScreen;
