export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const API_ENDPOINTS = {
  auth: {
    google: "/api/tracker/v1/auth/google",
    register: "/api/tracker/v1/auth/register",
    registerConfirm: "/api/tracker/v1/auth/register-confirm",
    login: "/api/tracker/v1/auth/login",
  },
  network: "/api/tracker/v1/network",
  wallet: {
    trackes: {
      track: "/api/tracker/v1/wallet/track",
      tracked: "/api/tracker/v1/wallet/tracked",
      unTrack: "/api/tracker/v1/wallet/untrack",
      tempTrack: "/api/tracker/v1/wallet/temp/track",
      tempTracked: "/api/tracker/v1/wallet/temp/tracked",
      tempUnTrack: "/api/tracker/v1/wallet/temp/untrack",
      tackedName: "/api/tracker/v1/wallet/tracked/name",
    },
    favorites: "/api/tracker/v1/favorites",
    search: "/api/tracker/v1/search",
    history: "api/tracker/v1/search/history",
    info: "/api/tracker/v1/search/wallet-info",
    favoritesPriroty: "/api/tracker/v1/favorites/priority",
    trackedPriroty: "/api/tracker/v1/wallet/tracked/priority",
    trackLimit: "/api/tracker/v1/wallet/tracking-limits",
  },
  user: "/api/tracker/v1/user",
  notification: {
    registeration: "/api/tracker/v1/user/notification/token-registration",
    registerationTemp:
      "/api/tracker/v1/user/notification/token-registration-by-id",
  },
};
