import { StyleSheet } from 'react-native';
import { colors, spacing, shadows } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: spacing.m,
    right: spacing.m,
    zIndex: 1000,
  },

  button: {
    ...shadows.medium,
    backgroundColor: colors.primary,
  },
});
