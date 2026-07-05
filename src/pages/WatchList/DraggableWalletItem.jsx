import { DragIcon } from "../../components/WalletItemPart/DragIcon";
import { WalletItemIcon } from "../../components/WalletItemPart/WalletItemIcon";
import { WalletItemBalance } from "../../components/WalletItemPart/WalletItemBalance";
import { WalletItemAddress } from "../../components/WalletItemPart/WalletItemAddress";
import { WalletItemTrackingStartDate } from "../../components/WalletItemPart/WalletItemTrackingStartDate";
import { WalletItemChain } from "../../components/WalletItemPart/WalletItemChain";
import { WalletItemDeleteAction } from "../../components/WalletItemPart/WalletItemDeleteAction";
import { WalletItemQuickActions } from "../../components/WalletItemPart/WalletItemQuickActions";
import {
  useAddWalletToTempTrackMutation,
  useAddWalletToTrackMutation,
} from "../../features/wallets/trackWalletSlice";
import {
  useUnTrackTempWalletMutation,
  useUnTrackWalletMutation,
} from "../../features/wallets/unTrackWalletSlice";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getUserToken, setLoginModalOpen } from "../../features/auth/authSlice";
import { useNavigate, useOutletContext } from "react-router-dom";
import ChangeWalletNameModal from "../../components/Modals/ChangeWalletNameModal";
import { useContext } from "react";
import { SortableItemContext } from "../../components/SortableList/SortableItem/SortableItem";
import Cookies from "js-cookie";

export const DraggableWalletItem = ({ wallet }) => {
  const navigate = useNavigate();
  const hasAccess = useOutletContext();
  const dispatch = useAppDispatch();
  // login tracking
  const [addWalletToTrack, { isLoading: loadingTracking }] =
    useAddWalletToTrackMutation();

  const [unTrackWallet, { isLoading: loadingUnTracking }] =
    useUnTrackWalletMutation();

  // temp tracking
  const [addWalletToTempTrack, { isLoading: loadingTempTracking }] =
    useAddWalletToTempTrackMutation();

  const [unTrackTempWallet, { isLoading: loadingTempUnTracking }] =
    useUnTrackTempWalletMutation();

  const userToken = useAppSelector(getUserToken);
  const userId = Cookies.get("userId");
  const isTracked = wallet.tracked;

  const { attributes, listeners, isDraggable } =
    useContext(SortableItemContext);

  const handleTrackWallet = async () => {
    if (!wallet.address || !wallet.networkId) return;
    if (userToken) {
      const walletDatas = {
        address: wallet.address,
        networkId: wallet.networkId,
      };

      if (isTracked) {
        await unTrackWallet(walletDatas);
      } else {
        if (!hasAccess) {
          dispatch(setLoginModalOpen());
          return;
        }
        await addWalletToTrack(walletDatas);
      }
    } else if (userId) {
      const trackWalletDatas = {
        address: wallet.address,
        networkId: wallet.networkId,
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
    <>
      <div
        // ref={ref}
        // style={style}
        className={`w-full ${
          isTracked ? "bg-[#212121]" : "bg-[#0d0c0c]"
        } rounded-[15px] p-[25px] grid grid-cols-5 gap-2 cursor-pointer transition-all hover:bg-[#2a2a2a]`}
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

        {/* Tracking Start Date */}
        <WalletItemTrackingStartDate dateOfTrack={wallet.dateOfTrack} />

        {/* Delete BTN & Dropdown BTN */}
        <div className="relative flex items-center justify-end gap-[12px]">
          <WalletItemDeleteAction
            text={wallet?.tracked ? "Delete" : "Track"}
            dataNoClick={true}
            hoverColor={wallet?.tracked ? "#CD5D67" : "#49F992"}
            afterColor={wallet?.tracked ? "white" : "black"}
            isLoading={
              loadingTracking ||
              loadingUnTracking ||
              loadingTempTracking ||
              loadingTempUnTracking
                ? true
                : false
            }
            onClick={handleTrackWallet}
          />

          <WalletItemQuickActions wallet={wallet} />
        </div>
      </div>
      <ChangeWalletNameModal currentWallet={wallet} />
    </>
  );
};
