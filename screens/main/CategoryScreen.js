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
  screenContent,
  screenPadTopMore,
  screenTitle,
  screenTitleSm,
  screenWrap
} from '../../styles/screens';
import {
  uFlexAlignCenter,
  uFlex1AlignCenter,
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
import {
  categoriesItemsSelector,
  allCategoriesSelector
} from '../../store/selectors/CategorySelector';
import TrackPlayer from 'react-native-track-player';
import { OS_TYPES } from '../../constants';
import { setWasPlaying } from '../../store/actions/AudioPlayerAction';
import {
  getCategoriesItems,
  loadMoreCategoriesItems,
  setActiveCategoryItem,
  resetCategoriesItemsData,
  getCategoryTabs
} from '../../store/actions/CategoryActions';
import { loadingSelector } from '../../store/selectors/CategorySelector';
import { hasNotch } from 'react-native-device-info';
import { AntDesign } from '@expo/vector-icons';

const CategoryScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState(-1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const user = useSelector(userSelector());
  const wasPlaying = useSelector(wasPlayingSelector());
  const categoryItems = useSelector(categoriesItemsSelector());
  const allCategories = useSelector(allCategoriesSelector());
  const [categoryTabs, setCategoryTabs] = useState(null);
  const dispatch = useDispatch();
  const loader = useSelector(loadingSelector());

  let name = navigation.getParam('categoryName');

  useEffect(
    () => {
      dispatch(getCategoryTabs(selectedCategory));
      dispatch(
        getCategoriesItems(
          selectedTab < 0
            ? { category: selectedCategory }
            : { categories_tabs: selectedTab, category: selectedCategory }
        )
      );
    },
    [selectedCategory]
  );

  useEffect(
    () => {
      if (allCategories) {
        const screenCategory = allCategories.find(category => category.name === name);
        if (screenCategory) {
          setSelectedCategory(screenCategory.id);
        }
      }
    },
    [allCategories, name]
  );

  useEffect(
    () => {
      if (categoryItems.isAll) {
        const tabs = generateCategoryTabs(categoryItems.categoryTabs);
        setCategoryTabs(tabs);
      }
    },
    [categoryItems]
  );

  useEffect(() => {
    return () => {
      dispatch(resetCategoriesItemsData());
    };
  }, []);

  useEffect(
    () => {
      if (allCategories) {
        const screenCategory = allCategories.find(category => category.name === name);
        if (screenCategory) {
          setSelectedCategory(screenCategory.id);
        }
      }
    },
    [allCategories]
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
    console.log('generate ', meditationItems);
    let newArr = [{ id: -1, name: 'All' }, ...meditationItems];
    return Array.from(newArr);
  };

  const refresh = () => {
    dispatch(
      getCategoriesItems(
        selectedTab < 0
          ? { category: selectedCategory }
          : { category: selectedCategory, categories_tabs: selectedTab }
      )
    );
  };

  const filter = id => {
    setSelectedTab(id);
    dispatch(
      getCategoriesItems(
        id < 0
          ? { category: selectedCategory }
          : { category: selectedCategory, categories_tabs: id }
      )
    );
  };

  const handleCategoryItemPress = categoryItem => {
    dispatch(setActiveCategoryItem(categoryItem));
    navigation.navigate(
      categoryItem.is_premium && !user.is_premium ? 'UnlockPremium' : 'ActiveCategoryItem',
      { categoryItemId: categoryItem.id }
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
    if (categoryItems.next) {
      dispatch(loadMoreCategoriesItems(categoryItems.next));
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

  const addStyle = hasNotch() ? screenPadTopMore : { paddingTop: 15 };

  return (
    <View style={[screenWrap, screenBlack]}>
      <OfflineWarning />
      <View style={[screenContent, addStyle]}>
        <View style={[uFlexRow, uFlexAlignCenter, uFlexJustifyBetween, uGapBottom]}>
          <View style={[uFlex1AlignCenter, uFlexRow, uFlexJustifyBetween]}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <AntDesign name="left" size={26} color={variables.colors.white} />
            </TouchableOpacity>
            <Text style={[screenTitle, screenTitleSm]}>{name}</Text>
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
        </View>
        <InfiniteScrollList
          additionalContainerStyles={isTrackPlayerInitialized() ? uPadBottom4xl : uPadBottomXxl}
          data={categoryItems.results}
          refresh={refresh}
          refreshing={false}
          fetchMore={fetchMore}
          onItemPress={handleCategoryItemPress}
          navigation={navigation}
          premiumButtonVisible={!user.is_premium && !!categoryItems.results.length}
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
CategoryScreen.propTypes = {
  navigation: PropTypes.object,
  categoryName: PropTypes.string
};

export default CategoryScreen;
