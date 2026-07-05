import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiInstance from "../../services/apiInstance";
import { API_ENDPOINTS } from "../../services/endpoints";
import Cookies from "js-cookie";
import { NOTIFICATION_DISABLED } from "../../utils/constance";
import { resetWalletsNormalized } from "../wallets/walletsSlice";
import { resetNotificationState, setStatusAccess } from "../notification/notificationSlice";
import { initialState as notificationInitialState } from "../notification/notificationSlice";
export const initialState = {
  // ---------------------------  Modals ---------------------------

  isRegisterModalOpen: false,
  isRegisterConfirmModalOpen: false,
  isLoginModalOpen: false,

  // ---------------------------  Modals ---------------------------

  // ---------------------------  Loading States ---------------------------

  isLoading: false,
  error: null,

  // ... Track & UnTrack
  isLoadingTracking: false,
  // ... Track & UnTrack

  // ---------------------------  Loading States ---------------------------

  // ---------------------------  Register Data ---------------------------
  currentRegisterEmail: "",
  // ---------------------------  Register Data ---------------------------

  // ---------------------------  User Data ---------------------------
  currentUser: null,
  isAuthenticated: false,
  token: null,
};

// Google Auth
export const googleAuth = createAsyncThunk(
  "auth/googleAuth",
  async (token, { rejectWithValue, getState }) => {
    try {
      const response = await apiInstance.post(
        API_ENDPOINTS.auth.google,
        {},
        {
          params: {
            token,
          },
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response)
      return response.data;
    } catch (error) {
      // console.log(error)
      return rejectWithValue(error);
    }
  }
);
// Google Auth

// Registers
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue, getState }) => {
    try {
      const response = await apiInstance.post(
        API_ENDPOINTS.auth.register,
        data
      );

      // console.log(response)
      return response.data;
    } catch (error) {
      // console.log(error)
      return rejectWithValue(error);
    }
  }
);

export const registerConfirmUser = createAsyncThunk(
  "auth/registerConfirmUser",
  async (data, { rejectWithValue, getState }) => {
    try {
      const response = await apiInstance.post(
        API_ENDPOINTS.auth.registerConfirm,
        data
      );

      // console.log(response)
      return response.data;
    } catch (error) {
      // console.log(error)
      return rejectWithValue(error);
    }
  }
);
// Registers

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue, getState }) => {
    try {
      const response = await apiInstance.post(API_ENDPOINTS.auth.login, data);
      return response.data;
    } catch (error) {
      // console.log(error)
      return rejectWithValue(error);
    }
  }
);

export const authMiddleware = (store) => (next) => (action) => {
  const token = store.getState().auth.token;
  if (token) {
    Cookies.remove("userId");
    if (!Cookies.get("userToken")) {
      Cookies.set("userToken", token);
    }
  } else {
    Cookies.remove("userToken");
    if (!Cookies.get("userId")) {
      Cookies.set("userId", crypto.randomUUID());
    }
  }

  return next(action);
};

export const authMiddlewareAfterlogin = (store) => (next) => (action) => {
  if (action.type === "auth/loginUser/fulfilled") {
    localStorage.removeItem("fcmToken");
    localStorage.removeItem(NOTIFICATION_DISABLED);
    store.dispatch(resetWalletsNormalized());
    store.dispatch(resetNotificationState());
  }

  return next(action);
};

export const authMiddlewareAfterlogout = (store) => (next) => (action) => {
  if (action.type === "auth/logoutUser") {
    localStorage.removeItem("fcmToken");
    localStorage.setItem(NOTIFICATION_DISABLED, Date.now());
    store.dispatch(resetWalletsNormalized());
    store.dispatch(resetNotificationState());
    // store.dispatch(setStatusAccess({...notificationInitialState.statusAccess}))
  }

  return next(action);
};

// Login

const clearAuthUserLogic = (state) => {
  Cookies.remove("userToken");

  // after logout most set userId for user temp
  if (!Cookies.get("userId")) {
    Cookies.set("userId", crypto.randomUUID());
  }

  state.currentUser = null;
  state.isAuthenticated = false;
  state.token = null;
};

export const clearCurrentUserThunk = () => (dispatch, action) => {
  dispatch(logoutUser());
  dispatch(resetWalletsNormalized());
  localStorage.setItem(NOTIFICATION_DISABLED, Date.now());
  localStorage.removeItem("fcmToken");
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRegisterModalOpen(state, action) {
      state.isRegisterModalOpen = true;
    },

    setRegisterModalClose(state, action) {
      state.isRegisterModalOpen = false;
    },

    setRegisterConfirmModalOpen(state, action) {
      state.isRegisterConfirmModalOpen = true;
    },

    setRegisterConfirmModalClose(state, action) {
      state.isRegisterConfirmModalOpen = false;
    },

    setLoginModalOpen(state, action) {
      state.isLoginModalOpen = true;
      state.isRegisterModalOpen = false; // بستن مودال دیگر
    },

    setLoginModalClose(state, action) {
      state.isLoginModalOpen = false;
    },

    setCurrentUser(state, action) {
      const { isAuthenticated, email, username, id } = action.payload;

      state.isAuthenticated = isAuthenticated;

      state.currentUser = {
        email,
        username,
        id,
      };
    },

    cleareAuthUser(state, action) {
      clearAuthUserLogic(state);
    },

    logoutUser(state, action) {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.token = null;
    },

    setToken(state, action) {
      state.token = action.payload;
      if (action.payload) {
        Cookies.set("userToken", action.payload);
      }
    },

    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // ........................................ Google Auth
      .addCase(googleAuth.fulfilled, (state, action) => {
        // console.log('action.payload =>>>>> ', action.payload)
        const { email, token, username } = action.payload.data;
        if (email && username) {
          state.currentUser = {
            email,
            username,
          };
        }
        if (token) {
          state.token = token;
          state.isAuthenticated = true;
          // localStorage.setItem('userToken', JSON.stringify(token))
          Cookies.set("userToken", token);
        }

        state.isLoginModalOpen = false;
        state.isRegisterModalOpen = false;
      })
      // ........................................ Google Auth

      // ........................................ Registers
      .addCase(registerUser.fulfilled, (state, action) => {
        const { email } = action.payload.data;

        if (email) {
          state.currentRegisterEmail = email;
        }

        state.isRegisterModalOpen = false;
        state.isRegisterConfirmModalOpen = true;
      })

      .addCase(registerConfirmUser.fulfilled, (state, action) => {
        const { token } = action.payload.data;

        if (token) {
          state.token = token;
          state.isAuthenticated = true;
          Cookies.set("userToken", token);
          state.currentUser = {
            email: state.currentRegisterEmail,
            username: state.currentRegisterEmail,
          };
        }

        state.isRegisterConfirmModalOpen = false;
      })
      // ........................................ Registers

      // ........................................ Login
      .addCase(loginUser.fulfilled, (state, action) => {
        const { token } = action.payload.data;

        if (token) {
          state.token = token;
          state.isAuthenticated = true;

          state.currentUser = {
            email: state.currentRegisterEmail,
            username: state.currentRegisterEmail,
          };
        }
        state.isLoginModalOpen = false;
      });
    // ........................................ Login
  },
});

export default authSlice.reducer;
export const {
  setRegisterModalOpen,
  setRegisterModalClose,
  setRegisterConfirmModalOpen,
  setRegisterConfirmModalClose,
  setLoginModalOpen,
  setLoginModalClose,
  setCurrentUser,
  logoutUser,
  cleareAuthUser,
  setToken,
  setAuthenticated,
} = authSlice.actions;

export const getCurrentUser = (state) => state.auth.currentUser;
export const getCurrentRegisterEmail = (state) =>
  state.auth.currentRegisterEmail;
export const checkIsAuthenticated = (state) => state.auth.isAuthenticated;
export const checkIsLoginModalOpen = (state) => state.auth.isLoginModalOpen;
export const checkIsRegisterModalOpen = (state) =>
  state.auth.isRegisterModalOpen;
export const getUserToken = (state) => state.auth.token;
