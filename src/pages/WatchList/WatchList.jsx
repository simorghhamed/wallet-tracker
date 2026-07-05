import { WatchListContent } from "./WatchListContent";
import { getWalletsNormalizedLoading } from "../../features/wallets/walletsSlice";
import { useAppSelector } from "../../app/hook";
import { WatchListSkeletonLoader } from "../../components/Loaders/WatchListSkeletonLoader";
import { getTrackedWalletsNormalized } from "../../features/wallets/walletsSlice";
import { createSelector } from "@reduxjs/toolkit";
import { EmptyState } from "../../components/EmptyState";

export const WatchList = () => {
  const selector = createSelector(
    [getTrackedWalletsNormalized, getWalletsNormalizedLoading],
    (trackedWallets, isLoading) => {
      return {
        trackedWallets,
        isLoading,
      };
    }
  );

  const { trackedWallets, isLoading } = useAppSelector(selector);

  if (isLoading) return <WatchListSkeletonLoader />;

  if (!Object.keys(trackedWallets).length) {
    return <EmptyState content="Wallet To Track"/>;
  }
  return <WatchListContent trackedWallets={trackedWallets} />;
};
