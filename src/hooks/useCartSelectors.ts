import { useMemo } from 'react';
import { useCart } from '../context/CartContext';

export const useIsProductInCart = (productId: number): boolean => {
  const { cart } = useCart();

  return useMemo(() => {
    return cart.items.some(item => item.product.id === productId);
  }, [cart.items, productId]);
};

export const useProductQuantityInCart = (productId: number): number => {
  const { cart } = useCart();

  return useMemo(() => {
    const cartItem = cart.items.find(item => item.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  }, [cart.items, productId]);
};

export const useCartTotals = () => {
  const { cart, isLoading } = useCart();

  return useMemo(
    () => ({
      totalItems: cart.totalItems,
      totalPrice: cart.totalPrice,
      itemsCount: cart.items.length,
      isLoading,
    }),
    [cart.totalItems, cart.totalPrice, cart.items.length, isLoading],
  );
};

export const useCartItems = () => {
  const { cart } = useCart();

  return useMemo(() => cart.items, [cart.items]);
};
