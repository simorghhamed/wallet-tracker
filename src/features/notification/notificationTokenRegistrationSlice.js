import { API_ENDPOINTS } from "../../services/endpoints";
import { apiSlice } from "../api/apiSlice";

const notificationTokenRegistrationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUserFcmToken: builder.mutation({
      query: (fcmObject) => ({
        url: API_ENDPOINTS.notification.registeration,
        method: "POST",
        body: fcmObject,
      }),
      extraOptions: { maxRetries: 2 },
    }),
    registerUserTempFcmToken: builder.mutation({
      query: (fcmObject) => ({
        url: API_ENDPOINTS.notification.registerationTemp,
        method: "POST",
        body: fcmObject,
      }),
    }),
  }),
});

export const {
  useRegisterUserFcmTokenMutation,
  useRegisterUserTempFcmTokenMutation,
} = notificationTokenRegistrationSlice;
