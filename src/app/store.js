import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authReducer, {
  authMiddleware,
  authMiddlewareAfterlogin,
  authMiddlewareAfterlogout,
  initialState as authInitialState,
} from "../features/auth/authSlice";
import notificationReducer, {
  initialState as notificationInitialState,
} from "../features/notification/notificationSlice";
import walletReducser from "../features/wallets/walletsSlice";
import { NOTIFICATION_DISABLED } from "../utils/constance";
import { getStorageIsOverNotificationDisabled } from "../features/notification/ShowNotificationAlert";
import Cookies from "js-cookie";

const loadAuthFromCookies = () => {
  const token = Cookies.get("userToken");
  return {
    token: token || null,
    isAuthenticated: !!token,
  };
};

const loadNotificationFromStorage = () => {
  const token = Cookies.get("userToken");
  const fcmTokenStorage = localStorage.getItem("fcmToken");
  const getIsOverNotificationDisabled = token
    ? getStorageIsOverNotificationDisabled()
    : !!fcmTokenStorage;
  return {
    fcmToken: fcmTokenStorage || null,
    isEnableNotification: !!fcmTokenStorage,
    isOverNotificationDisabled: getIsOverNotificationDisabled,
  };
};
const preloadedState = {
  auth: {
    ...authInitialState,
    ...loadAuthFromCookies(),
  },
  notification: {
    ...notificationInitialState,
    ...loadNotificationFromStorage(),
  },
};
export const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
    wallets: walletReducser,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      authMiddlewareAfterlogin,
      authMiddlewareAfterlogout,
      authMiddleware
    ),
});
