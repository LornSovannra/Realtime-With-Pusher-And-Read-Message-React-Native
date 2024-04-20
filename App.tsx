import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistedStore, store} from './src/store';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './src/navigations';

LogBox.ignoreLogs([
  'Warning: Cannot update a component (`Chat`) while rendering a different component (`CellRenderer`). To locate the bad setState() call inside `CellRenderer`, follow the stack trace as described in https://react.dev/link/setstate-in-render',
]);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
