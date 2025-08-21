import React from 'react';
import { View } from 'react-native';
import { LoadingSpinner } from '../../UI/LoadingSpinner';
import { colors } from '../../../theme';
import { styles } from './LoadingView.styles';

export const LoadingView: React.FC = () => {
  return (
    <View style={styles.container}>
      <LoadingSpinner size="large" color={colors.primary} />
    </View>
  );
};
