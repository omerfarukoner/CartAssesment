import React, { useCallback, useEffect, useRef } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { ProductCard } from '../../components/Product';
import { EmptyView, ErrorView, LoadingView } from '../../components/StateViews';
import { Screen } from '../../components/UI';
import { strings } from '../../constants';
import { useProductsPaginated } from '../../hooks/useProductsPaginated';
import { colors } from '../../theme';
import { ProductListScreenProps } from '../../types/navigation.types';
import { styles } from './ProductListScreen.styles';

export const ProductListScreen: React.FC<ProductListScreenProps> = ({
  navigation,
}) => {
  const {
    products,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    refresh,
  } = useProductsPaginated(10);

  const handleProductPress = useCallback(
    (productId: number) => {
      navigation.navigate('ProductDetail', { productId: productId.toString() });
    },
    [navigation],
  );

  const handleCartPress = useCallback(() => {
    navigation.navigate('Cart');
  }, [navigation]);

  const flatListRef = useRef<FlatList>(null);
  const previousProductsLengthRef = useRef(0);

  const renderProduct = useCallback(
    ({ item }: { item: any }) => (
      <ProductCard product={item} onPress={() => handleProductPress(item.id)} />
    ),
    [handleProductPress],
  );

  const renderFooter = useCallback(() => {
    return (
      <View style={styles.loadingFooter}>
        {isLoadingMore ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <View style={styles.footerSpacer} />
        )}
      </View>
    );
  }, [isLoadingMore]);

  useEffect(() => {
    const currentLength = products.length;
    const previousLength = previousProductsLengthRef.current;

    if (currentLength > previousLength && previousLength > 0) {
    }

    previousProductsLengthRef.current = currentLength;
  }, [products.length]);

  const headerProps = {
    title: strings.NAVIGATION_PRODUCTS_TITLE,
    onCartPress: handleCartPress,
    showCart: true,
  };

  if (isLoading && products.length === 0) {
    return (
      <Screen showHeader={true} headerProps={headerProps}>
        <LoadingView />
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen showHeader={true} headerProps={headerProps}>
        <ErrorView message={error} onRetry={refresh} />
      </Screen>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <Screen showHeader={true} headerProps={headerProps}>
        <EmptyView
          message={strings.EMPTY_NO_PRODUCTS}
          actionText={strings.BUTTON_RETRY}
          onAction={refresh}
        />
      </Screen>
    );
  }

  const handleEndReached = () => {
    if (hasMore && !isLoadingMore) {
      loadMore();
    }
  };

  return (
    <Screen showHeader={true} headerProps={headerProps}>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={products}
          keyExtractor={(item, index) => `product-${item.id}-${index}`}
          renderItem={renderProduct}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          onRefresh={refresh}
          refreshing={isLoading}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
          maxToRenderPerBatch={4}
          windowSize={5}
          initialNumToRender={6}
          removeClippedSubviews={false}
          updateCellsBatchingPeriod={50}
        />
      </View>
    </Screen>
  );
};
