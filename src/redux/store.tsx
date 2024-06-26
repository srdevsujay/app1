import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
  ThunkAction,
  AnyAction,
  PayloadAction,
} from "@reduxjs/toolkit";
// import { TypedUseSelectorHook, useSelector, AppDispatch } from "react-redux";
import { authApi } from "../pages/Login/services/userService";
// import authReducer from "../pages/Login/store/slices/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { UserInfo } from "../models";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import userSlice from "./state/slices/login/user";
import { authSlice } from "./state/slices/login";
import { DashboardInfo } from "../pages/Dashboard/models/dashboard.model";
import dashboardSlice from "./state/slices/dashboard/dashboardSlice";
import logger from "redux-logger";
import contactSlice from "./state/slices/contacts/contactsSlice";
import { logoutUser } from "./state/slices/login/authSlice";
import { trackingState } from "./state/slices/tracking/trackingSlice";
import trackingSlice from "./state/slices/tracking/trackingSlice";
import configurationSlice from "./state/slices/configuration/configurationSlice";

export interface AppStore {
  authApi: any;
  user: UserInfo;
  dashboard: DashboardInfo;
  contact: any;
  tracking: any;
  configuration: any;
}

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers<AppStore>({
  [authApi.reducerPath]: authApi.reducer,
  user: authSlice,
  dashboard: dashboardSlice,
  contact: contactSlice,
  tracking: trackingSlice,
  configuration: configurationSlice,
});

const resettableRootReducer = (state: any, action: PayloadAction<UserInfo>) => {
  if (action.type === logoutUser.type) {
    state = undefined;
  }

  return reducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, resettableRootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === "development",
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
  // devTools: process.env.NODE_ENV === "development",
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
setupListeners(store.dispatch);
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
