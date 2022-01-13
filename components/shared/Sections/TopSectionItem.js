import React from 'react';
import PropTypes from 'prop-types';
import { Platform, TouchableOpacity, TouchableNativeFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { setItemToBePlayed, setJumpToSong } from '../../../store/actions/AudioPlayerAction';
import Picture from '../Picture';
import { cardImage, cardImageLg, cardTitleWrap, cardWrap } from '../../../styles/forYouScreen';
import { BlurView } from '@react-native-community/blur';
import { BlurView as ExpoBlurView } from 'expo-blur';
import { uGapRight } from '../../../styles/utilities';
import { userSelector } from '../../../store/selectors/UserSelector';
import PremiumIcon from '../PremiumIcon';
import TopSectionInfo from './TopSectionInfo';

const SectionItem = ({ item, navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector());
  const userCanAccessItem = user?.is_premium || !item.is_premium;
  const sound = item.sounds[item.sounds.length - 1];

  let Touchable = TouchableOpacity;
  if (Platform.OS === 'android') {
    Touchable = TouchableNativeFeedback;
  }

  const play = (id = null) => {
    if (userCanAccessItem) {
      dispatch(setItemToBePlayed(item));
    }
    if (id) dispatch(setJumpToSong(id));
    else dispatch(setJumpToSong(undefined));
    const navigateTo = userCanAccessItem ? 'AudioPlayerStack' : 'UnlockPremium';
    navigation.navigate(navigateTo);
  };

  return (
    <Touchable onPress={() => play(sound.id)}>
      <View style={[cardWrap, uGapRight]}>
        <Picture uri={item.image.thumbnail} style={[cardImage, cardImageLg]} />
        <PremiumIcon visible={!userCanAccessItem} />
        {Platform.OS === 'android' ? (
          <ExpoBlurView intensity={80} tint="dark" style={cardTitleWrap}>
            <TopSectionInfo {...item} sound={sound} />
          </ExpoBlurView>
        ) : (
          <BlurView blurAmount={10} blurType="ultraThinMaterialDark" style={cardTitleWrap}>
            <TopSectionInfo {...item} sound={sound} />
          </BlurView>
        )}
      </View>
    </Touchable>
  );
};

SectionItem.propTypes = {
  item: PropTypes.object,
  navigation: PropTypes.object
};

export default SectionItem;
