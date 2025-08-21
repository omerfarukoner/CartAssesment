import React from 'react';
import { Pressable, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../../theme';
import { CartIcon } from '../../Cart/CartIcon';
import { useDebounce } from '../../../hooks/useDebounce';
import { styles } from './Header.styles';

export interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  onCartPress?: () => void;
  showCart?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onBackPress,
  onCartPress,
  showCart = false,
}) => {
  const debouncedBackPress = useDebounce(onBackPress || (() => {}), 500);

  return (
    <View style={styles.container}>
      {onBackPress ? (
        <Pressable onPress={debouncedBackPress} style={styles.backButton}>
          <MaterialIcons
            name="arrow-back-ios"
            size={24}
            color={colors.text.primary}
          />
        </Pressable>
      ) : (
        <View style={styles.spacer} />
      )}

      <Text style={styles.title}>{title}</Text>

      {showCart && onCartPress ? (
        <CartIcon onPress={onCartPress} color={colors.text.primary} />
      ) : (
        <View style={styles.spacer} />
      )}
    </View>
  );
};
