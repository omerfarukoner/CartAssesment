import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../../../theme';

export const styles = StyleSheet.create({
  button: {
    borderRadius: radius.s,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  // Variants
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  danger: {
    backgroundColor: colors.error,
  },

  // Sizes
  small: {
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    minHeight: 32,
  },
  medium: {
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.m,
    minHeight: 44,
  },
  large: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.l,
    minHeight: 52,
  },

  // Layout
  fullWidth: {
    width: '100%',
  },

  // States
  disabled: {
    opacity: 0.5,
  },

  // Text styles
  text: {
    ...typography.button,
    textAlign: 'center',
  },
  primaryText: {
    color: colors.text.white,
  },
  secondaryText: {
    color: colors.primary,
  },
  dangerText: {
    color: colors.text.white,
  },

  // Text sizes
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },

  disabledText: {
    opacity: 0.7,
  },
});
