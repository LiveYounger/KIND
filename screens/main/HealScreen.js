import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import InfiniteScrollList from '../../components/shared/InfiniteScrollList';
import {
  screenBlack,
  screenPadTop,
  screenContent,
  screenTitle,
  screenTitleSm,
  screenWrap
} from '../../styles/screens';
import $t from 'react-native-i18n';
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
import { libraryItemsSelector } from '../../store/selectors/LibrarySelector';
import { allCategoriesSelector } from '../../store/selectors/CategorySelector';
import TrackPlayer from 'react-native-track-player';
import { OS_TYPES } from '../../constants';
import { setWasPlaying } from '../../store/actions/AudioPlayerAction';
import {
  getLibraryItems,
  loadMoreLibraryItems,
  setActiveLibraryItem,
  getLibraryTabs
} from '../../store/actions/LibraryActions';
import { loadingSelector } from '../../store/selectors/CategorySelector';
import { setCurrentAudio } from '../../store/actions/AudioPlayerAction';
import audioPlayerService from '../../services/AudioPlayerService';
import { currentAudioSelector } from '../../store/selectors/AudioPlayerSelector';

const HealScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState(-1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const user = useSelector(userSelector());
  const wasPlaying = useSelector(wasPlayingSelector());
  const libraryItems = useSelector(libraryItemsSelector());
  const allCategories = useSelector(allCategoriesSelector());
  const [categoryTabs, setCategoryTabs] = useState(null);
  const dispatch = useDispatch();
  const loader = useSelector(loadingSelector());
  const currentAudio = useSelector(currentAudioSelector());

  useEffect(
    () => {
      dispatch(getLibraryTabs(selectedCategory));
      dispatch(
        getLibraryItems(
          selectedTab < 0
            ? { category: selectedCategory }
            : { categories_tabs: selectedTab, category: selectedCategory }
        )
      );
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
      if (allCategories) {
        const screenCategory = allCategories.find(category => category.name === 'Heal');
        if (screenCategory) {
          setSelectedCategory(screenCategory.id);
        }
      }
    },
    [allCategories]
  );

  useEffect(
    () => {
      if (libraryItems.isAll) {
        const tabs = generateCategoryTabs(libraryItems.libraryTabs);
        setCategoryTabs(tabs);
      }
    },
    [libraryItems]
  );

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

  const generateCategoryTabs = meditationItems => {
    let newArr = [{ id: -1, name: 'All' }, ...meditationItems];
    return Array.from(newArr);
  };

  const refresh = () => {
    dispatch(
      getLibraryItems(
        selectedTab < 0
          ? { category: selectedCategory }
          : { category: selectedCategory, categories_tabs: selectedTab }
      )
    );
  };

  const filter = id => {
    setSelectedTab(id);
    dispatch(
      getLibraryItems(
        id < 0
          ? { category: selectedCategory }
          : { category: selectedCategory, categories_tabs: id }
      )
    );
  };

  const handleCategoryItemPress = categoryItem => {
    dispatch(setActiveLibraryItem(categoryItem));
    navigation.navigate(
      categoryItem.is_premium && !user.is_premium ? 'UnlockPremium' : 'ActiveLibraryItem',
      { libraryItemId: categoryItem.id }
    );
  };

  const categoryTile = ({ item }) => (
    <FilterTile
      name={item.name}
      onPress={() => filter(item.id)}
      isSelected={item.id == selectedTab}
    />
  );

  const fetchMore = () => {
    if (libraryItems.next && !loader) {
      dispatch(loadMoreLibraryItems(libraryItems.next));
    }
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
          <Text style={[screenTitle, screenTitleSm]}>{$t('main.heal')}</Text>

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
          data={loader ? [] : libraryItems.results}
          refresh={refresh}
          refreshing={false}
          fetchMore={fetchMore}
          onItemPress={handleCategoryItemPress}
          navigation={navigation}
          premiumButtonVisible={!user.is_premium && !!libraryItems.results.length}
          listHeaderComponent={filtersComponent}
        />
      </View>
      {loader && <ActivityIndicator size="large" style={styles.loader} />}

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

HealScreen.propTypes = {
  navigation: PropTypes.object,
  categoryName: PropTypes.string
};

export default HealScreen;
