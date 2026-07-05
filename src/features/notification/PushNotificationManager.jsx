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
import { useNotificationPermission } from "../../hooks/useNotificationPermission";
import { useNotificationPopup } from "../../hooks/useNotificationPopup";
import { useFcmToken } from "../../hooks/useFcmToken";
import { useNotificationToast } from "../../hooks/useNotificationToast";
import { useServerRegistration } from "../../hooks/useServerRegistration";
import { useMessage } from "../../hooks/useMessage";

/**
 * Manages push notification logic, including permission requests, FCM token handling, and server communication.
 * @returns {void}
 */
export const PushNotificationManager = () => {
  const dispatch = useAppDispatch();
  const userToken = useAppSelector(getUserToken);
  const userId = Cookies.get("userId");
  const statusAccess = useAppSelector(
    (state) => state.notification.statusAccess
  );
  const { fcmToken, permission, isOverNotificationDisabled } = useAppSelector(
    selectorNotificationSlice
  );

  useNotificationPopup();
  useNotificationPermission();
  useFcmToken();
  useNotificationToast();
  useServerRegistration();
  const { message } = useMessage();

  useEffect(() => {
    if (message) {
      showNotificationMessage(message);
    }
  }, [message]);

  if (
    statusAccess.userAccess.isConfirming ||
    statusAccess.userTempAccess.isConfirming
  )
    return <DialogCircleLoader />;
};
