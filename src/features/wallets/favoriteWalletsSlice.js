import { API_ENDPOINTS } from "../../services/endpoints";
import { apiSlice } from "../api/apiSlice";
import {
  setFavoriteNormalizedWallet,
  setUnFavoriteNormalizedWallet,
} from "./walletsSlice";

const favoriteWalletsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addWalletToFavorite: builder.mutation({
      query: (wallet) => ({
        url: API_ENDPOINTS.wallet.favorites,
        method: "POST",
        body: wallet,
      }),
      invalidatesTags: ["favoritedList"],
      transformResponse: (res, mete, arg) => {
        return res.data;
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const data = await queryFulfilled;
          dispatch(setFavoriteNormalizedWallet(data.data));
        } catch (error) {
          console.error("Update failed", error);
        }
      },
    }),

    removeWalletFromFavorite: builder.mutation({
      query: ({ address, networkId }) => ({
        url: `${API_ENDPOINTS.wallet.favorites}/one?address=${address}&networkId=${networkId}`,
        method: "DELETE",
      }),
      // invalidatesTags:["favoritedList"],
      transformResponse: (res, meta, arg) => {
        return res.data;
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const data = await queryFulfilled;
          dispatch(setUnFavoriteNormalizedWallet(data.data));
        } catch (error) {
          console.error("delte failed", error);
        }
      },
    }),
  }),
});

export const {
  useAddWalletToFavoriteMutation,
  useRemoveWalletFromFavoriteMutation,
} = favoriteWalletsSlice;
