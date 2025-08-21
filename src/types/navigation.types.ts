import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: { productId: string };
  Cart: undefined;
};

export type NavigationProp = StackNavigationProp<RootStackParamList>;

export type ProductListScreenProps = StackScreenProps<
  RootStackParamList,
  'ProductList'
>;
export type ProductDetailScreenProps = StackScreenProps<
  RootStackParamList,
  'ProductDetail'
>;
export type CartScreenProps = StackScreenProps<RootStackParamList, 'Cart'>;

// Base interfaces for legacy components
export interface Navigation {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
}

export interface Route {
  params?: any;
}

export interface BaseScreenProps {
  navigation: Navigation;
  route: Route;
}

// Header props interface
export interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  onCartPress?: () => void;
  showCart?: boolean;
}
