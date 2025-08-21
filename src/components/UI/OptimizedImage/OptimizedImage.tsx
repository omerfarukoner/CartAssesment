import React, { useState } from 'react';
import { View, ImageStyle, StyleProp } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { LoadingSpinner } from '../LoadingSpinner';
import { colors } from '../../../theme';
import { styles } from './OptimizedImage.styles';

export interface OptimizedImageProps extends Omit<FastImageProps, 'style'> {
  style?: StyleProp<ImageStyle>;
  loaderSize?: 'small' | 'large';
  showLoader?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  style,
  loaderSize = 'small',
  showLoader = true,
  onLoadStart,
  onLoad,
  onError,
  ...fastImageProps
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadStart = () => {
    setIsLoading(true);
    onLoadStart?.();
  };

  const handleLoad = (event: any) => {
    setIsLoading(false);
    onLoad?.(event);
  };

  const handleError = () => {
    setIsLoading(false);
    onError?.();
  };

  const containerStyle = [styles.container, style];
  const imageStyle = (style ? [styles.image, style] : styles.image) as any;
  const loaderStyle = [styles.loader, style];

  return (
    <View style={containerStyle}>
      <FastImage
        {...fastImageProps}
        style={imageStyle}
        onLoadStart={handleLoadStart}
        onLoad={handleLoad}
        onError={handleError}
      />
      {isLoading && showLoader && (
        <View style={loaderStyle}>
          <LoadingSpinner size={loaderSize} color={colors.primary} />
        </View>
      )}
    </View>
  );
};
