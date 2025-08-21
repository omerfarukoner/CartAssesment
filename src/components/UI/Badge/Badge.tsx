import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './Badge.styles';

export interface BadgeProps {
  count: number;
  maxCount?: number;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  showZero?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  count,
  maxCount = 99,
  size = 'medium',
  color = 'danger',
  showZero = false,
}) => {
  if (count === 0 && !showZero) {
    return null;
  }

  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

  const badgeStyle = [styles.badge, styles[size], styles[color]];

  const textStyle = [styles.text, styles[`${size}Text`]];

  return (
    <View style={badgeStyle}>
      <Text style={textStyle}>{displayCount}</Text>
    </View>
  );
};
