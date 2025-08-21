import React, { useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { OptimizedImage } from '../../UI/OptimizedImage';
import { styles } from './ProductGallery.styles';

export interface ProductGalleryProps {
  images: string[];
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {images.map((image, index) => (
          <OptimizedImage
            key={index}
            source={{ uri: image }}
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
            loaderSize="large"
          />
        ))}
      </ScrollView>

      {images.length > 1 && (
        <View style={styles.pagination}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === activeIndex && styles.activeDot]}
            />
          ))}
        </View>
      )}
    </View>
  );
};
