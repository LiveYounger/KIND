import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { getDurationString } from '../../../helpers';
import { btnBase, btnTransparent, listItemBtn } from '../../../styles/buttons';
import { uFlexAlignCenter, uFlexRow, uGapRight, uTextWhite } from '../../../styles/utilities';
import { iconBase } from '../../../styles/icons';
import variables from '../../../styles/variables';
import IconLock from '../../../assets/icons/lock.svg';
import IconPlay from '../../../assets/icons/play.svg';
import { userSelector } from '../../../store/selectors/UserSelector';

const PlaylistItem = ({ item, onClick, navigation, isAlamSongItem }) => {
  const user = useSelector(userSelector());
  const locked = item.is_premium && !user.is_premium;
  const Icon = locked ? IconLock : IconPlay;

  return (
    <View style={!isAlamSongItem ? listItemBtn : styles.item}>
      <TouchableOpacity
        style={[btnBase, btnTransparent, styles.textWrap]}
        onPress={locked ? () => navigation.navigate('UnlockPremium') : onClick}
      >
        <Text style={uTextWhite}>{item.name}</Text>
      </TouchableOpacity>
      <View style={[uFlexRow, uFlexAlignCenter]}>
        <Text style={[uTextWhite, uGapRight]}>{getDurationString(item.duration_seconds)}</Text>
        <TouchableOpacity
          style={[btnBase, btnTransparent]}
          onPress={locked ? () => navigation.navigate('UnlockPremium') : onClick}
        >
          <Icon style={[iconBase, styles.iconPlay]} fill={variables.colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconPlay: { position: 'absolute', right: 15 },
  item: {
    alignItems: 'center',
    borderBottomColor: variables.colors.almostBlack,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5
  },
  textWrap: { width: '75%' }
});

PlaylistItem.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func,
  navigation: PropTypes.object,
  isAlamSongItem: PropTypes.bool
};

export default PlaylistItem;
