import { EllipsisVertical, SquarePen } from "lucide-react";
import CustomDropdown from "../CustomDropdown";
import { useState } from "react";
import { setWalletNameModalOpen } from "../../features/wallets/walletsSlice";
import { useAppDispatch } from "../../app/hook";

export const WalletItemQuickActions = ({ wallet }) => {
  const dispatch = useAppDispatch();
  const [actionsDropDownOpen, setActionsDropDownOpen] = useState(false);
  const {
    address,
    networkId,
    tracked: isTracked = false,
    isFavorite = false,
  } = wallet;
  const options = [];
  // chack if isTracked show wallet change name option
  if (isTracked || isFavorite)
    options.push({
      id: 1,
      title: "Change Wallet Name",
      svg: <SquarePen size={20} className="text-white" />,
      action: () => dispatch(setWalletNameModalOpen(true)),
    });
  return (
    <>
      <button
        className={`rounded-[10px] flex items-center justify-center p-1 transition-all duration-300 cursor-pointer `}
        onClick={() => {
          if (address && networkId) {
            setActionsDropDownOpen(true);
          } else {
            // setActionsDropDownOpen(true);
          }
        }}
        data-no-click
      >
        <EllipsisVertical
          size={25}
          className="text-white transition-all hover:text-white"
        />
      </button>

      <CustomDropdown
        isOpen={actionsDropDownOpen}
        onClose={() => setActionsDropDownOpen(null)}
        options={options}
      />
    </>
  );
};
