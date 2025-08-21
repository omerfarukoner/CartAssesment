import React, { ReactNode } from 'react';
import { StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../../theme';
import { Header, type HeaderProps } from '../Header';
import { styles } from './Screen.styles';

export interface ScreenProps {
  children: ReactNode;
  backgroundColor?: string;
  statusBarStyle?: 'default' | 'light-content' | 'dark-content';
  showHeader?: boolean;
  headerProps?: HeaderProps;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  backgroundColor = colors.background.primary,
  statusBarStyle = 'dark-content',
  showHeader = false,
  headerProps,
}) => {
  const insets = useSafeAreaInsets();

  const getContainerStyle = (bgColor: string) => ({
    ...styles.container,
    backgroundColor: bgColor,
  });

  const getContentStyle = () => ({
    ...styles.content,
    paddingTop: showHeader ? 0 : insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  });

  return (
    <View style={getContainerStyle(backgroundColor)}>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={backgroundColor}
        translucent={false}
      />
      {showHeader && headerProps && (
        <View style={{ paddingTop: insets.top }}>
          <Header {...headerProps} />
        </View>
      )}
      <View style={getContentStyle()}>{children}</View>
    </View>
  );
};
