import { API_ENDPOINTS } from "../../services/endpoints";
import { apiSlice } from "../api/apiSlice";
import { setWalletsNormalized } from "./walletsSlice";

const walletsNormalizedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWalletsNormalized: builder.query({
      query: (endpoint) => endpoint,
      providesTags: ["TrackList", "favoritedList"],
      transformResponse: (res, meta, arg) => {
        return res.data;
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled;

          const argTrack = "/api/tracker/v1/wallet/tracked";
          const argFavoite = "/api/tracker/v1/favorites";
          const queryType =
            arg === argTrack
              ? "trackedWallets"
              : arg === argFavoite
              ? "favoriteWallets"
              : null;

          dispatch(setWalletsNormalized({ data: [...result.data], queryType }));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    getTempWalletsNormalized: builder.query({
      query: (userId) =>
        `${API_ENDPOINTS.wallet.trackes.tempTracked}?id=${userId}`,
      providesTags: ["TrackList"],
      transformResponse: (res, meta, arg) => {
        return res.data;
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled;

          const queryType = "trackedWallets";

          dispatch(setWalletsNormalized({ data: [...result.data], queryType }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetWalletsNormalizedQuery,
  useGetTempWalletsNormalizedQuery,
} = walletsNormalizedApiSlice;
