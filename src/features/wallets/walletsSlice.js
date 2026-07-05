import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../services/endpoints";
import apiInstance from "../../services/apiInstance";
import { walletImages } from "../../utils/testDatas";
import { loginUser } from "../auth/authSlice";
const initialState = {
  currentWallet: null,
  isChangeWalletNameModalOpen: false,
  walletsNormalized: {
    trackedWallets: {},
    favoriteWallets: {},
    isLoading: false,
    trackeLimitation: {},
    favoritedCount: null,
  },
  searchWallets: [],
  searchHistory: [],
  draggbleWallets: false,
};

// deprecated
export const changeWalletName = createAsyncThunk(
  "wallets/changeWalletName",
  async (walletData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const { data } = await apiInstance.put(
        API_ENDPOINTS.wallet.trackes.tackedName,
        walletData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const walletsSlice = createSlice({
  name: "wallets",
  initialState,
  reducers: {
    setCurrentWallet(state, action) {
      state.currentWallet = action.payload;
    },

    setWalletNameModalOpen(state, action) {
      state.isChangeWalletNameModalOpen = action.payload;
    },

    // ........................................ wallets Normalized
    setWalletsNormalizedLoading(state, action) {
      state.walletsNormalized.isLoading = action.payload;
    },

    setWalletsNormalized(state, action) {
      const wallets = action.payload.data;
      const queryType = action.payload.queryType;

      // state.walletsNormalized = wallets.reduce(
      //   (accu, wallet) => {
      //     const { address, network } = wallet;

      //     // if (accu.byAddress[address]?.[network]) {
      //     //   accu.byAddress[address][network] = {
      //     //     ...accu.byAddress[address][network],
      //     //     [queryType]: accu.byAddress[address][network][queryType],
      //     //   };

      //     //   accu.byAddress[address][network] = {
      //     //     ...wallet,
      //     //     isFavorite: accu.byAddress[address][network]["isFavorite"],
      //     //     [queryType]: wallet[queryType],
      //     //   };
      //     // } else {
      //     //   accu.byAddress[address] = {
      //     //     [network]: wallet,
      //     //   };
      //     // }

      //     accu
      //     return accu;
      //   },
      //   { ...state.walletsNormalized }
      // );

      const walletsNormalized = wallets.reduce(
        (accu, wallet) => {
          const { address, networkId } = wallet;
          accu[queryType][address] = {
            ...accu[queryType][address],
            [networkId]: wallet,
          };

          return accu;
        },
        { ...state.walletsNormalized }
      );

      state.walletsNormalized = {
        ...state.walletsNormalized,
        [queryType]: walletsNormalized[queryType],
      };
    },

    resetWalletsNormalized(state, action) {
      state.walletsNormalized = initialState.walletsNormalized;
    },
    // ........................................ Add Wallet To Track
    setTrackNormalizedWallet(state, action) {
      const data = action.payload;

      const { address, networkId } = data;
      if (
        state.currentWallet?.address === data.address &&
        state.currentWallet?.networkId === data.networkId
      ) {
        state.currentWallet = {
          ...state.currentWallet,
          ...data,
          tracked: true,
        };
      }

      state.walletsNormalized.trackedWallets = {
        ...state.walletsNormalized.trackedWallets,
        [address]: {
          ...state.walletsNormalized.trackedWallets[address],
          [networkId]: data,
        },
      };
    },

    // ........................................ Remove Wallet From Track
    setUnTrackNormalizedWallet(state, action) {
      const data = action.payload;
      const { address, networkId } = data;
      if (
        state.currentWallet?.address === data.address &&
        state.currentWallet?.networkId === data.networkId
      ) {
        state.currentWallet = {
          ...state.currentWallet,
          ...data,
          tracked: false,
        };
      }

      state.walletsNormalized.trackedWallets[address][networkId] = {
        ...state.walletsNormalized.trackedWallets[address][networkId],
        tracked: false,
      };
    },

    // ........................................ Add Wallet To Favorites
    setFavoriteNormalizedWallet(state, action) {
      const data = action.payload;

      const { address, networkId } = data;
      if (
        state.currentWallet?.address === data.address &&
        state.currentWallet?.networkId === data.networkId
      ) {
        state.currentWallet = {
          ...state.currentWallet,
          ...data,
        };
      }

      state.walletsNormalized.favoriteWallets = {
        ...state.walletsNormalized.favoriteWallets,
        [address]: {
          ...state.walletsNormalized.favoriteWallets[address],
          [networkId]: data,
        },
      };
    },

    // ........................................ Remove Wallet From Favorites
    setUnFavoriteNormalizedWallet(state, action) {
      const data = action.payload;
      const { address, networkId } = data;
      if (
        state.currentWallet?.address === data.address &&
        state.currentWallet?.networkId === data.networkId
      ) {
        state.currentWallet = {
          ...state.currentWallet,
          ...data,
          isFavorite: false,
        };
      }

      state.walletsNormalized.favoriteWallets[address][networkId] = {
        ...state.walletsNormalized.favoriteWallets[address][networkId],
        isFavorite: false,
      };
    },
    // ........................................ End wallets Normalized

    // ........................................ Search
    setSearchWallets(state, action) {
      state.searchWallets = [];
      if (action?.payload && action.payload.address) {
        state.searchWallets.push(action.payload);
      }
    },

    // ........................................ History
    setSearchedHistory(state, action) {
      if (action?.payload) {
        state.searchHistory = action?.payload;
      }
    },

    setDeleteItemSearchHistory(state, action) {
      if (action.type === "all") {
        state.searchHistory = [];
        return;
      }

      if (action.type === "one") {
        const deletedId = action?.payload?.ids;
        state.searchHistory = state.searchHistory.filter(
          (item) => item.id !== deletedId
        );
      }
    },

    setNewWalletName(state, action) {
      const { address, networkId, name } = action.payload.data;

      if (
        state.currentWallet !== null &&
        state?.currentWallet?.address === address &&
        state?.currentWallet?.networkId === networkId
      ) {
        state.currentWallet = {
          ...state.currentWallet,
          name,
        };
      }

      state.walletsNormalized.trackedWallets = {
        ...state.walletsNormalized.trackedWallets,
        [address]: {
          ...state.walletsNormalized.trackedWallets[address],
          [networkId]: {
            ...state.walletsNormalized.trackedWallets[address][networkId],
            name,
          },
        },
      };

      state.walletsNormalized.favoriteWallets = {
        ...state.walletsNormalized.favoriteWallets,
        [address]: {
          ...state.walletsNormalized.favoriteWallets[address],
          [networkId]: {
            ...state.walletsNormalized.favoriteWallets[address][networkId],
            name,
          },
        },
      };
    },

    setDraggbleWallets(state, action) {
      state.draggbleWallets = action.payload;
    },

    setTrackLimitation(state, action) {
      const limit = action.payload;
      state.walletsNormalized.trackeLimitation = limit;
    },
  },

  extraReducers: (builder) => {
    builder
      // ........................................ Change Wallet Name
      .addCase(changeWalletName.fulfilled, (state, action) => {
        const { address, networkId, name } = action.payload.data;

        if (
          state.currentWallet !== null &&
          state?.currentWallet?.address === address &&
          state?.currentWallet?.networkId === networkId
        ) {
          state.currentWallet = {
            ...state.currentWallet,
            name,
          };
        }

        state.trackedWallets = state.trackedWallets.map((wallet) => {
          if (wallet?.address === address && wallet?.networkId === networkId) {
            return {
              ...wallet,
              name,
            };
          }
          return wallet;
        });

        state.favoriteWallets = state.favoriteWallets.map((wallet) => {
          if (wallet?.address === address && wallet?.networkId === networkId) {
            return {
              ...wallet,
              name,
            };
          }
          return wallet;
        });
      });
    // ........................................ Change Wallet Name
  },
});

export default walletsSlice.reducer;
export const {
  setCurrentWallet,
  setWalletNameModalOpen,
  setWalletsNormalized,
  setSearchWallets,
  setSearchedHistory,
  setDeleteItemSearchHistory,
  setCleareSearchHistory,
  setNewWalletName,
  setWalletsNormalizedLoading,
  setTrackNormalizedWallet,
  setUnTrackNormalizedWallet,
  setFavoriteNormalizedWallet,
  setUnFavoriteNormalizedWallet,
  resetWalletsNormalized,
  setDraggbleWallets,
  setTrackLimitation,
} = walletsSlice.actions;

export const getSearchWallets = (state) => state.wallets.searchWallets;
export const getCurrentWallet = (state) => state.wallets.currentWallet;
export const getTrackedWallets = (state) => state.wallets.trackedWallets;
export const getFavoritedWallets = (state) => state.wallets.favoriteWallets;
export const getWalletsNormalizedLoading = (state) =>
  state.wallets.walletsNormalized.isLoading;
export const getTrackedWalletsNormalized = (state) =>
  state.wallets.walletsNormalized.trackedWallets;
export const getFavoriteWalletsNormalized = (state) =>
  state.wallets.walletsNormalized.favoriteWallets;
export const getTrackLimitation = (state) =>
  state.wallets.walletsNormalized.trackeLimitation;
