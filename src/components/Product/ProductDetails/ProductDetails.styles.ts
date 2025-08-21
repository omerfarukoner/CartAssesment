import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },

  card: {
    marginHorizontal: spacing.m,
    marginBottom: spacing.m,
  },

  title: {
    ...typography.header2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },

  brand: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.m,
  },

  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.l,
  },

  rating: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },

  category: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    textTransform: 'capitalize',
  },

  priceSection: {
    marginBottom: spacing.l,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },

  originalPrice: {
    ...typography.body,
    color: colors.text.secondary,
    textDecorationLine: 'line-through',
    marginRight: spacing.m,
  },

  discountBadge: {
    backgroundColor: colors.error,
    borderRadius: radius.xs,
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.xs,
  },

  discountText: {
    ...typography.caption,
    color: colors.text.white,
    fontWeight: 'bold',
  },

  discountedPrice: {
    ...typography.header2,
    color: colors.error,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },

  price: {
    ...typography.header2,
    color: colors.text.primary,
    fontWeight: 'bold',
  },

  savings: {
    ...typography.bodySmall,
    color: colors.success,
    fontWeight: '600',
  },

  stockContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.m,
    marginBottom: spacing.m,
  },

  stock: {
    ...typography.bodySmall,
    color: colors.success,
    marginBottom: spacing.xs,
  },

  outOfStock: {
    color: colors.error,
  },

  inCartText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },

  sectionTitle: {
    ...typography.header3,
    color: colors.text.primary,
    marginBottom: spacing.m,
  },

  description: {
    ...typography.body,
    color: colors.text.secondary,
    lineHeight: 24,
  },

  buttonContainer: {
    padding: spacing.m,
    backgroundColor: colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  scrollContent: {
    paddingBottom: 106,
  },
});
