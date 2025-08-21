import React from 'react';
import { Text, View } from 'react-native';
import { strings } from '../../../constants';
import { Button } from '../Button';
import { styles } from './ErrorMessage.styles';

export interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  retryText?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  retryText = strings.BUTTON_RETRY,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <Button
          title={retryText}
          onPress={onRetry}
          variant="primary"
          size="medium"
        />
      )}
    </View>
  );
};
