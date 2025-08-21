export const strings = {
  // Navigation & Headers
  NAVIGATION_PRODUCTS_TITLE: 'Ürünler',
  NAVIGATION_PRODUCT_DETAIL_TITLE: 'Ürün Detayı',
  NAVIGATION_CART_TITLE: 'Sepetim',
  NAVIGATION_BACK_BUTTON: '← Geri',

  // Buttons & Actions
  BUTTON_ADD_TO_CART: 'Sepete Ekle',
  BUTTON_IN_CART: 'Sepette ✓',
  BUTTON_ADD_AGAIN_FORMAT: 'Sepette ({quantity}) - Tekrar Ekle',
  BUTTON_REMOVE: 'Kaldır',
  BUTTON_CHECKOUT: 'Satın Al',
  BUTTON_RETRY: 'Tekrar Dene',
  BUTTON_START_SHOPPING: 'Alışverişe Başla',
  BUTTON_CANCEL: 'İptal',
  BUTTON_CONFIRM: 'Onayla',

  // Messages & Notifications
  TOAST_ADDED_TO_CART: 'Sepete Eklendi',
  TOAST_ORDER_RECEIVED: 'Siparişiniz Alındı!',
  TOAST_PAYMENT_SUCCESS: 'Ödeme başarıyla tamamlandı.',
  ALERT_PURCHASE_TITLE: 'Satın Alma',
  ALERT_PURCHASE_MESSAGE_FORMAT:
    'Toplam {totalItems} ürün için {totalPrice}$ ödeme yapmak istiyor musunuz?',

  // Empty States & Errors
  EMPTY_NO_PRODUCTS: 'Hiç ürün bulunamadı',
  EMPTY_CART_MESSAGE: 'Sepetiniz boş',
  ERROR_GENERIC_MESSAGE: 'Bir hata oluştu. Lütfen tekrar deneyin.',
  ERROR_PRODUCT_NOT_FOUND: 'Ürün bulunamadı',
  ERROR_NO_INTERNET: 'No internet connection',
  ERROR_NETWORK: 'Network error. Please check your connection.',
  ERROR_SERVER: 'Server error. Please try again later.',
  ERROR_NOT_FOUND: 'Requested resource not found.',
  ERROR_UNEXPECTED: 'An unexpected error occurred',
  ERROR_CART_CONTEXT: 'useCart must be used within a CartProvider',

  // Product Related
  PRODUCT_CATEGORY_FORMAT: 'Kategori: {category}',
  PRODUCT_DISCOUNT_LABEL: 'İndirim',
  PRODUCT_SAVINGS_LABEL: 'tasarruf',
  PRODUCT_STOCK_AVAILABLE_FORMAT: '{stock} adet stokta',
  PRODUCT_OUT_OF_STOCK: 'Stokta yok',
  PRODUCT_CART_QUANTITY_FORMAT: 'Sepetinizde {quantity} adet var',
  PRODUCT_DESCRIPTION_TITLE: 'Ürün Açıklaması',
  PRODUCT_RATING_FORMAT: '⭐ {rating}/5',

  // Cart Related
  CART_UNIT_PRICE_FORMAT: 'Birim: {price}',
  CART_TOTAL_PRICE_FORMAT: 'Toplam: {price}',
  CART_SUMMARY_TOTAL_ITEMS_LABEL: 'Toplam Ürün:',
  CART_SUMMARY_ITEMS_COUNT_FORMAT: '{count} adet',
  CART_SUMMARY_SUBTOTAL_LABEL: 'Ara Toplam:',
  CART_SUMMARY_TOTAL_LABEL: 'Toplam:',

  // Log Messages
  LOG_CACHE_SET_ERROR: 'Cache set error:',
  LOG_CACHE_GET_ERROR: 'Cache get error:',
  LOG_CACHE_REMOVE_ERROR: 'Cache remove error:',
  LOG_CACHE_CLEAR_ERROR: 'Cache clear error:',
  LOG_CACHE_HAS_ERROR: 'Cache has error:',
  LOG_CART_LOADED: 'Cart loaded from cache',
  LOG_CART_SAVED: 'Cart saved to cache',
  LOG_PRODUCT_ADDED: 'Product added to cart',
  LOG_PRODUCT_REMOVED: 'Product removed from cart',
  LOG_QUANTITY_UPDATED: 'Cart quantity updated',
  LOG_CART_CLEARED: 'Cart cleared',
};

// Helper functions for formatted strings
export const formatStrings = {
  productCategory: (category: string) =>
    strings.PRODUCT_CATEGORY_FORMAT.replace('{category}', category),

  productStock: (stock: number) =>
    strings.PRODUCT_STOCK_AVAILABLE_FORMAT.replace('{stock}', stock.toString()),

  productCartQuantity: (quantity: number) =>
    strings.PRODUCT_CART_QUANTITY_FORMAT.replace(
      '{quantity}',
      quantity.toString(),
    ),

  productRating: (rating: number) =>
    strings.PRODUCT_RATING_FORMAT.replace('{rating}', rating.toFixed(1)),

  buttonAddAgain: (quantity: number) =>
    strings.BUTTON_ADD_AGAIN_FORMAT.replace('{quantity}', quantity.toString()),

  cartUnitPrice: (price: string) =>
    strings.CART_UNIT_PRICE_FORMAT.replace('{price}', price),

  cartTotalPrice: (price: string) =>
    strings.CART_TOTAL_PRICE_FORMAT.replace('{price}', price),

  cartItemsCount: (count: number) =>
    strings.CART_SUMMARY_ITEMS_COUNT_FORMAT.replace(
      '{count}',
      count.toString(),
    ),

  alertPurchaseMessage: (totalItems: number, totalPrice: string) =>
    strings.ALERT_PURCHASE_MESSAGE_FORMAT.replace(
      '{totalItems}',
      totalItems.toString(),
    ).replace('{totalPrice}', totalPrice),
};
