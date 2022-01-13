import React from 'react';
import PropTypes from 'prop-types';
import { Platform, Text, TouchableOpacity, View, TouchableNativeFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { setItemToBePlayed, setJumpToSong } from '../../../store/actions/AudioPlayerAction';
import Picture from '../Picture';
import { uGapRight } from '../../../styles/utilities';
import {
  cardImage,
  cardImageSm,
  cardTitle,
  cardTitleSm,
  cardTitleWrap,
  cardTitleWrapSm,
  cardWrap
} from '../../../styles/forYouScreen';
import { BlurView } from '@react-native-community/blur';
import { BlurView as ExpoBlurView } from 'expo-blur';
import { userSelector } from '../../../store/selectors/UserSelector';
import PremiumIcon from '../PremiumIcon';

const SectionItem = ({ item, navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector());
  const userCanAccessItem = user.is_premium || !item.is_premium;

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
    <Touchable onPress={() => play()}>
      <View style={[cardWrap, uGapRight]}>
        <Picture uri={item.image.thumbnail} style={[cardImage, cardImageSm]} />
        <PremiumIcon visible={!userCanAccessItem} />
        {Platform.OS === 'android' ? (
          <ExpoBlurView intensity={80} tint="dark" style={[cardTitleWrap, cardTitleWrapSm]}>
            <Text style={[cardTitle, cardTitleSm]}>{item.title}</Text>
          </ExpoBlurView>
        ) : (
          <BlurView
            blurAmount={10}
            blurType="ultraThinMaterialLight"
            style={[cardTitleWrap, cardTitleWrapSm]}
          >
            <Text style={[cardTitle, cardTitleSm]}>{item.title}</Text>
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
