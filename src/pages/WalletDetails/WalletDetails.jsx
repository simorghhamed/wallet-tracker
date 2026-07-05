import { createSelector } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import ChangeWalletNameModal from "../../components/Modals/ChangeWalletNameModal";
import { useAppSelector } from "../../app/hook";
import { getCurrentWallet } from "../../features/wallets/walletsSlice";
import { getUserToken } from "../../features/auth/authSlice";
import { WalletInfo } from "./WalletInfo/WalletInfo";

import { WalletAssets } from "./WalletAssets/WalletAssets";
import { WalletTransactions } from "./WalletTransactions/WalletTransactions";
import { ValidationWalletDetailsRoute } from "./ValidationWalletDetailsRoute";

export const WalletDetails = () => {
  const selector = createSelector(
    [getCurrentWallet, getUserToken],
    (currentWallet, userToken) => {
      return {
        currentWallet,
        userToken,
      };
    }
  );
  const { currentWallet, userToken } = useAppSelector(selector);
  const { network, address } = useParams();

  return (
    <ValidationWalletDetailsRoute
      currentWallet={currentWallet}
      address={address}
      network={network}
    >
      <>
        <div className="w-full h-full mt-20 mb-[50px] space-y-12">
          {/* Section 1 - Wallet Info */}
          <WalletInfo currentWallet={currentWallet} userToken={userToken} />

          {/* Section 2 - Assests Table */}
          <WalletAssets currentWallet={currentWallet} />
          {/* Section 3 - Transactions History */}
          <WalletTransactions />
        </div>

        {/* Modals */}
        <ChangeWalletNameModal currentWallet={currentWallet} />
      </>
    </ValidationWalletDetailsRoute>
  );
};
