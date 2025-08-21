import React from 'react';
import { Pressable, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Badge } from '../../UI/Badge';
import { useCartTotals } from '../../../hooks/useCartSelectors';
import { colors } from '../../../theme';
import { styles } from './CartIcon.styles';

export interface CartIconProps {
  onPress: () => void;
  color?: string;
}

export const CartIcon: React.FC<CartIconProps> = ({
  onPress,
  color = colors.text.primary,
}) => {
  const { totalItems, isLoading } = useCartTotals();

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <MaterialIcons name="shopping-cart" size={28} color={color} />
      {!isLoading && totalItems > 0 && (
        <View style={styles.badgeContainer}>
          <Badge count={totalItems} size="small" />
        </View>
      )}
    </Pressable>
  );
};
