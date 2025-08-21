import { StyleSheet } from 'react-native';
import { colors, spacing, shadows, radius } from '../../../theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.card,
    borderRadius: radius.m,
    borderWidth: 1,
    borderColor: colors.border,
  },

  // Elevations
  none: {
    ...shadows.small,
    shadowOpacity: 0,
    elevation: 0,
  },
  small: {
    ...shadows.small,
  },
  medium: {
    ...shadows.medium,
  },
  large: {
    ...shadows.large,
  },

  // Padding variants
  nonePadding: {
    padding: 0,
  },
  smallPadding: {
    padding: spacing.s,
  },
  mediumPadding: {
    padding: spacing.m,
  },
  largePadding: {
    padding: spacing.l,
  },

  // States
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});
