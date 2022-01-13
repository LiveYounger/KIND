import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
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
  uGapBottom
} from '../../styles/utilities';
import OfflineWarning from '../../components/shared/OfflineWarning';
import { hasNotch } from 'react-native-device-info';
import { getShopItems, loadMoreShopItems } from '../../store/actions/ShopActions';
import { shopSlector } from '../../store/selectors/ShopSelector';
import { loadingSelector } from '../../store/selectors/CategorySelector';
import { AntDesign } from '@expo/vector-icons';
import variables from '../../styles/variables';
const addStyle = hasNotch() ? screenPadTopMore : { paddingTop: 15 };

const ShopScreen = ({ navigation }) => {
  const shop = useSelector(shopSlector());
  const loader = useSelector(loadingSelector());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShopItems());
  }, []);

  const fetchMore = () => {
    if (shop.next) {
      dispatch(loadMoreShopItems(shop.next));
    }
  };
  const refresh = () => {
    dispatch(getShopItems());
  };

  const onItemPress = item => {
    navigation.navigate('ShopItemWebView', { itemUri: item.url });
  };

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
            <Text style={[screenTitle, screenTitleSm]}>Products</Text>
            <View style={styles.zeroOpacity}>
              <AntDesign name="left" size={26} color={variables.colors.white} />
            </View>
          </View>
        </View>
        <View style={styles.flatListWrap}>
          <InfiniteScrollList
            data={loader ? [] : shop.results}
            refresh={refresh}
            refreshing={false}
            fetchMore={fetchMore}
            navigation={navigation}
            isShopItem={true}
            onItemPress={onItemPress}
            premiumButtonVisible={false}
            listHeaderComponent={null}
          />
        </View>
      </View>
      {loader && <ActivityIndicator size="large" style={styles.loader} />}
    </View>
  );
};

const styles = StyleSheet.create({
  flatListWrap: { flex: 1, paddingBottom: 130 },
  loader: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  },
  zeroOpacity: { opacity: 0 }
});

ShopScreen.propTypes = {
  navigation: PropTypes.object
};

export default ShopScreen;
