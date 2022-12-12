import { configureStore, combineReducers } from "@reduxjs/toolkit";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import cartReducer from "./cartRedux";
import authReducer from "./authRedux";
import userReducer from "./userRedux";
import productReducer from "./productRedux";
import orderReducer from "./orderRedux";

import {logoutStart} from "./authRedux";


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer
})

// const rootReducer = (state, action) => {
//     if (action.type === logoutStart.type) {
//         // for all keys defined in your persistConfig(s)
//         storage.removeItem('persist:root')
//         // storage.removeItem('persist:otherKey')

//         return appReducer(undefined, action);
//     }
//     return appReducer(state, action);
// };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
