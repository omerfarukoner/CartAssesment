import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, ButtonProps } from '../Button';
import { styles } from './FloatingButton.styles';

interface FloatingButtonProps extends Omit<ButtonProps, 'style'> {
  bottom?: number;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  bottom = 0,
  ...buttonProps
}) => {
  const insets = useSafeAreaInsets();

  const containerStyle = [
    styles.container,
    {
      bottom: bottom + insets.bottom,
    },
  ];

  return (
    <View style={containerStyle}>
      <Button {...buttonProps} size="large" fullWidth style={styles.button} />
    </View>
  );
};
