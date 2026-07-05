import { API_ENDPOINTS } from "../../services/endpoints";
import { apiSlice } from "../api/apiSlice";

const walletItemInfoSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWalletInfo: builder.query({
      query: ({ address, networkName, userToken }) =>
        `${API_ENDPOINTS.wallet.info}?address=${address}&networkName=${networkName}&userToken=${userToken}`,
      transformResponse: (res, meta, arg) => {
        return res.data;
      },
    }),
  }),
});

export const { useGetWalletInfoQuery } = walletItemInfoSlice;
