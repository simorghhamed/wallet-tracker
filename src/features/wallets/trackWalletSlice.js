import { API_ENDPOINTS } from "../../services/endpoints";
import { apiSlice } from "../api/apiSlice";
import { setTrackNormalizedWallet } from "./walletsSlice";

const trackWalletSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addWalletToTrack: builder.mutation({
      query: (wallet) => ({
        url: API_ENDPOINTS.wallet.trackes.track,
        method: "POST",
        body: wallet,
      }),
      invalidatesTags: ["TrackList", "TrackLimit"],
      transformResponse: (res, meta, arg) => {
        return res.data;
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const data = await queryFulfilled;
          dispatch(setTrackNormalizedWallet(data.data));
        } catch (error) {
          console.error("Update failed", error);
        }
      },
    }),
    addWalletToTempTrack: builder.mutation({
      query: (wallet) => ({
        url: API_ENDPOINTS.wallet.trackes.tempTrack,
        method: "POST",
        body: wallet,
      }),
      invalidatesTags: ["TrackList", "TrackLimit"],
      transformResponse: (res, meta, arg) => {
        return res.data;
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const data = await queryFulfilled;
          dispatch(setTrackNormalizedWallet(data.data));
        } catch (error) {
          console.error("Update failed", error);
        }
      },
    }),
  }),
});

export const { useAddWalletToTrackMutation, useAddWalletToTempTrackMutation } = trackWalletSlice;
