/**
 * GlowCart - Beauty E-commerce App
 * React Native CLI Assignment
 */

import React from 'react';
import {AppProvider} from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';

function App(): React.JSX.Element {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
}

export default App;
