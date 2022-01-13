import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import PlaylistItem from './PlaylistItem';

const Playlist = ({ sounds, play, navigation, isAlarSongPlayList }) => {
  return (
    <FlatList
      keyExtractor={item => item.id}
      data={sounds}
      renderItem={({ item }) => (
        <PlaylistItem
          navigation={navigation}
          item={item}
          onClick={() => play(item.id)}
          isAlamSongItem={isAlarSongPlayList}
        />
      )}
    />
  );
};

Playlist.propTypes = {
  sounds: PropTypes.array,
  play: PropTypes.func,
  navigation: PropTypes.object,
  isAlarSongPlayList: PropTypes.bool
};

export default Playlist;
