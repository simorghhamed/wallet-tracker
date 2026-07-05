import { GripVertical, Copy, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hook";
import { useDeleteItemSearchHistoryMutation } from "../../features/wallets/searchHistorySlice";

export const SearchHistoryItem = ({ item, removeHistory }) => {
  const navigate = useNavigate();
  const handleRemoveItem = (e) => {
    removeHistory({
      id: item.id,
      type: "one",
    });
  };
  return (
    <div
      className="w-full bg-[#212121] rounded-[15px] p-[25px] flex justify-between gap-2 cursor-pointer transition-all hover:bg-[#2a2a2a]"
      onClick={(e) => {
        if (
          e.target.closest("button") ||
          e.target.closest("[data-no-click]") ||
          e.target.tagName === "svg" ||
          e.target.tagName === "path"
        ) {
          return;
        }

        if (item?.network && item?.address) {
          navigate(`/wallet/${item.network}/${item.address}`);
        }
      }}
    >
      {/* item Address */}
      <div className="flex items-center  gap-2">
        <span className="text-white text-sm font-family-IranYekan-Bold leading-0">
          {item?.address ? `${item.address}` : "Witout Address"}
        </span>

        {item?.address ? (
          <Copy
            size={14}
            className="text-[#00AAFA] transition-all cursor-pointer hover:text-white"
            onClick={() => navigator.clipboard.writeText(item.address)}
            data-no-click
          />
        ) : null}
      </div>

      {/* item Chain */}
      <div className="flex items-center basis-[14%] font-family-IranYekan-Bold text-[#B2B2B2]">
        {item?.network
          ? `Chain : ${
              item.network.charAt(0).toUpperCase() + item.network.slice(1)
            }`
          : "Without Chain"}
      </div>

      {/* Tracking Start Date */}
      <div className="flex items-center basis-[14%] font-family-IranYekan-Bold text-[#B2B2B2]">
        {item?.updatedAt
          ? `Searched By ${new Date(item.updatedAt).toLocaleDateString(
              "en-CA"
            )}`
          : "No Tracking Date Available!"}
      </div>

      {/* Delete BTN & Dropdown BTN */}
      <div className="relative flex items-center justify-end gap-[12px]">
        <button
          className={`rounded-[10px] flex items-center justify-center p-1 transition-all duration-300 cursor-pointer bg-black text-white `}
          data-no-click
          onClick={handleRemoveItem}
        >
          <X />
        </button>
      </div>
    </div>
  );
};
