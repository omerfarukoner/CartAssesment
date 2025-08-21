import React, { ReactNode } from 'react';
import { View, Pressable } from 'react-native';
import { styles } from './Card.styles';

export interface CardProps {
  children: ReactNode;
  onPress?: () => void;
  elevation?: 'none' | 'small' | 'medium' | 'large';
  padding?: 'none' | 'small' | 'medium' | 'large';
  style?: any;
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  elevation = 'small',
  padding = 'medium',
  style,
}) => {
  const cardStyle = [
    styles.card,
    styles[elevation],
    styles[`${padding}Padding`],
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        style={({ pressed }) => [cardStyle, pressed && styles.pressed]}
        onPress={onPress}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};
