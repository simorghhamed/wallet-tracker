import { meta } from "@eslint/js";
import { API_ENDPOINTS } from "../../services/endpoints";
import { apiSlice } from "../api/apiSlice";
import { setSearchWallets } from "./walletsSlice";

const searchWalletSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addSearchWallet: builder.mutation({
      query: (wallet) => ({
        url: API_ENDPOINTS.wallet.search,
        method: "POST",
        body: wallet,
      }),
      invalidatesTags: ["searchHistory"],
      transformResponse: (res, meta, arg) => {
        return res.data;
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const data = await queryFulfilled;

          // set to wallets.searchWallets state
          dispatch(setSearchWallets(data.data));
        } catch (error) {
          console.error("Update failed", error);
        }
      },
    }),
  }),
});

export const { useAddSearchWalletMutation } = searchWalletSlice;
