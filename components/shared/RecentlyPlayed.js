import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import $t from 'react-native-i18n';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { itemService } from '../../services/ItemService';
import { setItemToBePlayed } from '../../store/actions/AudioPlayerAction';
import { uPosAbs, uPosRightBottomBase } from '../../styles/utilities';
import {
  cardImage,
  cardTitle,
  cardWrap,
  recentPlayTitle,
  sectionImgRecentPlay,
  sectionTitle
} from '../../styles/forYouScreen';
import IconPlayCircle from '../../assets/icons/play-circle.svg';
import variables from '../../styles/variables';
import { iconBase, iconLg } from '../../styles/icons';
import Picture from './Picture';

const RecentlyPlayed = ({ activity, navigation }) => {
  const dispatch = useDispatch();
  const [soundParent, setParent] = useState();

  async function fetchParent() {
    const response = await itemService.getItem(activity.sound.item);
    setParent(response.data);
  }

  useEffect(
    () => {
      fetchParent();
    },
    [activity]
  );

  const play = () => {
    dispatch(setItemToBePlayed(soundParent));
    navigation.navigate('AudioPlayerStack');
  };

  return soundParent ? (
    <>
      <Text style={sectionTitle}>{$t('audioPlayer.recentlyPlayer')}</Text>

      <TouchableOpacity onPress={play} style={cardWrap}>
        <Picture uri={soundParent?.image.thumbnail} style={[sectionImgRecentPlay, cardImage]} />
        <Text style={[cardTitle, recentPlayTitle]}>{soundParent?.title}</Text>

        <IconPlayCircle
          style={[iconBase, iconLg, uPosAbs, uPosRightBottomBase]}
          fill={variables.colors.white}
        />
      </TouchableOpacity>
    </>
  ) : null;
};

RecentlyPlayed.propTypes = {
  activity: PropTypes.shape({
    sound: PropTypes.shape({
      item: PropTypes.number,
      title: PropTypes.string
    })
  }),
  navigation: PropTypes.object
};

export default RecentlyPlayed;
