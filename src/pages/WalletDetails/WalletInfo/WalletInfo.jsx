import { useState } from "react";
import { DropdownQuickActions } from "./DropdownQuickActions";
import { WalletFavoriteAction } from "./WalletFavoriteAction";
import { WalletTrackAction } from "./WalletTrackAction";

export const WalletInfo = ({ currentWallet, userToken }) => {
  return (
    <div className="w-full flex items-center justify-between">
      {/* Wallet Image & Address & Chain & Wallet Balance */}
      <div className="w-full flex items-center justify-start gap-[25px]">
        <img
          src="/images/wallet-image.png"
          className="rounded-[10px] w-[100px] h-[100px]"
        />

        <div className="flex flex-col justify-center gap-4">
          {/* Wallet Addres & Chain */}
          <div className="flex items-center gap-2.5">
            <span className="text-white text-left text-lg font-family-IranYekan-DemiBold">
              {currentWallet?.address
                ? `${currentWallet.address.slice(
                    0,
                    4
                  )}...${currentWallet.address.slice(-4)}`
                : "No Wallet Address Availale"}
            </span>

            <div className="p-[5px] rounded-[5px] bg-[#3B3B3B] backdrop-blur-[28px] flex items-center justify-center">
              <span className="text-center text-white text-sm font-family-IranYekan-Medium mt-px">
                Chain :{" "}
                {currentWallet?.network
                  ? currentWallet.network.charAt(0).toUpperCase() +
                    currentWallet.network.slice(1)
                  : "No Chaim Address Availale"}
              </span>
            </div>
          </div>

          {/* Wallet Balance */}
          {/* <span className="text-white text-left text-xl font-family-IranYekan-DemiBold">$ 15,250</span> */}
          <span className="text-white text-left text-xl font-family-IranYekan-DemiBold">
            ${" "}
            {currentWallet?.balance
              ? currentWallet.balance.toLocaleString()
              : 0}
          </span>
        </div>
      </div>

      {/* Dropdown & Add To Favs & Track BTN */}
      <div className="w-full flex items-center justify-end gap-5">
        {/* Dropdown quick actions */}
        <DropdownQuickActions currentWallet={currentWallet} />

        {/* Favorite action */}
        <WalletFavoriteAction
          currentWallet={currentWallet}
          userToken={userToken}
        />

        {/* Track Action */}
        <WalletTrackAction currentWallet={currentWallet} />
      </div>
    </div>
  );
};
