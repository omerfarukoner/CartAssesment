import React, { memo } from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';
import { Product } from '../../../types/product.types';
import { Card } from '../../UI/Card';
import { Button } from '../../UI/Button';
import {
  formatPrice,
  formatDiscountedPrice,
} from '../../../utils/priceHelpers';
import { useCart } from '../../../context/CartContext';
import { useIsProductInCart } from '../../../hooks/useCartSelectors';
import { OptimizedImage } from '../../UI/OptimizedImage';
import { strings } from '../../../constants';
import { styles } from './ProductCard.styles';

export interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const { addToCart } = useCart();
  const inCart = useIsProductInCart(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    Toast.show({
      type: 'success',
      text1: strings.TOAST_ADDED_TO_CART,
      text2: product.title,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const hasDiscount = product.discountPercentage > 0;

  return (
    <Card onPress={onPress} style={styles.card} padding="none">
      <OptimizedImage
        source={{ uri: product.thumbnail }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.contain}
        loaderSize="small"
      />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        <View style={styles.priceContainer}>
          {hasDiscount ? (
            <View style={styles.priceRow}>
              <Text style={styles.originalPrice}>
                {formatPrice(product.price)}
              </Text>
              <Text style={styles.discountedPrice}>
                {formatDiscountedPrice(
                  product.price,
                  product.discountPercentage,
                )}
              </Text>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>
                  %{Math.round(product.discountPercentage)}
                </Text>
              </View>
            </View>
          ) : (
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
          )}
        </View>

        <Button
          title={inCart ? strings.BUTTON_IN_CART : strings.BUTTON_ADD_TO_CART}
          onPress={handleAddToCart}
          variant={inCart ? 'secondary' : 'primary'}
          size="small"
          fullWidth
          disabled={product.stock === 0}
        />
      </View>
    </Card>
  );
};

export const MemoizedProductCard = memo(ProductCard, (prevProps, nextProps) => {
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.product.title === nextProps.product.title &&
    prevProps.product.price === nextProps.product.price &&
    prevProps.product.discountPercentage ===
      nextProps.product.discountPercentage &&
    prevProps.product.stock === nextProps.product.stock &&
    prevProps.product.thumbnail === nextProps.product.thumbnail
  );
});

export { MemoizedProductCard as ProductCard };
