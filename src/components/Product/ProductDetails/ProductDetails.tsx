import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Product } from '../../../types/product.types';
import { Card } from '../../UI/Card';
import {
  formatPrice,
  formatDiscountedPrice,
  calculateSavings,
} from '../../../utils/priceHelpers';
import { useCart } from '../../../context/CartContext';
import { strings, formatStrings } from '../../../constants';
import { styles } from './ProductDetails.styles';

export interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { getProductQuantity } = useCart();

  const hasDiscount = product.discountPercentage > 0;
  const savings = hasDiscount
    ? calculateSavings(product.price, product.discountPercentage)
    : 0;
  const quantity = getProductQuantity(product.id);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <Card style={styles.card}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.brand}>{product.brand}</Text>

        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>
            {formatStrings.productRating(product.rating)}
          </Text>
          <Text style={styles.category}>
            {formatStrings.productCategory(product.category)}
          </Text>
        </View>

        <View style={styles.priceSection}>
          {hasDiscount ? (
            <>
              <View style={styles.priceRow}>
                <Text style={styles.originalPrice}>
                  {formatPrice(product.price)}
                </Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>
                    %{Math.round(product.discountPercentage)}{' '}
                    {strings.PRODUCT_DISCOUNT_LABEL}
                  </Text>
                </View>
              </View>
              <Text style={styles.discountedPrice}>
                {formatDiscountedPrice(
                  product.price,
                  product.discountPercentage,
                )}
              </Text>
              <Text style={styles.savings}>
                {formatPrice(savings)} {strings.PRODUCT_SAVINGS_LABEL}
              </Text>
            </>
          ) : (
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
          )}
        </View>

        <View style={styles.stockContainer}>
          <Text
            style={[styles.stock, product.stock === 0 && styles.outOfStock]}
          >
            {product.stock > 0
              ? formatStrings.productStock(product.stock)
              : strings.PRODUCT_OUT_OF_STOCK}
          </Text>
          {quantity > 0 && (
            <Text style={styles.inCartText}>
              {formatStrings.productCartQuantity(quantity)}
            </Text>
          )}
        </View>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>
          {strings.PRODUCT_DESCRIPTION_TITLE}
        </Text>
        <Text style={styles.description}>{product.description}</Text>
      </Card>
    </ScrollView>
  );
};
