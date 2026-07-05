import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../services/endpoints";
import Cookies from "js-cookie";
const endpoints = [
  "getWalletsNormalized",
  "getTrackedWallets",
  "addWalletToTrack",
  "unTrackWallet",
  "getFavoritesWallets",
  "addWalletToFavorite",
  "removeWalletFromFavorite",
  "addSearchWallet",
  "getSearchHistory",
  "deleteItemSearchHistory",
  "getuserInfo",
  "changeWalletName",
  "registerUserFcmToken",
  "changePrirotyFavoriteWallets",
  "changePrirotyTrackedWallets",
];
export const isEndpointPrivite = (endpoint) => {
  return endpoints.includes(endpoint);
};
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState, endpoint, type }) => {
      const token = getState().auth.token;
      if (token && isEndpointPrivite(endpoint)) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: () => ({}),
});
