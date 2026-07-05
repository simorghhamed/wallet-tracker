import { useEffect, useState } from "react";
import { DraggableFavoriteItem } from "./DraggableFavoriteItem";
import { SortableList } from "../../components/SortableList";
import { SavePritotyWalletList } from "../../components/SavePritotyWalletList";

export const FavoriteContent = ({ favoritedWallet }) => {
  const favoritedWalletValues = Object.values(favoritedWallet);
  if (!favoritedWalletValues.length) return;

  const [wallets, setWallets] = useState([]);

  const walletsFlatten = favoritedWalletValues.reduce((accu, item) => {
    accu.push(...Object.values(item));
    return accu;
  }, []);

  useEffect(() => {
    if (walletsFlatten) {
      // sorted by priroty option
      setWallets(walletsFlatten.toSorted((a, b) => a.priority - b.priority));
    }
  }, [favoritedWallet]);

  return (
    <div className="w-full h-full mt-20 mb-[50px] space-y-[25px]">
      {/* Page Title */}

      <div className="w-full h-full flex items-center justify-between gap-3">
        <div className="flex items-center justify-start gap-3">
          <h2 className="text-white font-family-IranYekan-Bold text-[22px] leading-0 mt-1">
            Favorits
          </h2>

          <div className="w-[32px] h-[32px] p-3 rounded-[5px] bg-[#3B3B3B] backdrop-blur-[28px] flex items-center justify-center">
            <span className="text-center text-white text-lg font-family-IranYekan-Medium leading-0 mt-1">
              {wallets.length}
            </span>
          </div>
        </div>

        <SavePritotyWalletList wallets={wallets} />
      </div>
      {/* Wallets */}
      <div className="w-full h-full space-y-[25px]">
        <SortableList
          items={wallets}
          onChange={setWallets}
          renderItem={(wallet) => (
            <SortableList.Item id={wallet.id} isDraggable={wallet.isFavorite} isDisabled={wallets.length <= 1}>
              <DraggableFavoriteItem
                key={`${wallet.address + wallet.networkId}`}
                wallet={wallet}
              />
            </SortableList.Item>
          )}
        />
      </div>
    </div>
  );
};
