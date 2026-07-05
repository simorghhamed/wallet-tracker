import { API_ENDPOINTS } from "../../services/endpoints";
import { apiSlice } from "../api/apiSlice";
import { setUnTrackNormalizedWallet } from "./walletsSlice";

const unTrackWalletSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    unTrackWallet: builder.mutation({
      query: ({ address, networkId }) => ({
        url: `${API_ENDPOINTS.wallet.trackes.unTrack}?address=${address}&networkId=${networkId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TrackList", "TrackLimit"],
      transformResponse: (res, meta, arg) => {
        return res.data;
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const data = await queryFulfilled;
          dispatch(setUnTrackNormalizedWallet(data.data));
        } catch (error) {
          console.error("delte failed", error);
        }
      },
    }),
    unTrackTempWallet: builder.mutation({
      query: ({ address, userId, networkId }) => ({
        url: `${API_ENDPOINTS.wallet.trackes.tempUnTrack}?userId=${userId}&address=${address}&networkId=${networkId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TrackList", "TrackLimit"],
      transformResponse: (res, meta, arg) => {
        return res.data;
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const data = await queryFulfilled;
          dispatch(setUnTrackNormalizedWallet(data.data));
        } catch (error) {
          console.error("delte failed", error);
        }
      },
    }),
  }),
});

export const { useUnTrackWalletMutation, useUnTrackTempWalletMutation } =
  unTrackWalletSlice;
