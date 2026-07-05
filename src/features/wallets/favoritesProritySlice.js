import { API_ENDPOINTS } from "../../services/endpoints";
import { apiSlice } from "../api/apiSlice";
import { setTrackNormalizedWallet } from "./walletsSlice";

const favoritesProritySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    changePrirotyFavoriteWallets: builder.mutation({
      query: (wallets) => ({
        url: API_ENDPOINTS.wallet.favoritesPriroty,
        method: "PUT",
        body: {
          favorites: wallets,
        },
      }),
      invalidatesTags: ["favoritedList"],
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

export const { useChangePrirotyFavoriteWalletsMutation } =
  favoritesProritySlice;
