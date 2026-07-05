import Swal from "sweetalert2";
import {
  NOTIFICATION_TIME_PASS,
  NOTIFICATION_DISABLED,
  Notification_DISABLED_TOAST_ID,
} from "../../utils/constance";
import toast from "react-hot-toast";
import { BellRing, X } from "lucide-react";

export const showNotificationAlert = (arg) => {
  return Swal.fire(arg);
};

/**
 * if returen false stil disabled
 * @returns
 */
export const getStorageIsOverNotificationDisabled = () => {
  const disabledAt = parseInt(localStorage.getItem(NOTIFICATION_DISABLED), 10);

  const now = Date.now();

  return !disabledAt || now - disabledAt > NOTIFICATION_TIME_PASS;
};

export const showNotificationDisabledToast = (handleEnableNotification) => {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              {/* <img
                        className="h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                        alt=""
                      /> */}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Your Notification is disabled
              </p>
              <p className="mt-1 text-sm text-gray-500">
                You can enabled by click
                <button
                  className="m-[5px] text-[green] cursor-pointer"
                  onClick={handleEnableNotification}
                >
                  here
                </button>
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(Notification_DISABLED_TOAST_ID)}
            className="w-full cursor-pointer border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    ),
    { id: Notification_DISABLED_TOAST_ID, duration: Infinity }
  );
};


export const showNotificationMessage = (payload) => {
  const {
    data: { title, body },
  } = payload;

  toast.custom(
    (t) => {
      return (
        <div
          key={t.id}
          className={`max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5
            transform transition-all duration-300 ease-in-out
            ${t.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
          `}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 pt-0.5">
                <BellRing />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">{title}</p>
                <p className="mt-1 text-sm text-gray-500">{body}</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full cursor-pointer border border-transparent rounded-none rounded-r-lg flex p-4 items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <X />
            </button>
          </div>
        </div>
      );
    },
    { duration: Infinity } // یا هر مدت زمان دلخواه
  );
};

export const showSendingToServerToast = () => {
  const toastId = "sending-server";
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-40 bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-1">
          <div className="flex items-center">
            <div className="flex-shrink-0 pt-0.5">
              <svg
                className="w-4 h-4 text-gray-300 animate-spin"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
              >
                <path
                  d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-900"
                ></path>
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">Sending ...</p>
            </div>
          </div>
        </div>
      </div>
    ),
    { id: toastId, duration: Infinity }
  );
};

export const showSentToServerToast = (isSuccess) => {
  if (!isSuccess) return;
  const toastId = "sent-server";
  return toast.success("Successfully Sent!", { id: toastId });
};
export const accessAllertParams = {
  title: "Notification Access",
  text: "Would You Like to Receive Notifications?",
  icon: "question",
  showCancelButton: true,
  confirmButtonText: "Yes!",
  cancelButtonText: "No!",
  iconColor: "#000",
  confirmButtonColor: "#0bba54",
  background: "#3B3B3B",
  backdrop: true,
  allowOutsideClick: false,
  color: "#FFFFFF",
  customClass: {
    popup: "font-family-IranYekan-Regular rounded-[25px]",
    confirmButton: "rounded-[15px] font-family-IranYekan-Regular px-[30px]",
    cancelButton: "rounded-[15px] font-family-IranYekan-Regular px-[30px]",
  },
};

export const successAllertParams = {
  title: "Successful!",
  text: "Notification Access Enabled.!",
  icon: "success",
  confirmButtonText: "Close",
  confirmButtonColor: "#0bba54",
  background: "#3B3B3B",
  backdrop: true,
  color: "#FFFFFF",
  iconColor: "#0bba54",
  customClass: {
    popup: "font-family-IranYekan-Regular rounded-[25px]",
    confirmButton: "rounded-[15px] font-family-IranYekan-Regular px-[30px]",
  },
};

export const failedAllertParams = {
  title: "Failed!",
  text: "Failed To Notification Access.!",
  icon: "info",
  confirmButtonText: "OK!",
  confirmButtonColor: "#AF5D63",
  background: "#3B3B3B",
  backdrop: true,
  color: "#FFFFFF",
  iconColor: "#AF5D63",
  customClass: {
    title: "font-family-IranYekan-Bold",
    popup: "font-family-IranYekan-Regular rounded-[25px]",
    confirmButton: "rounded-[15px] font-family-IranYekan-Regular px-[30px]",
  },
};

export const rejectedAllertParams = {
  title: "Rejected!",
  text: "You Have Denied Notification Access.!",
  icon: "info",
  confirmButtonText: "OK!",
  confirmButtonColor: "#AF5D63",
  background: "#3B3B3B",
  backdrop: true,
  color: "#FFFFFF",
  iconColor: "#AF5D63",
  customClass: {
    title: "font-family-IranYekan-Bold",
    popup: "font-family-IranYekan-Regular rounded-[25px]",
    confirmButton: "rounded-[15px] font-family-IranYekan-Regular px-[30px]",
  },
};
