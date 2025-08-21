import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../../../theme';

const LAYOUT_CONSTANTS = {
  imageHeight: 140,
  titleHeight: 44,
  priceAreaHeight: 36,
  buttonHeight: 36,
  cardPadding: spacing.s,
  contentPadding: spacing.s,
} as const;

const TOTAL_CARD_HEIGHT =
  LAYOUT_CONSTANTS.imageHeight +
  LAYOUT_CONSTANTS.titleHeight +
  LAYOUT_CONSTANTS.priceAreaHeight +
  LAYOUT_CONSTANTS.buttonHeight +
  LAYOUT_CONSTANTS.contentPadding * 2 +
  spacing.xs * 2;

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: LAYOUT_CONSTANTS.cardPadding / 2,
    width: '48%',
    height: TOTAL_CARD_HEIGHT,
    borderRadius: radius.m,
    backgroundColor: colors.background.card,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  image: {
    width: '100%',
    height: LAYOUT_CONSTANTS.imageHeight,
    borderTopLeftRadius: radius.m,
    borderTopRightRadius: radius.m,
    backgroundColor: colors.background.secondary,
  },

  content: {
    flex: 1,
    padding: LAYOUT_CONSTANTS.contentPadding,
    justifyContent: 'space-between',
  },

  title: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.text.primary,
    height: LAYOUT_CONSTANTS.titleHeight,
    textAlignVertical: 'top',
    marginBottom: spacing.xs,
    lineHeight: 18,
  },

  priceContainer: {
    height: LAYOUT_CONSTANTS.priceAreaHeight,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: spacing.xs / 2,
  },

  price: {
    ...typography.bodySmall,
    fontWeight: 'bold',
    color: colors.text.primary,
  },

  originalPrice: {
    ...typography.caption,
    color: colors.text.secondary,
    textDecorationLine: 'line-through',
    marginRight: spacing.xs / 2,
  },

  discountedPrice: {
    ...typography.bodySmall,
    fontWeight: 'bold',
    color: colors.error,
    marginRight: spacing.xs / 2,
  },

  discountBadge: {
    backgroundColor: colors.error,
    borderRadius: radius.xs,
    paddingHorizontal: spacing.xs / 2,
    paddingVertical: 1,
    minWidth: 32,
    alignItems: 'center',
  },

  discountText: {
    ...typography.caption,
    color: colors.text.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
});
