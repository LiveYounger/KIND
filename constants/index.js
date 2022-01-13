import { Platform } from 'react-native';

export const PERMISSIONS_STATUS = {
  GRANTED: 'granted'
};
export const OS_TYPES = { ANDROID: 'android', IOS: 'ios' };
export const DEFAULT = 'Default';
export const NOTIFICATION = 'Notification';
export const NOTIFICATION_ORIGIN = {
  SELECTED: 'selected',
  RECEIVED: 'received'
};
export const APP_STATE = {
  BACKGROUND: 'background'
};

export const SPEC_CHAR_AND_NUMBER_REGEX = /^(?=.*[!@#$%^&*_0-9])/;

export const PREMIUM_SUBSCRIPTION_SKU = Platform.select({
  ios: 'com.liveyoungerhealth.LiveYounger.premium_sub',
  android: 'com.kind.app.premium'
});

export const TOP_SECTIONS_TITLES = ['Quick and Easy'];
