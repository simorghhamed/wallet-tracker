import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";
import WalletSearchComponent from "../WalletSearchComponent";

export const WalletSearchComponentModal = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  useEffect(() => {
    if (isOpen) setIsOpen(false);
  }, [location]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <DialogPanel className="max-w-[800px] w-[673px]  rounded-[15px] p-[10px] flex flex-col justify-between  bg-[#2C2C2C]">
          <div className="flex justify-between mt-[10px] mb-[20px]">
            <X color="#fff" onClick={() => setIsOpen(false)} />
            <p className="text-white font-family-IranYekan-Medium text-lg">
              Search Wallet
            </p>
            <div></div>
          </div>
          <WalletSearchComponent />
        </DialogPanel>
      </div>
    </Dialog>
  );
};
