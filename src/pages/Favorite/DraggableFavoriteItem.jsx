import { DragIcon } from "../../components/WalletItemPart/DragIcon";
import { WalletItemIcon } from "../../components/WalletItemPart/WalletItemIcon";
import { WalletItemBalance } from "../../components/WalletItemPart/WalletItemBalance";
import { WalletItemAddress } from "../../components/WalletItemPart/WalletItemAddress";
import { WalletItemChain } from "../../components/WalletItemPart/WalletItemChain";
import { WalletItemQuickActions } from "../../components/WalletItemPart/WalletItemQuickActions";
import { useAppSelector } from "../../app/hook";
import { getUserToken } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import ChangeWalletNameModal from "../../components/Modals/ChangeWalletNameModal";
import {
  useAddWalletToFavoriteMutation,
  useRemoveWalletFromFavoriteMutation,
} from "../../features/wallets/favoriteWalletsSlice";
import { WalletItemFavoriteAction } from "../../components/WalletItemPart/WalletItemFavoriteAction";
import { useContext } from "react";
import { SortableItemContext } from "../../components/SortableList/SortableItem/SortableItem";

export const DraggableFavoriteItem = ({ wallet }) => {
  const navigate = useNavigate();

  const [addWalletToFavorite, { isLoading: loadingFavorite }] =
    useAddWalletToFavoriteMutation();
  const [removeWalletFromFavorite, { isLoading: loadingUnFavorite }] =
    useRemoveWalletFromFavoriteMutation();

  const userToken = useAppSelector(getUserToken);

  const isFavorite = wallet.isFavorite;

  const { attributes, listeners, isDraggable } =
    useContext(SortableItemContext);

  const handleFavoriteWallet = async () => {
    if (!wallet.address || !wallet.networkId) return;
    if (userToken) {
      const walletDatas = {
        address: wallet.address,
        networkId: wallet.networkId,
      };

      if (isFavorite) {
        await removeWalletFromFavorite(walletDatas);
      } else {
        await addWalletToFavorite(walletDatas);
      }
    }
  };

  return (
    <>
      <div
        // ref={setNodeRef}
        // style={style}
        className={`w-full ${
          isFavorite ? "bg-[#212121]" : "bg-[#0d0c0c]"
        }  rounded-[15px] p-[25px] grid grid-cols-4 gap-2 cursor-pointer transition-all hover:bg-[#2a2a2a]`}
        onClick={(e) => {
          if (
            e.target.closest("button") ||
            e.target.closest("[data-no-click]") ||
            e.target.tagName === "svg" ||
            e.target.tagName === "path"
          ) {
            return;
          }

          if (wallet?.network && wallet?.address) {
            navigate(`/wallet/${wallet.network}/${wallet.address}`);
          }
        }}
      >
        {/* Drag Icon & Wallet Image & Wallet Balance */}
        <div className="flex items-center justify-start gap-[25px]">
          <DragIcon
            listeners={listeners}
            attributes={attributes}
            isDraggable={isDraggable}
          />
          <WalletItemIcon imgUlr={wallet.walletImage} />
          <WalletItemBalance name={wallet.name} balance={wallet.balance} />
        </div>

        {/* Wallet Address */}
        <WalletItemAddress address={wallet.address} />

        {/* Wallet Chain */}
        <WalletItemChain network={wallet.network} />

        {/* Delete BTN & Dropdown BTN */}
        <div className="relative flex items-center justify-end gap-[12px]">
          <WalletItemFavoriteAction
            isFavorite={isFavorite}
            isLoading={loadingFavorite || loadingUnFavorite ? true : false}
            onClick={handleFavoriteWallet}
          />

          <WalletItemQuickActions wallet={wallet} />
        </div>
      </div>
      <ChangeWalletNameModal currentWallet={wallet} />
    </>
  );
};
