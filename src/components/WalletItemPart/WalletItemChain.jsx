export const WalletItemChain = ({ network }) => {
  return (
    <div className="flex items-center text-balance font-family-IranYekan-Bold text-[#B2B2B2]">
      {network
        ? `Chain : ${network.charAt(0).toUpperCase() + network.slice(1)}`
        : "Without Chain"}
    </div>
  );
};
