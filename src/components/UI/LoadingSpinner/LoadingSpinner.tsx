import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { styles } from './LoadingSpinner.styles';

export interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  overlay?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color,
  overlay = false,
}) => {
  const containerStyle = [styles.container, overlay && styles.overlay];

  return (
    <View style={containerStyle}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};
