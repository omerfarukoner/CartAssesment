import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from 'react';
import { Cart, CartItem, Product } from '../types/product.types';
import { cacheService, CACHE_KEYS } from '../services/cacheService';
import { calculateTotalPrice } from '../utils/priceHelpers';
import Logger from '../utils/logger';

interface CartContextType {
  cart: Cart;
  isLoading: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isProductInCart: (productId: number) => boolean;
  getProductQuantity: (productId: number) => number;
}

type CartAction =
  | { type: 'LOAD_CART'; payload: Cart }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | {
      type: 'UPDATE_QUANTITY';
      payload: { productId: number; quantity: number };
    }
  | { type: 'CLEAR_CART' };

const calculateCartTotals = (
  items: CartItem[],
): { totalItems: number; totalPrice: number } => {
  if (!items || !Array.isArray(items)) {
    return { totalItems: 0, totalPrice: 0 };
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = calculateTotalPrice(
    items.map(item => ({ price: item.product.price, quantity: item.quantity })),
  );

  return { totalItems, totalPrice };
};

const cartReducer = (state: Cart, action: CartAction): Cart => {
  let newItems: CartItem[] = [];

  switch (action.type) {
    case 'LOAD_CART':
      return action.payload;

    case 'ADD_TO_CART':
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === action.payload.id,
      );

      if (existingItemIndex >= 0) {
        newItems = [...state.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + 1,
        };
      } else {
        newItems = [...state.items, { product: action.payload, quantity: 1 }];
      }
      break;

    case 'REMOVE_FROM_CART':
      newItems = state.items.filter(item => item.product.id !== action.payload);
      break;

    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        newItems = state.items.filter(
          item => item.product.id !== action.payload.productId,
        );
      } else {
        newItems = state.items.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item,
        );
      }
      break;

    case 'CLEAR_CART':
      newItems = [];
      break;

    default:
      return state;
  }

  const { totalItems, totalPrice } = calculateCartTotals(newItems);
  return { items: newItems, totalItems, totalPrice };
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, dispatch] = useReducer(cartReducer, {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  });
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cachedCart = await cacheService.get<Cart>(CACHE_KEYS.CART);
        if (cachedCart && cachedCart.items) {
          const { totalItems, totalPrice } = calculateCartTotals(
            cachedCart.items,
          );
          dispatch({
            type: 'LOAD_CART',
            payload: { ...cachedCart, totalItems, totalPrice },
          });
          Logger.info('Cart loaded from cache', {
            itemCount: cachedCart.items.length,
          });
        }
      } catch (error) {
        Logger.error('Failed to load cart from cache', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  useEffect(() => {
    const saveCart = async () => {
      try {
        await cacheService.set(CACHE_KEYS.CART, cart);
        Logger.debug('Cart saved to cache', { totalItems: cart.totalItems });
      } catch (error) {
        Logger.error('Failed to save cart to cache', error);
      }
    };

    saveCart();
  }, [cart]);

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    Logger.info('Product added to cart', {
      productId: product.id,
      title: product.title,
    });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    Logger.info('Product removed from cart', { productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    Logger.info('Cart quantity updated', { productId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    Logger.info('Cart cleared');
  };

  const isProductInCart = (productId: number): boolean => {
    return cart.items.some(item => item.product.id === productId);
  };

  const getProductQuantity = (productId: number): number => {
    const cartItem = cart.items.find(item => item.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const value: CartContextType = {
    cart,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isProductInCart,
    getProductQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
