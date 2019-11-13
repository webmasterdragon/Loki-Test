import React from 'react';
import { Text } from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';

import Counter from './screens/Counter';
import AppNavigator from './route';

import { store, persistor } from './redux/store/store';

export default App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};
