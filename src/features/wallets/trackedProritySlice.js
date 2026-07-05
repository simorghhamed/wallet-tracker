import { API_ENDPOINTS } from "../../services/endpoints";
import { apiSlice } from "../api/apiSlice";
import { setTrackNormalizedWallet } from "./walletsSlice";

const trackedProritySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    changePrirotyTrackedWallets: builder.mutation({
      query: (wallets) => ({
        url: API_ENDPOINTS.wallet.trackedPriroty,
        method: "PUT",
        body: {
          wallets,
        },
      }),
      invalidatesTags: ["TrackList"],
      transformResponse: (res, meta, arg) => {
        return res.data;
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const data = await queryFulfilled;
          console.log(data);

          // dispatch(setTrackNormalizedWallet(data.data));
        } catch (error) {
          console.error("Update failed", error);
        }
      },
    }),
  }),
});

export const { useChangePrirotyTrackedWalletsMutation } =
  trackedProritySlice;
