import Layout from '../constants/Layout';
import variables from '../styles/variables';

export const sleepHeader = {
  position: 'relative'
};

export const sleepHeading = {
  position: 'absolute',
  right: variables.gutters.base,
  bottom: variables.gutters.base,
  left: variables.gutters.base,
  zIndex: 5,
  padding: variables.gutters.base,
  borderRadius: 10
};

export const sleepImage = {
  width: Layout.window.width - variables.gutters.md * 2,
  height: 300,
  borderRadius: 20,
  resizeMode: 'cover'
};

export const sleepTitle = {
  marginBottom: variables.gutters.sm,
  color: variables.colors.white,
  fontFamily: variables.fontFamily.bold
};

export const sleepSubTitle = {
  color: variables.colors.white,
  fontSize: variables.fontSize.sm,
  fontFamily: variables.fontFamily.regular
};
