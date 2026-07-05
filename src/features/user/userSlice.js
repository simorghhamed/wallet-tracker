import { API_ENDPOINTS } from "../../services/endpoints";
import { apiSlice } from "../api/apiSlice";
import { setCurrentUser } from "../auth/authSlice";

const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getuserInfo: builder.query({
      // you can use of custom header and use token for authorization
      query: (token) => ({
        url: API_ENDPOINTS.user,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }),
      transformResponse: (res, meta, arg) => {
        return res.data;
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const data = await queryFulfilled;

          const { email, id } = data.data;

          const [username, domain] = email.split("@");
          dispatch(
            setCurrentUser({ isAuthenticated: true, email, username, id })
          );
        } catch (error) {
          console.error("Update failed", error);
        }
      },
    }),
  }),
});

export const { useGetuserInfoQuery } = userSlice;
