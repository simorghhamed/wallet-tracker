import { API_ENDPOINTS } from "../../services/endpoints";
import { apiSlice } from "../api/apiSlice";
import { setNewWalletName } from "./walletsSlice";

const changeWalletNameSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    changeWalletName: builder.mutation({
      query: (walletData) => ({
        url: API_ENDPOINTS.wallet.trackes.tackedName,
        method: "PUT",
        body: walletData,
      }),
      invalidatesTags: ["TrackList", "favoritedList"],
      transformResponse: (res, meta, arg) => {
        return res.data;
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const data = await queryFulfilled;
          if (data) {
            dispatch(setNewWalletName(data.data));
          }
        } catch (error) {
          console.log("get data filed");
        }
      },
    }),
  }),
});

export const { useChangeWalletNameMutation } = changeWalletNameSlice;
