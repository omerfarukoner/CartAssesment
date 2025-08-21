import React from 'react';
import { View } from 'react-native';
import { ErrorMessage } from '../../UI/ErrorMessage';
import { strings } from '../../../constants';
import { styles } from './ErrorView.styles';

export interface ErrorViewProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({
  message = strings.ERROR_GENERIC_MESSAGE,
  onRetry,
}) => {
  return (
    <View style={styles.container}>
      <ErrorMessage message={message} onRetry={onRetry} />
    </View>
  );
};
