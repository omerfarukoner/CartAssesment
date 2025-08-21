import React from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { ProductDetails, ProductGallery } from '../../components/Product';
import { ErrorView, LoadingView } from '../../components/StateViews';
import { FloatingButton, Screen } from '../../components/UI';
import { formatStrings, strings } from '../../constants';
import { useCart } from '../../context/CartContext';
import { useProduct } from '../../hooks/useProducts';
import { ProductDetailScreenProps } from '../../types/navigation.types';
import { styles } from './ProductDetailScreen.styles';

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { productId } = route.params;
  const { data: product, isLoading, error, refetch } = useProduct(productId);
  const { addToCart, isProductInCart, getProductQuantity } = useCart();

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product);
    Toast.show({
      type: 'success',
      text1: strings.TOAST_ADDED_TO_CART,
      text2: product.title,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const headerProps = {
    title: strings.NAVIGATION_PRODUCT_DETAIL_TITLE,
    onBackPress: handleBackPress,
    onCartPress: handleCartPress,
    showCart: true,
  };

  if (isLoading) {
    return (
      <Screen showHeader={true} headerProps={headerProps}>
        <LoadingView />
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen showHeader={true} headerProps={headerProps}>
        <ErrorView message={error} onRetry={refetch} />
      </Screen>
    );
  }

  if (!product) {
    return (
      <Screen showHeader={true} headerProps={headerProps}>
        <ErrorView message={strings.ERROR_PRODUCT_NOT_FOUND} />
      </Screen>
    );
  }

  const inCart = product ? isProductInCart(product.id) : false;
  const quantity = product ? getProductQuantity(product.id) : 0;

  return (
    <Screen showHeader={true} headerProps={headerProps}>
      <View style={styles.container}>
        <ProductGallery images={product.images} />
        <ProductDetails product={product} />
      </View>

      <FloatingButton
        title={
          inCart
            ? formatStrings.buttonAddAgain(quantity)
            : strings.BUTTON_ADD_TO_CART
        }
        onPress={handleAddToCart}
        variant="primary"
        disabled={product?.stock === 0}
      />
    </Screen>
  );
};
