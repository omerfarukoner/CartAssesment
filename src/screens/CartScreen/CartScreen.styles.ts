import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

export const styles = StyleSheet.create({
  header: {
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
    minWidth: 60,
  },

  backButtonText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },

  headerTitle: {
    ...typography.header2,
    color: colors.text.primary,
    flex: 1,
    textAlign: 'center',
  },

  headerSpacer: {
    width: 40,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },

  listContent: {
    paddingTop: spacing.m,
  },
});
