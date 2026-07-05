import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { setDraggbleWallets } from "../features/wallets/walletsSlice";
import { useEffect } from "react";
import { useChangePrirotyTrackedWalletsMutation } from "../features/wallets/trackedProritySlice";
import { useChangePrirotyFavoriteWalletsMutation } from "../features/wallets/favoritesProritySlice";
import toast from "react-hot-toast";
import { getUserToken } from "../features/auth/authSlice";

export const SavePritotyWalletList = ({ wallets }) => {
  const location = useLocation();
  const [
    changePrirotyTrackedWallets,
    {
      isLoading: trackeLoding,
      isError: trackedError,
      isSuccess: trackedSuccess,
    },
  ] = useChangePrirotyTrackedWalletsMutation();
  const [
    changePrirotyFavoriteWallets,
    {
      isLoading: favoriteLoading,
      isError: favoriteError,
      isSuccess: favoriteSuccess,
    },
  ] = useChangePrirotyFavoriteWalletsMutation();
  const prirotyPath =
    location.pathname === "/watch-list"
      ? "tracked"
      : location.pathname === "/favorite"
      ? "favorites"
      : null;

  const draggbleWallets = useAppSelector(
    (state) => state.wallets.draggbleWallets
  );
  const userToken = useAppSelector(getUserToken);
  const dispatch = useAppDispatch();

  const handleSaveChange = async () => {
    if (!draggbleWallets) return;
    if (!prirotyPath) return;
    if (!wallets) return;

    const prirotyWallets = wallets.reduce((accu, wallet, index) => {
      accu.push({
        id: wallet.id,
        priority: index + 1,
      });

      return accu;
    }, []);

    if (prirotyPath === "favorites") {
      await changePrirotyFavoriteWallets(prirotyWallets);
    } else if (prirotyPath === "tracked") {
      await changePrirotyTrackedWallets(prirotyWallets);
    }

    dispatch(setDraggbleWallets(false));
  };

  useEffect(() => {
    if (draggbleWallets) {
      dispatch(setDraggbleWallets(false));
    }
  }, [location]);

  useEffect(() => {
    if (trackedError || favoriteError) {
      toast.error("Filed Saving try again!");
    }
  }, [trackedError, favoriteError]);

  useEffect(() => {
    if (trackedSuccess || favoriteSuccess) {
      toast.success("Successfully Update!");
    }
  }, [trackedSuccess, favoriteSuccess]);

  if(!userToken) return
  return (
    <button
      className={`w-full h-14 max-w-[140px] py-4 text-center text-black font-family-IranYekan-Bold rounded-[15px] flex items-center justify-center gap-1 ${
        draggbleWallets
          ? "hover:from-[#3de080] hover:to-[#d4e86b] cursor-pointer transition-all duration-200 hover:opacity-80 bg-gradient-to-r from-custom-green to-custom-yellow"
          : "bg-gray-500"
      }     
        `}
      disabled={!draggbleWallets}
      onClick={handleSaveChange}
    >
      {(trackeLoding || favoriteLoading) && (
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent"></div>
      )}
      Save changes
    </button>
  );
};
