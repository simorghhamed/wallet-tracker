import { ChevronDown, Share2, SquarePen, Copy } from "lucide-react";
import CustomDropdown from "../../../components/CustomDropdown";
import { useState } from "react";
import { setWalletNameModalOpen } from "../../../features/wallets/walletsSlice";
import { useAppDispatch } from "../../../app/hook";
import toast from "react-hot-toast";

export const DropdownQuickActions = ({ currentWallet }) => {
  const dispatch = useAppDispatch();
  const [actionsDropDownOpen, setActionsDropDownOpen] = useState(false);
  const isTracked = currentWallet?.tracked;
  const options = [
    {
      id: 2,
      title: "Copy Wallet Address",
      svg: <Copy size={20} className="text-white" />,
      action: () => {
        navigator.clipboard.writeText(currentWallet?.address).then(() => {
          toast.success("Wallet Address Copied!", {
            style: {
              background: "#4B4B4B",
              color: "#FFFFFF",
            },
          });
        });
      },
    },
    {
      id: 3,
      title: "Copy Profile Link",
      svg: <Share2 size={20} className="text-white" />,
      action: () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
          toast.success("Profile Link Copied!", {
            style: {
              background: "#4B4B4B",
              color: "#FFFFFF",
            },
          });
        });
      },
    },
  ];
  // chack if isTracked show wallet change name option
  if (isTracked)
    options.push({
      id: 1,
      title: "Change Wallet Name",
      svg: <SquarePen size={20} className="text-white" />,
      action: () => dispatch(setWalletNameModalOpen(true)),
    });
  return (
    <div className="relative">
      <button
        className="p-2 max-w-[45px] max-h-[45px] rounded-full flex items-center justify-center bg-[#3B3B3B] transition-all duration-200 cursor-pointer hover:bg-[#4B4B4B]"
        onClick={() => {
          if (currentWallet?.id || currentWallet?.address) {
            setActionsDropDownOpen(true);
          }
        }}
      >
        <ChevronDown className="text-white m-auto" size={30} />
      </button>

      <CustomDropdown
        isOpen={actionsDropDownOpen}
        onClose={() => setActionsDropDownOpen(null)}
        options={options}
      />
    </div>
  );
};
