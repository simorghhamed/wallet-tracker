export const WalletItemIcon = ({ imgUlr }) => {
  return (
    <img
      src={imgUlr ? imgUlr : "/images/wallet-image.png"}
      className="w-[50px] h-[50px] rounded-[10px]"
    />
  );
};
