import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from '../../UI/Button';
import { colors } from '../../../theme';
import { strings } from '../../../constants';
import { styles } from './EmptyView.styles';

export interface EmptyViewProps {
  message?: string;
  actionText?: string;
  onAction?: () => void;
  iconName?: string;
}

export const EmptyView: React.FC<EmptyViewProps> = ({
  message = strings.EMPTY_NO_PRODUCTS,
  actionText,
  onAction,
  iconName = 'shopping-cart',
}) => {
  return (
    <View style={styles.container}>
      <Icon
        name={iconName}
        size={64}
        color={colors.text.secondary}
        style={styles.icon}
      />
      <Text style={styles.message}>{message}</Text>
      {onAction && actionText && (
        <Button
          title={actionText}
          onPress={onAction}
          variant="primary"
          size="medium"
        />
      )}
    </View>
  );
};
