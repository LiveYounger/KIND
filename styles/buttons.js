import { uFlexGrow, uTextBaseSize, uTextCenter, uTextWhite } from './utilities';
import variables from './variables';

export const btnBase = {
  flexDirection: 'row',
  alignItems: 'center',
  borderColor: variables.colors.white,
  borderRadius: 10,
  borderWidth: 1,
  paddingVertical: variables.gutters.base,
  paddingHorizontal: variables.gutters.md
};

export const btnGradientWrap = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: 'transparent',
  backgroundColor: variables.colors.black
};

export const btnWhite = {
  backgroundColor: variables.colors.white
};

export const btnTransparent = {
  backgroundColor: 'transparent',
  borderColor: 'transparent'
};

export const btnSm = {
  paddingVertical: variables.gutters.xs,
  paddingHorizontal: variables.gutters.md
};

export const btnMd = {
  paddingVertical: variables.gutters.sm,
  paddingHorizontal: variables.gutters.lg
};

export const iconBtnTextLabelWhite = {
  ...uTextWhite,
  ...uTextBaseSize,
  ...uFlexGrow,
  ...uTextCenter,
  fontFamily: variables.fontFamily.extrabold
};

export const listItemBtn = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingVertical: variables.gutters.md2,
  borderBottomColor: variables.colors.almostBlack,
  borderBottomWidth: 1
};

export const btnPlayWrap = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: -variables.gutters.base,
  marginBottom: variables.gutters.lg
};

export const btnPlay = {
  alignItems: 'center',
  justifyContent: 'center',
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: 'lightblue'
};

export const btnPlaySm = {
  width: 40,
  height: 40,
  borderRadius: 20
};
