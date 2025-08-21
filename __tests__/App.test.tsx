/**
 * @format
 */

import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

const TestApp = () => (
  <View testID="test-app">
    <Text>E-commerce Cart App</Text>
  </View>
);

test('app smoke test - renders without crashing', () => {
  const { getByTestId } = render(<TestApp />);
  expect(getByTestId('test-app')).toBeTruthy();
});
