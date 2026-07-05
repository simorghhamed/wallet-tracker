import { API_ENDPOINTS } from "../../services/endpoints";
import { apiSlice } from "../api/apiSlice";

export const networksSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNetwoks: builder.query({
      query: () => API_ENDPOINTS.network,
      transformResponse(res, meta, arg) {
        return res.data;
      },
    }),
  }),
});

export const { useGetNetwoksQuery } = networksSlice;
