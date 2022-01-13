import { createSelector } from 'reselect';

const shopStateSlector = state => state.shopReducer;

export const shopSlector = () => {
  return createSelector(shopStateSlector, shopState => shopState);
};
