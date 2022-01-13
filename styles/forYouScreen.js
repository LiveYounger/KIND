import Layout from '../constants/Layout';
import variables from '../styles/variables';

export const sectionRecentPlay = {
  height: 135,
  marginHorizontal: variables.gutters.md,
  marginBottom: variables.gutters.md
};

export const sectionImgRecentPlay = {
  justifyContent: 'center',
  height: 100,
  width: '100%',
  padding: variables.gutters.base,
  borderRadius: 20,
  resizeMode: 'cover'
};

export const recentPlayTitle = {
  position: 'absolute',
  top: '50%',
  transform: [{ translateY: -variables.sizes.base }],
  left: variables.gutters.base,
  width: '95%'
};

export const sectionTitle = {
  marginBottom: variables.gutters.sm,
  color: variables.colors.white,
  fontSize: variables.fontSize.base,
  fontFamily: variables.fontFamily.semibold
};

export const cardWrap = {
  position: 'relative',
  borderRadius: 20,
  padding: 0,
  borderWidth: 2,
  borderColor: variables.colors.white,
  shadowColor: variables.colors.black,
  shadowOffset: {
    width: 0,
    height: 5
  },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 10
};

export const cardTitleWrap = {
  position: 'absolute',
  right: 0,
  bottom: 0,
  left: 0,
  paddingHorizontal: variables.gutters.base,
  paddingVertical: variables.gutters.md,
  borderRadius: 20
};

export const cardTitleWrapSm = {
  right: 0,
  bottom: 0,
  left: 0
};

export const cardTitle = {
  color: variables.colors.white,
  fontFamily: variables.fontFamily.bold,
  fontSize: variables.fontSize.screenTitleSm
};

export const cardTitleSm = {
  fontSize: variables.fontSize.base
};

export const cardImage = {
  resizeMode: 'cover',
  borderRadius: 20
};

export const cardImageSm = {
  width: (Layout.window.width - variables.gutters.md * 2 - 50) / 2,
  height: 200
};

export const cardImageLg = {
  width: Layout.window.width - variables.gutters.md * 2 - 30,
  height: 280
};
