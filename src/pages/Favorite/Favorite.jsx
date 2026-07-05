import { FavoriteContent } from "./FavoriteContent";
import { useAppSelector } from "../../app/hook";
import { FavoritesSkeletonLoader } from "../../components/Loaders/FavoritesSkeletonLoader";
import { createSelector } from "@reduxjs/toolkit";
import {
  getFavoriteWalletsNormalized,
  getWalletsNormalizedLoading,
} from "../../features/wallets/walletsSlice";
import { EmptyState } from "../../components/EmptyState";

export function Favorite() {
  const selector = createSelector(
    [getFavoriteWalletsNormalized, getWalletsNormalizedLoading],
    (favoritedWallet, isLoading) => {
      return {
        favoritedWallet,
        isLoading,
      };
    }
  );

  const { favoritedWallet, isLoading } = useAppSelector(selector);

  if (isLoading) return <FavoritesSkeletonLoader />;

  if (!Object.keys(favoritedWallet).length) {
    return <EmptyState content="Favorites"/>
  }
 
  
  return <FavoriteContent favoritedWallet={favoritedWallet} />;
}
