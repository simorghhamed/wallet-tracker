import { useEffect, useState } from "react";
import { DraggableFavoriteItem } from "./DraggableFavoriteItem";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

export const FavoriteContent = ({ favoritedWallet }) => {
  const favoritedWalletValues = Object.values(favoritedWallet);
  if (!favoritedWalletValues.length) return;

  const walletsFlatten = favoritedWalletValues.reduce((accu, item) => {
    accu.push(...Object.values(item));
    return accu;
  }, []);

  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    if (walletsFlatten) {
      setWallets(walletsFlatten);
    }
  }, [favoritedWallet]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = wallets.findIndex((item) => item.id === active.id);
    const newIndex = wallets.findIndex((item) => item.id === over.id);
    const newWallets = arrayMove(wallets, oldIndex, newIndex);
    setWallets(newWallets);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
      <SortableContext
        items={wallets.filter((w) => w.isFavorite).map((w) => w.id)}
        strategy={verticalListSortingStrategy}
        disabled={wallets.length <= 1 && true}
      >
        <div className="w-full h-full mt-20 mb-[50px] space-y-[25px]">
          {/* Page Title */}
          <div className="w-full h-full flex items-center justify-start gap-3">
            <h2 className="text-white font-family-IranYekan-Bold text-[22px] leading-0 mt-1">
              Favorits
            </h2>

            <div className="w-[32px] h-[32px] p-3 rounded-[5px] bg-[#3B3B3B] backdrop-blur-[28px] flex items-center justify-center">
              <span className="text-center text-white text-lg font-family-IranYekan-Medium leading-0 mt-1">
                {wallets?.length}
              </span>
            </div>
          </div>

          {/* Wallets */}
          <div className="w-full h-full space-y-[25px]">
            {wallets.map((wallet) => (
              <DraggableFavoriteItem
                key={`${wallet.address + wallet.network}`}
                wallet={wallet}
              />
            ))}
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
};
