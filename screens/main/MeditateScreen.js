import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import $t from 'react-native-i18n';

import {
  getMeditations,
  loadMoreMeditations,
  setActiveMeditation,
  getMeditationTabs
} from '../../store/actions/MeditationActions';
import { meditationsSelector } from '../../store/selectors/MeditationSelector';
import { allCategoriesSelector } from '../../store/selectors/CategorySelector';
import InfiniteScrollList from '../../components/shared/InfiniteScrollList';
import {
  screenBlack,
  screenContent,
  screenPadTop,
  screenTitle,
  screenTitleSm,
  screenWrap
} from '../../styles/screens';
import {
  uFlexAlignCenter,
  uFlexJustifyBetween,
  uFlexRow,
  uGapBottom,
  uPadBottom4xl,
  uPadBottomXxl
} from '../../styles/utilities';
import { ActivePlayer } from '../../components/shared/ActiveItemPlayist';
import { isTrackPlayerInitialized } from '../../helpers/audioHelper';
import { userSelector } from '../../store/selectors/UserSelector';
import variables from '../../styles/variables';
import IconInfo from '../../assets/icons/info.svg';
import { iconBase } from '../../styles/icons';
import FilterTile from '../../components/shared/FilterTile';
import { FlatList } from 'react-native-gesture-handler';
import OfflineWarning from '../../components/shared/OfflineWarning';
import { wasPlayingSelector } from '../../store/selectors/AudioPlayerSelector';
import TrackPlayer from 'react-native-track-player';
import { OS_TYPES } from '../../constants';
import { setWasPlaying } from '../../store/actions/AudioPlayerAction';
import { loadingSelector } from '../../store/selectors/CategorySelector';
import { setCurrentAudio } from '../../store/actions/AudioPlayerAction';
import audioPlayerService from '../../services/AudioPlayerService';
import { currentAudioSelector } from '../../store/selectors/AudioPlayerSelector';
import { resetCategoryItemsPagination } from '../../store/actions/CategoryActions';

const MeditationScreen = ({ navigation }) => {
  const wasPlaying = useSelector(wasPlayingSelector());
  const allCategories = useSelector(allCategoriesSelector());
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryTabs, setCategoryTabs] = useState(null);
  const [selectedTab, setSelectedTab] = useState(-1);
  const loader = useSelector(loadingSelector());
  const currentAudio = useSelector(currentAudioSelector());

  const dispatch = useDispatch();
  useEffect(
    () => {
      if (selectedCategory !== null) {
        dispatch(getMeditationTabs(selectedCategory));
        dispatch(
          getMeditations(
            selectedTab < 0
              ? { category: selectedCategory }
              : { categories_tabs: selectedTab, category: selectedCategory }
          )
        );
      }
    },
    [selectedCategory]
  );

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
      if (Platform.OS === OS_TYPES.IOS) {
        const listener = TrackPlayer.addEventListener('playback-state', async ({ state }) => {
          if (state === TrackPlayer.STATE_PAUSED && wasPlaying) {
            TrackPlayer.play();
            dispatch(setWasPlaying(false));
          }
        });

        return () => {
          listener.remove();
        };
      }
    },
    [wasPlaying]
  );

  useEffect(
    () => {
      if (allCategories) {
        const screenCategory = allCategories.find(category => category.name === 'Meditate');
        if (screenCategory) {
          setSelectedCategory(screenCategory.id);
        }
      }
    },
    [allCategories]
  );

  const refresh = () => {
    dispatch(
      getMeditations(
        selectedTab < 0
          ? { category: selectedCategory }
          : { category: selectedCategory, categories_tabs: selectedTab }
      )
    );
  };

  const meditations = useSelector(meditationsSelector());
  const user = useSelector(userSelector());

  useEffect(
    () => {
      if (meditations.isAll) {
        const tabs = generateCategoryTabs(meditations.meditationTabs);
        setCategoryTabs(tabs);
      }
    },
    [meditations]
  );

  const generateCategoryTabs = meditationItems => {
    let newArr = [{ id: -1, name: 'All' }, ...meditationItems];
    return Array.from(newArr);
  };

  const filter = id => {
    setSelectedTab(id);
    dispatch(resetCategoryItemsPagination());
    dispatch(
      getMeditations(
        id < 0
          ? { category: selectedCategory }
          : { category: selectedCategory, categories_tabs: id }
      )
    );
  };

  const handleMeditationPress = meditation => {
    dispatch(setActiveMeditation(meditation));
    navigation.navigate(
      meditation.is_premium && !user.is_premium ? 'UnlockPremium' : 'ActiveMeditation',
      { meditationId: meditation.id }
    );
  };

  const categoryTile = ({ item }) => {
    return (
      <FilterTile
        name={item.name}
        onPress={() => filter(item.id)}
        isSelected={item.id === selectedTab}
      />
    );
  };

  const fetchMore = () => {
    if (meditations.next && !loader) dispatch(loadMoreMeditations(meditations.next));
  };

  const filtersComponent = (
    <FlatList
      data={categoryTabs}
      renderItem={categoryTile}
      horizontal={true}
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false}
    />
  );

  return (
    <View style={[screenWrap, screenBlack]}>
      <OfflineWarning />
      <View style={[screenContent, screenPadTop]}>
        <View style={[uFlexRow, uFlexAlignCenter, uFlexJustifyBetween, uGapBottom]}>
          <Text style={[screenTitle, screenTitleSm]}>{$t('main.meditate')}</Text>

          <TouchableOpacity
            hitSlop={{
              top: variables.gutters.sm,
              bottom: variables.gutters.sm,
              left: variables.gutters.sm,
              right: variables.gutters.sm
            }}
            onPress={() => navigation.navigate('Info', { infoId: 'info-meditations' })}
          >
            <IconInfo style={iconBase} fill={variables.colors.white} />
          </TouchableOpacity>
        </View>

        <InfiniteScrollList
          additionalContainerStyles={isTrackPlayerInitialized() ? uPadBottom4xl : uPadBottomXxl}
          data={loader ? [] : meditations.results}
          refresh={refresh}
          refreshing={false}
          fetchMore={fetchMore}
          onItemPress={handleMeditationPress}
          navigation={navigation}
          premiumButtonVisible={!user.is_premium && !!meditations.results.length}
          listHeaderComponent={filtersComponent}
        />
        {loader && <ActivityIndicator size="large" style={styles.loader} />}
      </View>

      {<ActivePlayer navigation={navigation} />}
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  }
});

MeditationScreen.propTypes = {
  navigation: PropTypes.object
};

export default MeditationScreen;
