import { Star } from "lucide-react";
import { useAppSelector } from "../../app/hook";
import { getFavoritedWallets } from "../../features/wallets/walletsSlice";

export const WalletItemFavoriteAction = ({
  isFavorite,
  onClick,
  isLoading,
}) => {
  return (
    <button
      className={`p-[10px] max-w-11 max-h-11 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
        isFavorite
          ? "bg-[#161616] hover:bg-custom-green/30"
          : "bg-[#161616] hover:bg-[#3B3B3B]/80"
      }`}
      onClick={() => onClick()}
      data-no-click
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-custom-green border-t-transparent"></div>
      ) : (
        <Star
          size={22}
          className={`transition-all duration-300 ${
            isFavorite
              ? "text-custom-green fill-custom-green"
              : "text-gray-400 hover:text-white"
          }`}
          data-no-click
        />
      )}
    </button>
  );
};
