import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { getFirebaseToken } from "../utils/firebase";
import { setTokenRegistration } from "../features/notification/notificationSlice";

export const useFcmToken = () => {
  const dispatch = useAppDispatch();
  const permission = useAppSelector((state) => state.notification.permission);
  const fcmToken = useAppSelector((state) => state.notification.fcmToken);
  const isEnableNotification = useAppSelector(
    (state) => state.notification.isEnableNotification
  );
  useEffect(() => {
    if (permission === "granted" && !fcmToken && isEnableNotification) {
      getFirebaseToken()
        .then((currentToken) => {
          if (currentToken) {
            dispatch(setTokenRegistration(currentToken));
          }
        })
        .catch((err) => {
          console.error("Failed to retrieve FCM token:", err);
        });
    }
  }, [permission, fcmToken, isEnableNotification]);
};
