import { useCallback } from 'react';
import { Alert } from 'react-native';
import { strings } from '../constants';

interface ConfirmationConfig {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
}

export const useConfirmAction = () => {
  const showConfirmation = useCallback(
    (config: ConfirmationConfig, onConfirm: () => void): void => {
      const {
        title,
        message,
        confirmText = strings.BUTTON_CONFIRM,
        cancelText = strings.BUTTON_CANCEL,
        destructive = false,
      } = config;

      Alert.alert(title, message, [
        { text: cancelText, style: 'cancel' },
        {
          text: confirmText,
          style: destructive ? 'destructive' : 'default',
          onPress: onConfirm,
        },
      ]);
    },
    [],
  );

  return { showConfirmation };
};
