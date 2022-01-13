import variables from '../styles/variables';

export const inputFieldWrap = {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: variables.gutters.xs,
  paddingHorizontal: variables.gutters.base,
  height: 50,
  backgroundColor: variables.colors.white20,
  borderRadius: 10,
  borderColor: variables.colors.white,
  borderWidth: 1
};

export const inputField = {
  flexGrow: 1,
  color: variables.colors.white,
  fontSize: variables.fontSize.base,
  fontFamily: variables.fontFamily.regular,
  backgroundColor: 'transparent'
};

export const inputFieldInline = {
  ...inputFieldWrap,
  marginBottom: 0
};

export const fieldIsActive = {
  fontWeight: variables.fontWeight.bold,
  backgroundColor: variables.colors.white50
};
