import { baseAPI } from "@/api/base.config";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";
import { persistConfig } from "./persist";
import authReducer from "@/redux/auth.slice";

// Step 2.1: Create an object to hold the reducers
const reducers = {
  auth: authReducer,
  [baseAPI.reducerPath]: baseAPI.reducer,
};

// Create the persisted reducer
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(reducers)
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      baseAPI.middleware
    ),
});

setupListeners(store.dispatch);

export const persister = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
