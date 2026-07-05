import { useEffect } from "react";
import {
  setIsEnableNotification,
  setStatusAccess,
} from "../features/notification/notificationSlice";
import { useAppSelector } from "../app/hook";
import {
  accessAllertParams,
  showNotificationAlert,
} from "../features/notification/ShowNotificationAlert";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { getUserToken } from "../features/auth/authSlice";

export const useNotificationPopup = () => {
  const dispatch = useDispatch();
  const isEnableNotification = useAppSelector(
    (state) => state.notification.isEnableNotification
  );
  const permission = useAppSelector((state) => state.notification.permission);
  const fcmToken = useAppSelector((state) => state.notification.fcmToken);
  const statusAccess = useAppSelector(
    (state) => state.notification.statusAccess
  );
  const userId = Cookies.get("userId");
  const userToken = useAppSelector(getUserToken);
  const { userAccess, userTempAccess } = statusAccess;

  useEffect(() => {
    const handleAccessNotification = async () => {
      if (userAccess.isConfirm || userTempAccess.isConfirm) return;

      const result = await showNotificationAlert(accessAllertParams);

      if (result.isConfirmed) {
        dispatch(setIsEnableNotification(true));
        dispatch(
          setStatusAccess(
            userToken
              ? {
                  userAccess: {
                    ...userAccess,
                    isConfirm: true,
                  },
                }
              : {
                  userTempAccess: {
                    ...userTempAccess,
                    isConfirm: true,
                  },
                }
          )
        );
      } else {
      }
    };

    if (!fcmToken && permission !== "granted" && permission !== "denied") {
      handleAccessNotification();
    }
  }, [
    fcmToken,
    userAccess.isConfirm,
    userTempAccess.isConfirm,
    permission,
    userToken,
    userId,
  ]);
};
