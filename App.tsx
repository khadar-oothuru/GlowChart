/**
 * GlowCart - Beauty E-commerce App
 * React Native CLI Assignment
 */

import React from 'react';
import { Text, TextInput } from 'react-native';
import {AppProvider} from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';

// Set default font for all Text components
const defaultFontFamily = { fontFamily: 'Ubuntu-Regular' };

// @ts-ignore
Text.defaultProps = Text.defaultProps || {};
// @ts-ignore
Text.defaultProps.style = [defaultFontFamily, Text.defaultProps.style];

// @ts-ignore
TextInput.defaultProps = TextInput.defaultProps || {};
// @ts-ignore
TextInput.defaultProps.style = [defaultFontFamily, TextInput.defaultProps.style];

function App(): React.JSX.Element {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
}

export default App;
