import { StyleSheet } from 'react-native';
import { FONTS, FONT_SIZES, FONT_WEIGHTS } from './typography';

export const globalStyles = StyleSheet.create({
  // Default text style with Ubuntu font
  defaultText: {
    fontFamily: FONTS.primary,
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.regular,
  },

  // Container styles
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Common spacing
  padding: {
    padding: 16,
  },

  paddingHorizontal: {
    paddingHorizontal: 16,
  },

  paddingVertical: {
    paddingVertical: 16,
  },

  margin: {
    margin: 16,
  },

  marginHorizontal: {
    marginHorizontal: 16,
  },

  marginVertical: {
    marginVertical: 16,
  },

  // Flex utilities
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  flexRow: {
    flexDirection: 'row',
  },

  flexRowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Shadow styles
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // Border styles
  borderRadius: {
    borderRadius: 8,
  },

  borderRadiusLarge: {
    borderRadius: 16,
  },
});

export default globalStyles;
