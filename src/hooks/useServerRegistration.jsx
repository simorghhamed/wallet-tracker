import { useEffect } from "react";
import {
  useRegisterUserFcmTokenMutation,
  useRegisterUserTempFcmTokenMutation,
} from "../features/notification/notificationTokenRegistrationSlice";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { getPlatform } from "../utils/getPlatform";
import {
  failedAllertParams,
  showNotificationAlert,
  successAllertParams,
} from "../features/notification/ShowNotificationAlert";
import { setStatusAccess } from "../features/notification/notificationSlice";
import { getUserToken } from "../features/auth/authSlice";
import Cookies from "js-cookie";
export const useServerRegistration = () => {
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
  const userId = Cookies.get("userId");
  const userToken = useAppSelector(getUserToken);
  const [
    registerUserFcmToken,
    { isLoading, isSuccess: isSuccessUser, isError, error },
  ] = useRegisterUserFcmTokenMutation();

  const [
    registerUserTempFcmToken,
    {
      isLoading: tempLoading,
      isSuccess: isSuccessUserTemp,
      isError: tempError,
    },
  ] = useRegisterUserTempFcmTokenMutation();

  useEffect(() => {
    const sendUserFcmTokenToServer = async () => {
      try {
        await registerUserFcmToken({
          fcm_token: fcmToken,
          platform: getPlatform(),
        }).unwrap();

        localStorage.setItem("fcmToken", fcmToken);
        // dispatch(setIsOverNotificationDisabled(true));

        showNotificationAlert(successAllertParams);
      } catch (error) {
        console.error("Failed to send FCM token to server:", error);
        showNotificationAlert(failedAllertParams);
      }
    };

    const sendUserTempFcmTokenToServer = async () => {
      try {
        await registerUserTempFcmToken({
          fcm_token: fcmToken,
          userId,
        }).unwrap();

        localStorage.setItem("fcmToken", fcmToken);
        showNotificationAlert(successAllertParams);
      } catch (error) {
        console.error("Failed to send FCM token to server:", error);
        showNotificationAlert(failedAllertParams);
      }
    };

    if (userToken && fcmToken && !localStorage.getItem("fcmToken")) {
      sendUserFcmTokenToServer();
    }

    if (userId && fcmToken && userTempAccess.isConfirm) {
      sendUserTempFcmTokenToServer();
    }
  }, [
    userId,
    userToken,
    fcmToken,
    userAccess.isConfirmed,
    userTempAccess.isConfirm,
  ]);

  useEffect(() => {
    if (isLoading) {
      dispatch(
        setStatusAccess({
          userAccess: {
            ...userAccess,
            isConfirming: true,
            isConfirm: false,
          },
        })
      );
    }

    if (tempLoading) {
      dispatch(
        setStatusAccess({
          userTempAccess: {
            ...userTempAccess,
            isConfirming: true,
            isConfirm: false,
          },
        })
      );
    }

    if (isSuccessUser) {
      dispatch(
        setStatusAccess({
          userAccess: {
            ...userTempAccess,
            isConfirming: false,
            isConfirmed: true,
          },
        })
      );
    }

    if (isSuccessUserTemp) {
      dispatch(
        setStatusAccess({
          userTempAccess: {
            ...userTempAccess,
            isConfirming: false,
            isConfirmed: true,
          },
        })
      );
    }

    if (isError) {
      dispatch(
        setStatusAccess({
          userAccess: {
            ...userAccess,
            isConfirming: false,
          },
        })
      );
    }

    if (tempError) {
      dispatch(
        setStatusAccess({
          userTempAccess: {
            ...userTempAccess,
            isConfirming: false,
          },
        })
      );
    }
  }, [
    isSuccessUser,
    isSuccessUserTemp,
    isLoading,
    tempLoading,
    tempError,
    isError,
  ]);
};
