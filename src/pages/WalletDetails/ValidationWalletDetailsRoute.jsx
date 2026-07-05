import { useEffect, useState } from "react";
import { useAddSearchWalletMutation } from "../../features/wallets/searchWalletSlice";
import { WalletDetailsSkeletonLoader } from "../../components/Loaders/WalletDetailsSkeletonLoader";
import {
  getNetworkType,
  SUPPORTED_NETWORKS,
  validateWalletAddress,
} from "../../Utils/Funcs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import {
  setCurrentWallet,
  setFavoriteNormalizedWallet,
  setTrackNormalizedWallet,
} from "../../features/wallets/walletsSlice";
import { useGetWalletInfoQuery } from "../../features/wallets/walletItemInfoSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { getUserToken } from "../../features/auth/authSlice";
import Cookies from "js-cookie";

export const ValidationWalletDetailsRoute = ({
  children,
  network,
  address,
  currentWallet,
}) => {
  const dispatch = useAppDispatch();
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();
  const userToken = useAppSelector(getUserToken);
  const userId = Cookies.get("userId");
  // const [addSearchWallet, { isLoading, error }] = useAddSearchWalletMutation();
  const networkType = getNetworkType(network);
  const { data, isFetching, error } = useGetWalletInfoQuery(
    { address, networkName: networkType, userToken: userToken || userId },
    {
      skip: !isReady || !address || !networkType || !(userToken || userId),
      refetchOnMountOrArgChange: true,
    }
  );

  // validation
  useEffect(() => {
    const validateAndFetchWallet = async () => {
      if (!network || !address) {
        navigate("/");
        return setIsReady(false);
      }
      if (!SUPPORTED_NETWORKS.includes(network.toLowerCase())) {
        navigate("/");
        return setIsReady(false);
      }

      if (!networkType) {
        navigate("/");
        return setIsReady(false);
      }
      if (!validateWalletAddress(address, networkType)) {
        navigate("/");
        return setIsReady(false);
      }

      console.log("✅ All validations passed!");
      setIsReady(true);
    };

    validateAndFetchWallet();
  }, [network, address]);

  // search wallet on page request
  useEffect(() => {
    const searchWalletOnMount = async () => {
      if (data) {
        dispatch(setCurrentWallet(data));
        if (data.tracked) {
          // dispatch(setTrackNormalizedWallet(data));
        }

        if (data.isFavorite) {
          // dispatch(setFavoriteNormalizedWallet(data));
        }
      }
    };

    if (isReady) {
      // bug on wallet item page becus set the search history on visiting page
      searchWalletOnMount();
    }
  }, [isReady, data]);

  if (isFetching) return <WalletDetailsSkeletonLoader />;
  if (!isReady) return null;
  if (error) return;
  return <>{children}</>;
};
