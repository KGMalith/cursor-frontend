import React from 'react';
import './App.scss';
import Routes from './routes/Routes';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Routes />
          <Toaster />
        </PersistGate>
      </Provider>

    </>
  );
}

export default App;
