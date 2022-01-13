import variables from '../styles/variables';

export const screenWrap = {
  flexGrow: 1,
  width: '100%',
  height: '100%',
  backgroundColor: variables.colors.blueAlmostBlack
};

export const screenContent = {
  flexGrow: 1,
  margin: variables.gutters.md
};

export const screenContentWihoutMargin = {
  flexGrow: 1
};

export const screenPadTop = {
  paddingTop: variables.gutters.md
};

export const screenPadTopMore = {
  paddingTop: variables.gutters.lg2
};

export const screenBlack = {
  backgroundColor: variables.colors.blueAlmostBlack
};

export const screenContentCenter = {
  flexGrow: 1,
  justifyContent: 'center'
};

export const screenTitle = {
  color: variables.colors.white,
  marginBottom: variables.gutters.xl,
  fontSize: variables.fontSize.screenTitle,
  fontFamily: variables.fontFamily.extrabold
};

export const screenTitleSm = {
  fontSize: variables.fontSize.screenTitleSm,
  fontFamily: variables.fontFamily.bold,
  marginBottom: 0
};

export const screenTitleCenter = {
  fontSize: variables.fontSize.screenTitleSm,
  fontFamily: variables.fontFamily.bold,
  marginBottom: 0,
  alignSelf: 'center'
};

export const appHeaderTitle = {
  color: variables.colors.white,
  textAlign: 'center',
  fontSize: variables.fontSize.base,
  fontFamily: variables.fontFamily.semibold
};

export const bottomTabBarWrap = {
  position: 'absolute',
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 5,
  height: variables.sizes.bottomTabBarHeight,
  paddingTop: variables.gutters.base,
  backgroundColor: variables.colors.black75,
  borderTopLeftRadius: variables.sizes.sm,
  borderTopRightRadius: variables.sizes.sm
};

export const tabBarActive = {
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0
};

export const bottomTabBar = {
  borderTopWidth: 0,
  backgroundColor: 'transparent'
};

export const headerStyle = {
  height: variables.sizes.appHeaderHeight
};
