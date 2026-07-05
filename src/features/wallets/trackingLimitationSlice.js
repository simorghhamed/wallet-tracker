import { API_ENDPOINTS } from "../../services/endpoints";
import { apiSlice } from "../api/apiSlice";
import { setTrackLimitation } from "./walletsSlice";

const trackingLimitationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTrackingLimitation: builder.query({
      query: (userToken) =>
        `${API_ENDPOINTS.wallet.trackLimit}?userToken=${userToken}`,

      providesTags: ["TrackLimit"],
      transformResponse: (res, meta, arg) => {
        return res.data;
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const data = await queryFulfilled;
          console.log(data);

          dispatch(setTrackLimitation(data.data));
        } catch (error) {
          console.error("Update failed", error);
        }
      },
    }),
  }),
});

export const { useGetTrackingLimitationQuery } = trackingLimitationSlice;
