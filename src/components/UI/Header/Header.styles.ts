import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.m,
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  backButton: {
    padding: spacing.s,
    minWidth: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    ...typography.header3,
    color: colors.text.primary,
    flex: 1,
    textAlign: 'center',
  },

  spacer: {
    width: 40,
  },
});
