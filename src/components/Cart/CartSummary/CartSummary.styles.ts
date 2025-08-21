import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../../theme';

export const styles = StyleSheet.create({
  card: {
    margin: spacing.m,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.m,
  },

  label: {
    ...typography.body,
    color: colors.text.secondary,
  },

  value: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text.primary,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.m,
  },

  totalLabel: {
    ...typography.header3,
    color: colors.text.primary,
  },

  totalValue: {
    ...typography.header3,
    fontWeight: 'bold',
    color: colors.primary,
  },

  buttonContainer: {
    marginTop: spacing.m,
  },
});
