import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './src/navigator/Navigation';
import { store } from './src/context/store';
import { Provider } from 'react-redux';

const App = () => {
  return (
  <NavigationContainer>
    <Provider store={store}>
      <Navigation />
    </Provider>
  </NavigationContainer>
  )
}

export default App