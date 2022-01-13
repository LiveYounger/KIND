import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import variables from '../../styles/variables';
import { BlurView } from '@react-native-community/blur';
import { BlurView as ExpoBlurView } from 'expo-blur';
import { uTextWhite } from '../../styles/utilities';
import Layout from '../../constants/Layout';
import PremiumIcon from './PremiumIcon';
import Picture from './Picture';

const Item = ({ item, size, onPress, userIsPremium, isShopItem }) => {
  const itemLabel = isShopItem === true ? styles.shopItemLabel : styles.itemLabel;

  const [showBlur, setShowBlur] = useState(true);

  let opacity = showBlur ? null : { opacity: 0 };
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onPressOut={() => setShowBlur(true)}
      onLongPress={() => setShowBlur(false)}
      style={styles.item(size)}
    >
      <Picture source={{ uri: item.image.thumbnail }} style={styles.image(size)} />
      <PremiumIcon visible={!userIsPremium && item.is_premium} />
      <View style={isShopItem ? styles.shopItemLabelWrap : styles.itemLabelWrap}>
        <>
          {Platform.OS === 'android' ? (
            <ExpoBlurView intensity={80} tint="dark" style={itemLabel}>
              {isShopItem ? (
                <View style={styles.shopItemInfo}>
                  <Text style={[uTextWhite, styles.shopItemName]}>
                    {item.name.length > 30 ? item.name.substring(0, 30) : item.name}
                  </Text>
                  <Text style={[uTextWhite, styles.shopItemPrice]}>${item.price}</Text>
                </View>
              ) : (
                <Text style={uTextWhite}>{item.title}</Text>
              )}
            </ExpoBlurView>
          ) : (
            <BlurView blurAmount={10} blurType="ultraThinMaterialDark" style={[itemLabel, opacity]}>
              {isShopItem ? (
                <View style={styles.shopItemInfo}>
                  <Text style={[uTextWhite, styles.shopItemName]}>
                    {item.name.length > 30 ? item.name.substring(0, 30) : item.name}
                  </Text>
                  <Text style={[uTextWhite, styles.shopItemPrice]}>${item.price}</Text>
                </View>
              ) : (
                <Text style={uTextWhite}>{item.title}</Text>
              )}
            </BlurView>
          )}
        </>
      </View>
    </TouchableOpacity>
  );
};

Item.propTypes = {
  item: PropTypes.object,
  size: PropTypes.number,
  onPress: PropTypes.func,
  userIsPremium: PropTypes.object,
  isShopItem: PropTypes.bool
};

export default Item;

const styles = StyleSheet.create({
  image: size => ({
    width: '100%',
    height: size,
    resizeMode: 'cover',
    borderRadius: variables.sizes.md,
    borderWidth: 2,
    borderColor: variables.colors.white
  }),

  item: size => ({
    marginBottom: variables.gutters.base,
    position: 'relative',
    width: Layout.window.width / 2 - variables.gutters.lg,
    height: size
  }),

  itemLabel: {
    padding: variables.gutters.md
  },

  itemLabelWrap: {
    borderRadius: variables.sizes.md,
    bottom: 2,
    left: 2,
    overflow: 'hidden',
    position: 'absolute',
    right: 2
  },
  shopItemInfo: {
    alignItems: 'center'
  },

  shopItemLabel: {
    flex: 1,
    paddingHorizontal: variables.gutters.md,
    paddingVertical: 5
  },

  shopItemLabelWrap: {
    borderRadius: variables.sizes.md,
    bottom: 2,
    flex: 1,
    left: 2,
    overflow: 'hidden',
    position: 'absolute',
    right: 2
  },

  shopItemName: {
    fontFamily: variables.fontFamily.semibold,
    fontSize: variables.fontSize.md
  },
  shopItemPrice: {
    fontFamily: variables.fontFamily.bold,
    fontSize: variables.fontSize.md
  }
});
