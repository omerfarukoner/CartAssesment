import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing } from '../../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    height: 300,
  },

  scrollView: {
    flex: 1,
  },

  image: {
    width: SCREEN_WIDTH,
    height: 300,
  },

  pagination: {
    position: 'absolute',
    bottom: spacing.m,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.text.white,
    opacity: 0.5,
    marginHorizontal: 4,
  },

  activeDot: {
    opacity: 1,
    backgroundColor: colors.primary,
  },
});
