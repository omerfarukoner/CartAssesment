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

  headerTitle: {
    ...typography.header2,
    color: colors.text.primary,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },

  listContent: {
    padding: spacing.s,
  },

  loadingFooter: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
  },

  footerSpacer: {
    height: 40,
  },
});
