import { createSelector } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import {
  useAddWalletToTempTrackMutation,
  useAddWalletToTrackMutation,
} from "../../../features/wallets/trackWalletSlice";
import { getUserToken, setLoginModalOpen } from "../../../features/auth/authSlice";
import { getTrackedWallets } from "../../../features/wallets/walletsSlice";
import {
  useUnTrackTempWalletMutation,
  useUnTrackWalletMutation,
} from "../../../features/wallets/unTrackWalletSlice";
import Cookies from "js-cookie";
import { useOutletContext } from "react-router-dom";

export const WalletTrackAction = ({ currentWallet }) => {
  const hasAccess = useOutletContext();
  const dispatch = useAppDispatch()
  // login tracking
  const [addWalletToTrack, { isLoading: loadingTracking }] =
    useAddWalletToTrackMutation();

  const [unTrackWallet, { isLoading: loadingUnTracking }] =
    useUnTrackWalletMutation();

  // temp trakcing
  const [addWalletToTempTrack, { isLoading: loadingTempTracking }] =
    useAddWalletToTempTrackMutation();

  const [unTrackTempWallet, { isLoading: loadingTempUnTracking }] =
    useUnTrackTempWalletMutation();

  const selector = createSelector(
    [getUserToken, getTrackedWallets],
    (userToken, trackedWallets) => ({ userToken, trackedWallets })
  );
  const { userToken, trackedWallets } = useAppSelector(selector);
  const isTracked = currentWallet?.tracked;
  const walletAddress = currentWallet?.address;
  const networkId = currentWallet?.networkId;
  const userId = Cookies.get("userId");

  const handleTrackWallet = async () => {
    if (!walletAddress || !networkId) return;
    if (userToken) {
      const trackWalletDatas = {
        address: walletAddress,
        networkId,
      };

      if (isTracked) {
        await unTrackWallet(trackWalletDatas);
      } else {
        if (!hasAccess) {
          dispatch(setLoginModalOpen());
          return;
        }
        await addWalletToTrack(trackWalletDatas);
      }
    } else if (userId) {
      const trackWalletDatas = {
        address: walletAddress,
        networkId,
        userId,
      };

      if (isTracked) {
        await unTrackTempWallet(trackWalletDatas);
      } else {
        if (!hasAccess) {
          dispatch(setLoginModalOpen());
          return;
        }
        await addWalletToTempTrack(trackWalletDatas);
      }
    }
  };

  return (
    <button
      className={`w-full h-14 max-w-[140px] py-4 text-center text-black bg-gradient-to-r from-custom-green to-custom-yellow hover:from-[#3de080] hover:to-[#d4e86b] font-family-IranYekan-Bold rounded-[15px] cursor-pointer transition-all duration-200 hover:opacity-80
                          flex items-center justify-center gap-1
                          `}
      // ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
      onClick={() => {
        handleTrackWallet();
      }}
    >
      {loadingTracking ||
      loadingUnTracking ||
      loadingTempTracking ||
      loadingTempUnTracking ? (
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent"></div>
      ) : currentWallet?.tracked ? (
        "UnTrack"
      ) : (
        "Track"
      )}
    </button>
  );
};
