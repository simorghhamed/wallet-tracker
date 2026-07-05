import { usePushNotification } from "../../hooks/usePushNotification";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import {
  accessAllertParams,
  failedAllertParams,
  showNotificationAlert,
  showNotificationDisabledToast,
  showNotificationMessage,
  showSendingToServerToast,
  showSentToServerToast,
  successAllertParams,
} from "./ShowNotificationAlert";
import {
  NOTIFICATION_DISABLED,
  Notification_DISABLED_TOAST_ID,
} from "../../utils/constance";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getUserToken } from "../auth/authSlice";
import {
  selectorNotificationSlice,
  setErrorNotification,
  setIsOverNotificationDisabled,
  setStatusAccess,
  setTokenRegistration,
} from "./notificationSlice";

import { getPlatform } from "../../utils/getPlatform";
import {
  useRegisterUserFcmTokenMutation,
  useRegisterUserTempFcmTokenMutation,
} from "./notificationTokenRegistrationSlice";
import { getFirebaseToken } from "../../utils/firebase";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  DialogCircleLoader,
  Loader,
  LoaderMultipleCircle,
} from "../../components/Loaders/Loader";
import toast, { useToasterStore } from "react-hot-toast";

/**
 * Manages push notification logic, including permission requests, FCM token handling, and server communication.
 * @returns {void}
 */
export const PushNotificationManager = () => {
  const { toasts } = useToasterStore();

  const statusAccess = useAppSelector(
    (state) => state.notification.statusAccess
  );

  const toastIdRef = useRef(null);
  const dispatch = useAppDispatch();
  const userToken = useAppSelector(getUserToken);
  const userId = Cookies.get("userId");
  const { fcmToken, permission, isOverNotificationDisabled } = useAppSelector(
    selectorNotificationSlice
  );
  
  const fcmTokenRef = useRef(fcmToken);

  // Hook for requesting notification permission
  const { requestPermission, message } = usePushNotification();

  // Mutation hook for sending FCM token to the server
  const [
    registerUserFcmToken,
    { isLoading, isSuccess: isSuccessUser, isError, error },
  ] = useRegisterUserFcmTokenMutation();

  const [
    registerUserTempFcmToken,
    { isLoading: tempLoading, isSuccess: isSuccessUserTemp },
  ] = useRegisterUserTempFcmTokenMutation();

  /**
   * Handles enabling notifications by clearing the disabled flag and updating state.
   */
  const handleEnableNotification = () => {
    dispatch(setIsOverNotificationDisabled(true));
    if (userId) {
      // updateStatusField("userTempAccess", "isConfirm", true);
      dispatch(
        setStatusAccess({
          userTempAccess: {
            isConfirm: true,
          },
        })
      );
      localStorage.removeItem(NOTIFICATION_DISABLED);
    }
  };

  /**
   * Main effect to handle notification permission, token retrieval, and server communication.
   * Dependencies: userToken, isOverNotificationDisabled, token, permission, isError, isSuccess, error, isLoading
   */
  useEffect(() => {

    console.log({
      userToken,
      userId,
      fcmToken,
      permission,
      isOverNotificationDisabled,
      statusAccess,
    });

    /**
     * Requests notification permission after 3 seconds if user is logged in and permission is 'default'.
     * If permission is denied, stores a timestamp in localStorage and updates state.
     * @returns {Promise<void>}
     */
    const handleRequestPermission = async () => {
      if (!isOverNotificationDisabled) return;
      if (
        statusAccess.userAccess.isConfirm ||
        statusAccess.userTempAccess.isConfirm
      )
        return;
      localStorage.removeItem(NOTIFICATION_DISABLED);

      const result = await showNotificationAlert(accessAllertParams);

      if (result.isConfirmed) {
        await requestPermission();
        if (userToken) {
          dispatch(
            setStatusAccess({
              userAccess: {
                isConfirm: true,
              },
            })
          );
        }
      } else {
        localStorage.setItem(NOTIFICATION_DISABLED, Date.now());
        dispatch(setIsOverNotificationDisabled(false));
      }
    };

    if (!fcmToken && fcmTokenRef.current) {
      fcmTokenRef.current = null;
    }
    /**
     * Logic for handling permissions and token management.
     */
    // Trigger permission request after 3 seconds for logged-in users with 'default' permission
    if (
      (userToken || userId) &&
      (permission === "default" || permission === "prompt")
    ) {
      setTimeout(() => {
        handleRequestPermission();
      }, 3000);
    }

    /**
     * Retrieves FCM token and sends it to the server if user is logged in, permission is granted, and no token exists.
     */
    if (
      (userToken || userId) &&
      permission === "granted" &&
      !fcmTokenRef.current &&
      !statusAccess.userAccess.isConfirming &&
      !statusAccess.userTempAccess.isConfirming
    ) {
      getFirebaseToken()
        .then((currentToken) => {
          if (currentToken) {
            const sendUserFcmTokenToServer = async () => {
              try {
                await registerUserFcmToken({
                  fcm_token: currentToken,
                  platform: getPlatform(),
                }).unwrap();

                localStorage.setItem("fcmToken", currentToken);
                dispatch(setTokenRegistration(currentToken));
                dispatch(setIsOverNotificationDisabled(true));

                if (!fcmTokenRef.current) {
                  fcmTokenRef.current = currentToken;
                }
                if (statusAccess.userAccess.isConfirm) {
                  showNotificationAlert(successAllertParams);
                }
              } catch (error) {
                console.error("Failed to send FCM token to server:", error);
                showNotificationAlert(failedAllertParams);
              }
            };

            const sendUserTempFcmTokenToServer = async () => {
              try {
                await registerUserTempFcmToken({
                  fcm_token: currentToken,
                  userId,
                }).unwrap();

                localStorage.setItem("fcmToken", currentToken);
                dispatch(setTokenRegistration(currentToken));
                if (!fcmTokenRef.current) {
                  fcmTokenRef.current = currentToken;
                }
              } catch (error) {
                console.error("Failed to send FCM token to server:", error);
                showNotificationAlert(failedAllertParams);
              }

              dispatch(
                setStatusAccess({
                  userTempAccess: {
                    isConfirm: false,
                  },
                })
              );
            };

            if (userToken) {
              sendUserFcmTokenToServer();
            }

            if (userId && statusAccess.userTempAccess.isConfirm) {
              sendUserTempFcmTokenToServer();
            }
          }
        })
        .catch((err) => {
          console.error("Failed to retrieve FCM token:", err);
          setErrorNotification(err);
          showNotificationAlert(failedAllertParams);
        });
    }

    /**
     * Clears token from storage and state if permission is 'prompt' or 'denied'.
     */
    if (
      permission === "prompt" ||
      permission === "default" ||
      permission === "denied"
    ) {
      if (fcmToken) {
        dispatch(setTokenRegistration(null));
        dispatch(setIsOverNotificationDisabled(false));
      }
    }

    /**
     * Shows a toast notification if notifications are disabled, guiding the user to enable them.
     */
    if (!isOverNotificationDisabled) {
      showNotificationDisabledToast(handleEnableNotification);
    } else {
      toast.dismiss(Notification_DISABLED_TOAST_ID);
    }

    if (
      statusAccess.userAccess.isConfirming ||
      statusAccess.userTempAccess.isConfirming
    ) {
      dispatch(setStatusAccess({ isShowSuccessLoader: true }));
    }

    if (
      statusAccess.userAccess.isConfirmed ||
      statusAccess.userTempAccess.isConfirmed
    ) {
      setTimeout(() => {
        if (statusAccess.isShowSuccessLoader) {
          dispatch(setStatusAccess({ isShowSuccessLoader: false }));
        }
      }, 2000);

      toastIdRef.current = setTimeout(() => {
        showSentToServerToast(true);
      }, 3000);
    }

    return () => {
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
        toastIdRef.current = null;
      }
    };
  }, [
    userToken,
    isOverNotificationDisabled,
    fcmToken,
    permission,
    isError,
    // isSuccess,
    // error,
    statusAccess.userAccess.isConfirming,
    statusAccess.userTempAccess.isConfirming,
    statusAccess.isShowSuccessToast,
    statusAccess.userAccess.isConfirm,
    statusAccess.userTempAccess.isConfirm,
    statusAccess.userTempAccess.isConfirmed,
  ]);

  useEffect(() => {
    if (
      !toasts.find((toast) => toast.id === "sending-server") &&
      !toasts.find((toast) => toast.id === "sent-server") &&
      !toastIdRef.current &&
      (isSuccessUser || isSuccessUserTemp)
    ) {
      if (!statusAccess.isShowSuccessToast) {
      }
    }

    if (isLoading && !statusAccess.userAccess.isConfirming) {
      dispatch(
        setStatusAccess({
          userAccess: {
            isConfirming: true,
          },
        })
      );
    }

    if (tempLoading && !statusAccess.userTempAccess.isConfirming) {
      dispatch(
        setStatusAccess({
          userTempAccess: {
            isConfirming: true,
          },
        })
      );
    }

    if (isSuccessUser && !statusAccess.userAccess.isConfirmed) {
      dispatch(
        setStatusAccess({
          userAccess: {
            isConfirming: false,
            isConfirmed: true,
          },
        })
      );
    }

    if (isSuccessUserTemp && !statusAccess.userTempAccess.isConfirmed) {
      dispatch(
        setStatusAccess({
          userTempAccess: {
            isConfirming: false,
            isConfirmed: true,
          },
        })
      );
    }
  }, [
    toasts,
    isSuccessUser,
    isSuccessUserTemp,
    isError,
    isLoading,
    tempLoading,
    statusAccess,
  ]);

  useEffect(() => {
    if (message) {
      showNotificationMessage(message);
    }
  }, [message]);

  if (statusAccess.isShowSuccessLoader) return <DialogCircleLoader />;
};
