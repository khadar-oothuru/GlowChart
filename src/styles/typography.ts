import { TextStyle } from 'react-native';

// Font families
export const FONTS = {
  primary: 'Ubuntu-Regular',
  secondary: 'Italiana-Regular',
} as const;

// Font weights for Ubuntu (you can add more weights if you have them)
export const FONT_WEIGHTS = {
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
} as const;

// Font sizes
export const FONT_SIZES = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 22,
  '3xl': 24,
  '4xl': 28,
  '5xl': 32,
  '6xl': 36,
} as const;

// Typography styles using Ubuntu font
export const typography = {
  // Headings
  h1: {
    fontFamily: FONTS.primary,
    fontSize: FONT_SIZES['5xl'],
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: 40,
  } as TextStyle,

  h2: {
    fontFamily: FONTS.primary,
    fontSize: FONT_SIZES['4xl'],
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: 36,
  } as TextStyle,

  h3: {
    fontFamily: FONTS.primary,
    fontSize: FONT_SIZES['3xl'],
    fontWeight: FONT_WEIGHTS.semiBold,
    lineHeight: 32,
  } as TextStyle,

  h4: {
    fontFamily: FONTS.primary,
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.semiBold,
    lineHeight: 28,
  } as TextStyle,

  h5: {
    fontFamily: FONTS.primary,
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: 24,
  } as TextStyle,

  h6: {
    fontFamily: FONTS.primary,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: 22,
  } as TextStyle,

  // Body text
  body: {
    fontFamily: FONTS.primary,
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: 20,
  } as TextStyle,

  bodyLarge: {
    fontFamily: FONTS.primary,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: 22,
  } as TextStyle,

  bodySmall: {
    fontFamily: FONTS.primary,
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: 18,
  } as TextStyle,

  // Labels and captions
  label: {
    fontFamily: FONTS.primary,
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: 16,
  } as TextStyle,

  caption: {
    fontFamily: FONTS.primary,
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: 14,
  } as TextStyle,

  // Buttons
  button: {
    fontFamily: FONTS.primary,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semiBold,
    lineHeight: 20,
  } as TextStyle,

  buttonLarge: {
    fontFamily: FONTS.primary,
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semiBold,
    lineHeight: 24,
  } as TextStyle,

  buttonSmall: {
    fontFamily: FONTS.primary,
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: 16,
  } as TextStyle,

  // Special styles
  italic: {
    fontFamily: FONTS.primary,
    fontStyle: 'italic',
  } as TextStyle,

  // For decorative text (using Italiana)
  decorative: {
    fontFamily: FONTS.secondary,
    fontWeight: FONT_WEIGHTS.regular,
  } as TextStyle,
};

// Helper function to create custom text styles with Ubuntu font
export const createTextStyle = (
  fontSize: number,
  fontWeight: string = FONT_WEIGHTS.regular,
  color?: string,
  additionalStyles?: Partial<TextStyle>
): TextStyle => ({
  fontFamily: FONTS.primary,
  fontSize,
  fontWeight,
  ...(color && { color }),
  ...additionalStyles,
});
