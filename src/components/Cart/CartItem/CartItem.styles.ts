import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../../../theme';

export const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.m,
    marginBottom: spacing.m,
  },

  container: {
    flexDirection: 'row',
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: radius.s,
    marginRight: spacing.m,
  },

  content: {
    flex: 1,
  },

  title: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },

  brand: {
    ...typography.caption,
    color: colors.text.secondary,
    marginBottom: spacing.s,
  },

  priceContainer: {
    marginBottom: spacing.m,
  },

  unitPrice: {
    ...typography.caption,
    color: colors.text.secondary,
  },

  totalPrice: {
    ...typography.bodySmall,
    fontWeight: 'bold',
    color: colors.text.primary,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.s,
  },

  quantityButton: {
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    minWidth: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  quantityButtonText: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.primary,
  },

  quantity: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text.primary,
    minWidth: 30,
    textAlign: 'center',
  },
});
