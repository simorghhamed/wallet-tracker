import { API_ENDPOINTS } from "../../services/endpoints";
import { apiSlice } from "../api/apiSlice";
import { setSearchedHistory, setDeleteItemSearchHistory } from "./walletsSlice";

const searchHistorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSearchHistory: builder.query({
      query: () => API_ENDPOINTS.wallet.history,
      providesTags: ["searchHistory"],
      transformResponse: (res, meta, arg) => {
        return res.data;
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const data = await queryFulfilled;
          dispatch(setSearchedHistory(data.data));
        } catch (error) {
          console.error("Update failed", error);
        }
      },
    }),
    deleteItemSearchHistory: builder.mutation({
      query: (params) => ({
        url:
          params.type === "one"
            ? `${API_ENDPOINTS.wallet.history}?id=${params.id}&type=${params.type}`
            : `${API_ENDPOINTS.wallet.history}?type=${params.type}`,
        method: "DELETE",
      }),
      invalidatesTags: ["searchHistory"],
      transformResponse: (res, meta, arg) => {
        return res.data;
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const data = await queryFulfilled;
          console.log(data.data);

          dispatch(setDeleteItemSearchHistory(data.data));
        } catch (error) {
          console.error("Update failed", error);
        }
      },
    }),
  }),
});

export const { useGetSearchHistoryQuery, useDeleteItemSearchHistoryMutation } =
  searchHistorySlice;
