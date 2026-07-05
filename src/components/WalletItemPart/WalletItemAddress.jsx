import { Copy } from "lucide-react";

export const WalletItemAddress = ({ address }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-white text-base font-family-IranYekan-Bold leading-0">
        {address
          ? `${address.slice(0, 4)}...${address.slice(-4)}`
          : "Witout Address"}
      </span>

      {address ? (
        <Copy
          size={14}
          className="text-[#00AAFA] transition-all cursor-pointer hover:text-white"
          onClick={() => navigator.clipboard.writeText(address)}
          data-no-click
        />
      ) : null}
    </div>
  );
};
