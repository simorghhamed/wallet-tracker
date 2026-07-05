import { useEffect } from "react";
import { showNotificationDisabledToast } from "../features/notification/ShowNotificationAlert";
import { Notification_DISABLED_TOAST_ID } from "../utils/constance";
import { setPermission } from "../features/notification/notificationSlice";
import { useAppDispatch, useAppSelector } from "../app/hook";
import toast from "react-hot-toast";

export const useNotificationToast = () => {
  const dispatch = useAppDispatch();
  const isEnableNotification = useAppSelector(
    (state) => state.notification.isEnableNotification
  );
  const statusAccess = useAppSelector(
    (state) => state.notification.statusAccess
  );
  const { userAccess, userTempAccess } = statusAccess;
  const permission = useAppSelector((state) => state.notification.permission);
  const fcmToken = useAppSelector((state) => state.notification.fcmToken);

  const handleEnableNotification = () => {
    dispatch(setPermission("default"));
  };

  useEffect(() => {
    if (
      !fcmToken &&
      permission === "granted" &&
      !userAccess.isConfirm &&
      !userTempAccess.isConfirm
    ) {
      showNotificationDisabledToast(handleEnableNotification);
    } else {
      toast.dismiss(Notification_DISABLED_TOAST_ID);
    }
  }, [fcmToken, permission, userAccess.isConfirm, userTempAccess.isConfirm]);
};
