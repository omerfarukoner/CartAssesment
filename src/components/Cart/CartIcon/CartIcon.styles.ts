import { StyleSheet } from 'react-native';
import { spacing } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    padding: spacing.s,
    position: 'relative',
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeContainer: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
});
