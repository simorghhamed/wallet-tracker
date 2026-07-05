import { Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Footer from "./Footer";
import { Header } from "./Header";
import { Toaster } from "react-hot-toast";
import { Particles } from "./ReactBits/Particles";
import { customGreen, customYellow } from "../utils/colors";
import { useGetuserInfoQuery } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import {
  getUserToken,
  setAuthenticated,
  setToken,
} from "../features/auth/authSlice";
import {
  useGetTempWalletsNormalizedQuery,
  useGetWalletsNormalizedQuery,
} from "../features/wallets/walletsNormalizedApiSlice";
import { API_ENDPOINTS } from "../services/endpoints";
import { skipToken } from "@reduxjs/toolkit/query";
import { setWalletsNormalizedLoading } from "../features/wallets/walletsSlice";
import { PushNotificationManager } from "../features/notification/PushNotificationManager";
import {
  setIsOverNotificationDisabled,
  setTokenRegistration,
} from "../features/notification/notificationSlice";
import { getStorageIsOverNotificationDisabled } from "../features/notification/ShowNotificationAlert";
import { useGetTrackingLimitationQuery } from "../features/wallets/trackingLimitationSlice";

export const Layout = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const userToken = useAppSelector(getUserToken);
  const userId = Cookies.get("userId");
  // this state for sure to render firs layout then outlate
  const [isReady, setIsReady] = useState(false);
  const fcmTokenStorage = localStorage.getItem("fcmToken");
  const favoriteEndpoint = API_ENDPOINTS.wallet.favorites;
  const watchListEndpoint = API_ENDPOINTS.wallet.trackes.tracked;

  const isWalletPage = location.pathname.includes("favorite")
    ? favoriteEndpoint
    : location.pathname.includes("watch-list")
    ? watchListEndpoint
    : null;
  const shouldFetch = userToken ? isWalletPage : null;

  /**
   * get user info after login
   */
  useGetuserInfoQuery(userToken, {
    skip: !userToken,
  });

  useGetTrackingLimitationQuery(userToken || userId, {
    skip: !(userToken || userId),
  });

  /**
   * get wallets trakced for user loggined
   */
  const { isLoading: loginLoading } = useGetWalletsNormalizedQuery(
    shouldFetch ?? skipToken,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // get wallets tracked on temp user
  const { isLoading: tempLoading } = useGetTempWalletsNormalizedQuery(userId, {
    skip: !isWalletPage || !userId,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    dispatch(setWalletsNormalizedLoading(loginLoading || tempLoading));
  }, [loginLoading, tempLoading]);

  const isHome = location.pathname === "/";

  // if (!isReady) return;

  return (
    <>
      {isHome && (
        <div className="absolute inset-0 z-0">
          <Particles
            particleColors={[customGreen, customYellow]}
            particleCount={700}
            particleSpread={10}
            speed={0.09}
            particleBaseSize={120}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
            className={"w-full h-full"}
          />
        </div>
      )}

      <div className="container mx-auto px-6 flex flex-col min-h-[100vh] relative z-10">
        <Header />
        <main className="min-h-max flex-1">{<Outlet />}</main>
        <Footer />
      </div>

      <Toaster
        className="z-[100]"
        position="bottom-right"
        reverseOrder={false}
      />
      <PushNotificationManager />
    </>
  );
};
