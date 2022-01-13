import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  ScrollView
} from 'react-native';
import $t from 'react-native-i18n';
import {
  screenBlack,
  screenContent,
  screenPadTop,
  screenTitle,
  screenWrap
} from '../../styles/screens';
import { uFlexAlignCenter, uFlexJustifyBetween, uFlexRow } from '../../styles/utilities';
import OfflineWarning from '../../components/shared/OfflineWarning';
import { otherCategoriesSelector } from '../../store/selectors/CategorySelector';
import { setSelectedCategory, clearCategoryTabs } from '../../store/actions/CategoryActions';
import variables from '../../styles/variables';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import IconChevron from '../../assets/icons/chevron.svg';
import IconLibrary from '../../assets/icons/library.svg';
import DashboardIcon from '../../assets/icons/dashboard.svg';
import { uRotate180 } from '../../styles/utilities';
import { iconBase, base, iconLg } from '../../styles/icons';
import StoreIcon from '../../assets/icons/store.svg';
import FlareIcon from '../../assets/icons/flare.svg';
import HeadsetIcon from '../../assets/icons/headset.svg';
import MusicNoteIcon from '../../assets/icons/music_note.svg';
import SleepTimerIcon from '../../assets/icons/sleep-timer.svg';
import { TextInput } from 'react-native-gesture-handler';
import IconUser from '../../assets/icons/user.svg';
import { userSelector } from '../../store/selectors/UserSelector';
// import { activeSceneSelector } from '../../store/selectors/ScenesSelector';
import sceneService from '../../services/SceneService';
import { withNavigation } from 'react-navigation';

const MoreTabScreen = props => {
  const categories = useSelector(otherCategoriesSelector());
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [searchTerm, setSearchTerm] = useState('');

  const user = useSelector(userSelector());

  useEffect(() => {
    let listener = props.navigation.addListener('willFocus', () => {
      dispatch(clearCategoryTabs());
    });
    return () => listener.remove();
  }, []);

  useEffect(
    () => {
      const arr = categories.filter(category => category.name.includes(searchTerm));
      setFilteredCategories(arr);
    },
    [searchTerm]
  );

  const dispatch = useDispatch();

  let Touchable = TouchableOpacity;
  if (Platform.OS === 'android') {
    Touchable = TouchableNativeFeedback;
  }

  const onItemPress = item => {
    dispatch(setSelectedCategory(item.name));
    props.navigation.navigate('CategoryScreen', { categoryName: item.name });
  };

  const renderCategories = () => {
    return filteredCategories.map(category => {
      return (
        <Touchable key={category.id} onPress={() => onItemPress(category)}>
          <LinearGradient
            style={styles.categoryItem}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            colors={
              category.secondColor ? [category.color, category.secondColor] : ['#911358', '#e57652']
            }
          >
            <View style={styles.leftItemView}>
              {renderItemIcon(category.name)}
              <Text style={styles.categoryItemName}>{category.name}</Text>
            </View>
            <IconChevron style={[iconBase, base, uRotate180]} fill={variables.colors.white} />
          </LinearGradient>
        </Touchable>
      );
    });
  };

  const renderItemIcon = itemName => {
    switch (itemName) {
    case 'Music':
      return <MusicNoteIcon style={styles.icon} />;
    case 'Reflection Courses':
      return <FlareIcon style={styles.icon} />;
    case 'Audio Books':
      return <HeadsetIcon style={styles.icon} />;
    case 'Library':
      return <IconLibrary style={styles.icon} />;
    default:
      return <DashboardIcon style={styles.icon} />;
    }
  };

  const renderFixedItems = () => {
    return (
      <>
        <Touchable onPress={() => props.navigation.navigate('Shop')}>
          <LinearGradient
            style={styles.categoryItem}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            colors={['#4a1391', '#7152e5']}
          >
            <View style={styles.leftItemView}>
              <StoreIcon style={styles.icon} />
              <Text style={styles.categoryItemName}>Products</Text>
            </View>
            <IconChevron style={[iconBase, base, uRotate180]} fill={variables.colors.white} />
          </LinearGradient>
        </Touchable>
        <Touchable onPress={() => props.navigation.navigate('SleepTimerSetup')}>
          <LinearGradient
            style={styles.categoryItem}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            colors={['#135691', '#5290e5']}
          >
            <View style={styles.leftItemView}>
              <SleepTimerIcon style={styles.icon} />
              <Text style={styles.categoryItemName}>Best Me</Text>
            </View>
            <IconChevron style={[iconBase, base, uRotate180]} fill={variables.colors.white} />
          </LinearGradient>
        </Touchable>
      </>
    );
  };

  return (
    <View style={[screenWrap, screenBlack]}>
      <OfflineWarning />
      <View style={[screenContent, screenPadTop]}>
        <View style={[uFlexRow, uFlexAlignCenter, uFlexJustifyBetween]}>
          <Text style={[screenTitle, base, styles.textMore]}>{$t('main.more')}</Text>
          <TouchableOpacity
            onPress={() => {
              if (user.is_guest) sceneService.stopScene();
              props.navigation.navigate(user.is_guest ? 'Welcome' : 'EditProfileMore');
            }}
          >
            <IconUser fill={variables.colors.white} style={[iconBase, iconLg]} />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Library"
          placeholderTextColor="#fff"
          onChangeText={text => setSearchTerm(text)}
        />
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
          {renderFixedItems()}
          {renderCategories()}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    height: 72,
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  categoryItemName: {
    color: variables.colors.white,
    fontFamily: variables.fontFamily.bold,
    fontSize: 22
  },
  icon: {
    marginRight: 23
  },
  leftItemView: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  scrollView: { flex: 1 },
  scrollViewContainer: { paddingBottom: 50 },
  searchBar: {
    backgroundColor: '#373d41',
    borderRadius: 10,
    color: '#fff',
    fontFamily: variables.fontFamily.regular,
    fontSize: variables.fontSize.base,
    height: 50,
    letterSpacing: -0.2,
    lineHeight: 19,
    marginBottom: 15,
    padding: 15
  },
  textMore: { marginBottom: 9 }
});

MoreTabScreen.propTypes = {
  navigation: PropTypes.object
};
export default withNavigation(MoreTabScreen);
