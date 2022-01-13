import Layout from '../constants/Layout';
import variables from '../styles/variables';
import { uTextCenter, uTextWhite } from './utilities';

export const modalOverlay = {
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'flex-end',
  backgroundColor: variables.colors.black50
};

export const modalPopupWrap = {
  width: '100%',
  backgroundColor: variables.colors.black
};

export const modalHeader = {
  padding: variables.gutters.base
};

export const modalTitle = {
  fontSize: variables.fontSize.md,
  fontFamily: variables.fontFamily.extrabold
};

export const modalBody = {
  paddingHorizontal: variables.gutters.base,
  marginBottom: variables.gutters.base
};

export const modalFooter = {
  paddingHorizontal: variables.gutters.base,
  paddingBottom: variables.gutters.base
};

export const modalScreen = {
  flexGrow: 1,
  width: '100%',
  height: '100%',
  backgroundColor: variables.colors.black
};

export const modalCloseBtn = {
  position: 'absolute',
  top: variables.gutters.xl,
  right: variables.gutters.base,
  zIndex: 5
};

export const modalCoverImage = {
  width: '100%',
  height: Layout.window.height / 2.5,
  marginBottom: variables.gutters.md2,
  resizeMode: 'cover',
  borderBottomLeftRadius: variables.sizes.md,
  borderBottomRightRadius: variables.sizes.md
};

export const modalStaticTitle = {
  ...uTextWhite,
  ...uTextCenter,
  marginBottom: variables.gutters.base,
  fontSize: variables.fontSize.screenTitleSm,
  fontFamily: variables.fontFamily.extrabold
};

export const modalStaticSubTitle = {
  ...uTextCenter,
  marginBottom: variables.gutters.md2,
  color: variables.colors.white50,
  fontFamily: variables.fontFamily.regular
};
