import {
  SHOP_ITEMS_GET,
  SHOP_ITEMS_SET,
  SHOP_ITEMS_LOAD_MORE,
  SHOP_ITEMS_APPEND
} from '../actionTypes/ShopActionTypes';

export const getShopItems = filters => {
  return {
    type: SHOP_ITEMS_GET,
    payload: filters
  };
};

export const setShopItems = data => {
  return {
    type: SHOP_ITEMS_SET,
    payload: data
  };
};

export const loadMoreShopItems = url => ({
  type: SHOP_ITEMS_LOAD_MORE,
  payload: url
});

export const shopItemsAppend = payload => ({
  type: SHOP_ITEMS_APPEND,
  payload
});
