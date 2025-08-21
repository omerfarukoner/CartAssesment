import React from 'react';
import { View, Text, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';
import { CartItem as CartItemType } from '../../../types/product.types';
import { Card } from '../../UI/Card';
import { Button } from '../../UI/Button';
import { formatPrice } from '../../../utils/priceHelpers';
import { useCart } from '../../../context/CartContext';
import { OptimizedImage } from '../../UI/OptimizedImage';
import { strings, formatStrings } from '../../../constants';
import { styles } from './CartItem.styles';

export interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  const totalPrice = product.price * quantity;

  return (
    <Card style={styles.card} padding="medium">
      <View style={styles.container}>
        <OptimizedImage
          source={{ uri: product.thumbnail }}
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
          loaderSize="small"
        />

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>

          <Text style={styles.brand}>{product.brand}</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.unitPrice}>
              {formatStrings.cartUnitPrice(formatPrice(product.price))}
            </Text>
            <Text style={styles.totalPrice}>
              {formatStrings.cartTotalPrice(formatPrice(totalPrice))}
            </Text>
          </View>

          <View style={styles.actions}>
            <View style={styles.quantityContainer}>
              <Pressable onPress={handleDecrease} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>-</Text>
              </Pressable>

              <Text style={styles.quantity}>{quantity}</Text>

              <Pressable onPress={handleIncrease} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
              </Pressable>
            </View>

            <Button
              title={strings.BUTTON_REMOVE}
              onPress={handleRemove}
              variant="danger"
              size="small"
            />
          </View>
        </View>
      </View>
    </Card>
  );
};
