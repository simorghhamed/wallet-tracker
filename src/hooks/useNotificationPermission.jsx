import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getFirebaseToken, onMessage, messaging } from "../utils/firebase";
import { changedPermissionNotification } from "../utils/changed-permission-notification";
import { createSelector } from "@reduxjs/toolkit";
import {
  getErrorNotification,
  getFcmToken,
  getPermission,
  setErrorNotification,
  setIsEnableNotification,
  setPermission,
} from "../features/notification/notificationSlice";
import { useAppDispatch, useAppSelector } from "../app/hook";
import {
  rejectedAllertParams,
  showNotificationAlert,
} from "../features/notification/ShowNotificationAlert";
import { NOTIFICATION_DISABLED } from "../utils/constance";

export const useNotificationPermission = () => {
  const dispatch = useAppDispatch();
  const permission = useAppSelector((state) => state.notification.permission);
  const isEnableNotification = useAppSelector(
    (state) => state.notification.isEnableNotification
  );
  
  useEffect(() => {
    if (
      isEnableNotification &&
      (permission === "default" || permission === "prompt")
    ) {
      try {
        Notification.requestPermission().then((permissionStatus) => {
          dispatch(setPermission(permissionStatus));

          if(permissionStatus !== "granted") {
            showNotificationAlert(rejectedAllertParams);
            dispatch(setIsEnableNotification(false))
          }
        })
      } catch (error) {
       
        dispatch(setErrorNotification(error));
        dispatch(setIsEnableNotification(false))
      }
    }
  }, [permission, isEnableNotification]);

  useEffect(() => {
    changedPermissionNotification((permissionStatus) => {
      dispatch(setPermission(permissionStatus));
      if (
        permissionStatus === "prompt" ||
        permissionStatus === "default" ||
        permissionStatus === "denied"
      ) {
        localStorage.removeItem("fcmToken");
        localStorage.setItem(NOTIFICATION_DISABLED, Date.now());
        dispatch(setIsEnableNotification(false))
      }
    });
  }, []);
};
