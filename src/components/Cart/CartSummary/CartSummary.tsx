import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '../../UI/Card';
import { Button } from '../../UI/Button';
import { formatPrice } from '../../../utils/priceHelpers';
import { useCart } from '../../../context/CartContext';
import { strings, formatStrings } from '../../../constants';
import { styles } from './CartSummary.styles';

export interface CartSummaryProps {
  onCheckout?: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ onCheckout }) => {
  const { cart } = useCart();

  if (cart.totalItems === 0) {
    return null;
  }

  return (
    <Card style={styles.card} padding="large">
      <View style={styles.row}>
        <Text style={styles.label}>
          {strings.CART_SUMMARY_TOTAL_ITEMS_LABEL}
        </Text>
        <Text style={styles.value}>
          {formatStrings.cartItemsCount(cart.totalItems)}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{strings.CART_SUMMARY_SUBTOTAL_LABEL}</Text>
        <Text style={styles.value}>{formatPrice(cart.totalPrice)}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.totalLabel}>
          {strings.CART_SUMMARY_TOTAL_LABEL}
        </Text>
        <Text style={styles.totalValue}>{formatPrice(cart.totalPrice)}</Text>
      </View>

      <View style={styles.buttonContainer}>
        {onCheckout && (
          <Button
            title={strings.BUTTON_CHECKOUT}
            onPress={onCheckout}
            variant="primary"
            size="large"
            fullWidth={true}
          />
        )}
      </View>
    </Card>
  );
};
