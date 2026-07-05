import { createSelector, createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isOverNotificationDisabled: false,
  isEnableNotification: false,
  fcmToken: null,
  platform: null,
  permission: Notification.permission,
  error: null,
  statusAccess: {
    userAccess: {
      isConfirm: false,
      isConfirming: false,
      isConfirmed: false,
    },
    userTempAccess: {
      isConfirm: false,
      isConfirming: false,
      isConfirmed: false,
    },
    isShowSuccessToast: false,
    isShowSuccessLoader: false,
  },
};
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setPermission(state, action) {
      state.permission = action.payload;
    },
    setTokenRegistration(state, action) {
      state.fcmToken = action.payload;
      // state.platform = action.payload.platform;
    },
    setIsOverNotificationDisabled(state, action) {
      state.isOverNotificationDisabled = action.payload;
    },
    setIsEnableNotification(state, action) {
      state.isEnableNotification = action.payload;
    },
    setErrorNotification(state, action) {
      state.error = action.payload;
    },
    setStatusAccess(state, action) {
      state.statusAccess = {
        ...state.statusAccess,
        ...action.payload,
      };
    },
    resetNotificationState() {
      return {
        ...initialState,
        permission: Notification.permission,
      };
    },
  },
});

export const {
  setPermission,
  setIsOverNotificationDisabled,
  setIsEnableNotification,
  setErrorNotification,
  setTokenRegistration,
  resetNotificationState,
  setStatusAccess,
} = notificationSlice.actions;

export default notificationSlice.reducer;

export const getIsOverNotificationDisabled = (state) =>
  state.notification.isOverNotificationDisabled;
export const getIsEnableNotification = (state) =>
  state.notification.isEnableNotification;
export const getFcmToken = (state) => state.notification.fcmToken;
export const getPermission = (state) => state.notification.permission;
export const getErrorNotification = (state) => state.notification.error;

export const selectorNotificationSlice = createSelector(
  [
    getFcmToken,
    getPermission,
    getErrorNotification,
    getIsOverNotificationDisabled,
  ],
  (fcmToken, permission, error, isOverNotificationDisabled) => {
    return {
      fcmToken,
      permission,
      error,
      isOverNotificationDisabled,
    };
  }
);
