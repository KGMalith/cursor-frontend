import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './redux/userSlice';

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false,
});

// Configure Redux Persist
const persistConfig = {
    key: 'Cursor',
    storage: storage,
};

const rootReducer = combineReducers({
    user: userReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: customizedMiddleware,
});

// Enable persistence
const persistor = persistStore(store);

export { store, persistor };

