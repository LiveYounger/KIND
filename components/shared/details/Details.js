import React from 'react';
import PropTypes from 'prop-types';
import { setItemToBePlayed, setJumpToSong } from '../../../store/actions/AudioPlayerAction';
import { useDispatch } from 'react-redux';
import DetailsWithPlaylist from './DetailsWithPlaylist';
import DetailsWithDescription from './DetailsWithDescription';

const Details = ({ item, navigation }) => {
  const dispatch = useDispatch();

  const hasPlaylist = item.sounds.length > 1;
  const play = (id = null) => {
    dispatch(setItemToBePlayed(item));
    if (id) dispatch(setJumpToSong(id));
    else dispatch(setJumpToSong(undefined));
    navigation.navigate('AudioPlayerStack');
  };

  const Component = hasPlaylist ? DetailsWithPlaylist : DetailsWithDescription;

  return <Component item={item} play={play} navigation={navigation} />;
};

Details.propTypes = {
  item: PropTypes.object,
  navigation: PropTypes.object
};

export default Details;
