import React from "react";
import BaseModal from "./BaseModal";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import {
  setWalletNameModalOpen,
  // changeWalletName,
} from "../../features/wallets/walletsSlice";
import { useChangeWalletNameMutation } from "../../features/wallets/changeWalletNameSlice";

function ChangeWalletNameModal({ currentWallet }) {
  const dispatch = useAppDispatch();
  const [changeWalletName, {isLoading}] = useChangeWalletNameMutation()
  const isChangeWalletNameModalOpen = useAppSelector(
    (state) => state.wallets.isChangeWalletNameModalOpen
  );
  const [walletName, setWalletName] = useState("");

  // const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setWalletName("");
    // dispatch(setCurrentWallet(null))
    dispatch(setWalletNameModalOpen(false));
  };

  const handleInputChange = (e) => {
    setWalletName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!walletName.trim()) {
      return; // Don't submit if wallet name is empty
    }

    if (
      currentWallet === null ||
      !currentWallet?.address ||
      !currentWallet?.networkId
    ) {
      return;
    }
    console.log(currentWallet);

    // setIsLoading(true);

    try {
      const datas = {
        name: walletName.trim(),
        address: currentWallet?.address,
        networkId: currentWallet?.networkId,
      };

      await changeWalletName(datas);
      handleClose()
      // await dispatch(changeWalletName(datas)).then((res) => {
      //   setIsLoading(false);
      //   if (res.type === "wallets/changeWalletName/fulfilled") {
      //     handleClose();
      //   }
      // });
    } catch (error) {
      console.error("Error updating wallet name:", error);
      // Handle error (maybe show a toast notification)
    }
  };

  return (
    <BaseModal
      isOpen={isChangeWalletNameModalOpen}
      onClose={handleClose}
      title="Change Wallet Name"
      className="!max-w-2xl space-y-4"
    >
      <form onSubmit={handleSubmit} className="flex items-center gap-[15px]">
        <input
          type="text"
          placeholder="Enter Wallet Name..."
          value={walletName}
          onChange={handleInputChange}
          disabled={isLoading}
          className={`w-full h-full max-h-[52px] px-6 py-4 text-base font-family-IranYekan-Regular rounded-[15px] bg-[#3B3B3B] shadow-[0px_0px_17px_-4px_rgba(222,222,222,0.13)]
                    focus:outline-none focus:ring-1 focus:ring-custom-yellow focus:border-transparent transition-all duration-300
                    placeholder:bg-gradient-to-r placeholder:from-custom-yellow placeholder:to-custom-green placeholder:text-transparent placeholder:bg-clip-text text-white
                    ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                `}
        />

        <button
          disabled={isLoading || !walletName.trim()}
          className={`w-full h-full max-h-[52px] max-w-[151px] py-4 text-center text-black bg-gradient-to-r from-custom-green to-custom-yellow hover:from-[#3de080] hover:to-[#d4e86b] font-family-IranYekan-Bold rounded-[15px] cursor-pointer transition-all duration-200 hover:opacity-80
                flex items-center justify-center gap-1
                ${
                  isLoading || !walletName.trim()
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }
              `}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent"></div>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </BaseModal>
  );
}

export default ChangeWalletNameModal;
