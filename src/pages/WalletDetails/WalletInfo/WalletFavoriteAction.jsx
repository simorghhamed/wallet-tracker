import { useState } from "react";
import { StarBGGradiantSvg } from "../../../assets/svg/StarBGGradiantSvg";
import { StarStrokeGradiantSvg } from "../../../assets/svg/StarStrokeGradiantSvg";
import { useAppDispatch } from "../../../app/hook";
import {
  useAddWalletToFavoriteMutation,
  useRemoveWalletFromFavoriteMutation,
} from "../../../features/wallets/favoriteWalletsSlice";
import { setLoginModalOpen } from "../../../features/auth/authSlice";
import axios from "axios";

export const WalletFavoriteAction = ({ currentWallet, userToken }) => {
  const dispatch = useAppDispatch();
  const [addWalletToFavorite, { isLoading: loadingAddingFavorite }] =
    useAddWalletToFavoriteMutation();

  const [removeWalletFromFavorite, { isLoading: loadingRemoveFavorite }] =
    useRemoveWalletFromFavoriteMutation();

  const walletAddress = currentWallet?.address;
  const networkId = currentWallet?.networkId;
  const isFavorite = currentWallet?.isFavorite;

  const handeWalletToFavorite = () => {
    if (!userToken) {
      dispatch(setLoginModalOpen());
      return;
    }

    if (!walletAddress || !networkId) return;
    const wallet = {
      address: walletAddress,
      networkId,
    };

    if (isFavorite) {
        removeWalletFromFavorite(wallet);
    } else {
      addWalletToFavorite(wallet);
    }
  };
  return (
    <button
      className="w-[45px] h-[45px] rounded-full flex items-center justify-center bg-gradient-to-r from-[#EDFF7D] to-[#49F992] p-[2px] child:transition-all child:duration-300 cursor-pointer hover:child:opacity-70"
      onClick={() => {
        handeWalletToFavorite();
      }}
    >
      {loadingAddingFavorite || loadingRemoveFavorite ? (
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent"></div>
      ) : (
        <div className="w-full h-full rounded-full bg-[#161616] flex items-center justify-center text-white pointer-events-none">
          <span
            className={`cursor-pointer pointer-events-none child:pointer-events-none transition-all duration-500 ${
              currentWallet?.isFavorite ? "" : ""
            }`}
          >
            {currentWallet?.isFavorite
              ? StarBGGradiantSvg
              : StarStrokeGradiantSvg}
          </span>
        </div>
      )}
    </button>
  );
};
