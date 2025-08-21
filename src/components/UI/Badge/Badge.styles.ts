import { StyleSheet } from 'react-native';
import { colors, radius } from '../../../theme';

export const styles = StyleSheet.create({
  badge: {
    borderRadius: radius.round,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 20,
    paddingHorizontal: 6,
  },

  // Sizes
  small: {
    minHeight: 16,
    minWidth: 16,
    paddingHorizontal: 4,
  },
  medium: {
    minHeight: 20,
    minWidth: 20,
    paddingHorizontal: 6,
  },
  large: {
    minHeight: 24,
    minWidth: 24,
    paddingHorizontal: 8,
  },

  // Colors
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  danger: {
    backgroundColor: colors.error,
  },
  success: {
    backgroundColor: colors.success,
  },
  warning: {
    backgroundColor: colors.warning,
  },

  // Text styles
  text: {
    color: colors.text.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 10,
  },
  mediumText: {
    fontSize: 12,
  },
  largeText: {
    fontSize: 14,
  },
});
