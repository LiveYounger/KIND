import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Item from './Item';
import Layout from '../../constants/Layout';
import { uFlexJustifyBetween, uGapTop } from '../../styles/utilities';
import UnlockPremiumButton from './UnlockPremiumButton';

const InfiniteScrollList = ({
  data,
  refresh,
  refreshing,
  fetchMore,
  numBeforePremiumButton = 2,
  onItemPress,
  listHeaderComponent = null,
  navigation,
  premiumButtonVisible = true,
  additionalContainerStyles,
  isShopItem
}) => {
  const numColumns = 2;
  const tileSize = Layout.window.width / numColumns;
  const renderItem = ({ item }) => (
    <Item
      onPress={() => onItemPress(item)}
      size={tileSize}
      item={item}
      userIsPremium={!premiumButtonVisible}
      isShopItem={isShopItem}
    />
  );

  const itemList = (data, hasGapTop) => (
    <FlatList
      renderItem={renderItem}
      numColumns={2}
      columnWrapperStyle={uFlexJustifyBetween}
      style={hasGapTop ? uGapTop : {}}
      data={data}
      keyExtractor={item => item.id}
    />
  );

  const headerAndItemList = [
    { key: 0, component: listHeaderComponent },
    {
      key: 1,
      component: itemList(data.slice(0, numBeforePremiumButton), true)
    },
    {
      key: 2,
      component: premiumButtonVisible &&
        data.length > 0 && (
        <UnlockPremiumButton onPress={() => navigation.navigate('UnlockPremium')} />
      )
    },
    {
      key: 3,
      component: itemList(data.slice(numBeforePremiumButton), premiumButtonVisible)
    }
  ];

  return (
    <FlatList
      data={headerAndItemList}
      renderItem={({ item }) => item.component}
      onRefresh={refresh}
      refreshing={refreshing}
      keyExtractor={item => item.key}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.1}
      extraData={listHeaderComponent}
      contentContainerStyle={additionalContainerStyles}
    />
  );
};

InfiniteScrollList.propTypes = {
  data: PropTypes.array,
  refresh: PropTypes.func,
  refreshing: PropTypes.bool,
  fetchMore: PropTypes.func,
  numBeforePremiumButton: PropTypes.number,
  onItemPress: PropTypes.func,
  listHeaderComponent: PropTypes.any,
  navigation: PropTypes.object,
  premiumButtonVisible: PropTypes.bool,
  additionalContainerStyles: PropTypes.object,
  isShopItem: PropTypes.bool
};

export default InfiniteScrollList;
