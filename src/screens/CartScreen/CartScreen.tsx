import React from 'react';
import { Alert, FlatList } from 'react-native';
import Toast from 'react-native-toast-message';
import { CartItem, CartSummary } from '../../components/Cart';
import { EmptyView } from '../../components/StateViews';
import { Screen } from '../../components/UI';
import { formatStrings, strings } from '../../constants';
import { useCart } from '../../context/CartContext';
import { CartScreenProps } from '../../types/navigation.types';
import { styles } from './CartScreen.styles';

export const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
  const { cart, clearCart } = useCart();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleCheckout = () => {
    Alert.alert(
      strings.ALERT_PURCHASE_TITLE,
      formatStrings.alertPurchaseMessage(
        cart.totalItems,
        cart.totalPrice.toFixed(2),
      ),
      [
        { text: strings.BUTTON_CANCEL, style: 'cancel' },
        {
          text: strings.BUTTON_CONFIRM,
          onPress: () => {
            clearCart();
            Toast.show({
              type: 'success',
              text1: strings.TOAST_ORDER_RECEIVED,
              text2: strings.TOAST_PAYMENT_SUCCESS,
              position: 'top',
              visibilityTime: 3000,
            });
            navigation.navigate('ProductList');
          },
        },
      ],
    );
  };

  const headerProps = {
    title: strings.NAVIGATION_CART_TITLE,
    onBackPress: handleBackPress,
  };

  if (cart.totalItems === 0) {
    return (
      <Screen showHeader={true} headerProps={headerProps}>
        <EmptyView
          message={strings.EMPTY_CART_MESSAGE}
          actionText={strings.BUTTON_START_SHOPPING}
          onAction={handleBackPress}
          iconName="shopping-cart"
        />
      </Screen>
    );
  }

  const renderCartItem = ({ item }: { item: any }) => <CartItem item={item} />;

  return (
    <Screen showHeader={true} headerProps={headerProps}>
      <FlatList
        data={cart.items}
        keyExtractor={item => item.product.id.toString()}
        renderItem={renderCartItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
      <CartSummary onCheckout={handleCheckout} />
    </Screen>
  );
};
