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
  setPermission,
} from "../features/notification/notificationSlice";
import { useAppDispatch } from "../app/hook";
import {
  rejectedAllertParams,
  showNotificationAlert,
} from "../features/notification/ShowNotificationAlert";
import { NOTIFICATION_DISABLED } from "../utils/constance";
export const usePushNotification = () => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState();

  const requestPermission = async () => {
    try {
      Notification.requestPermission().then((permission) => {
        dispatch(setPermission(permission));
        if (permission !== "granted") {
          showNotificationAlert(rejectedAllertParams);
        }
      });
    } catch (error) {
      console.log(error);

      dispatch(setErrorNotification(error));
    }
  };

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
      }
    });
  }, []);

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log(payload);
      setMessage(payload);
    });

    return () => unsubscribe();
  }, []);

  return {
    message,
    requestPermission,
  };
};
