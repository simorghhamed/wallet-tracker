export const WalletItemBalance = ({ name, balance }) => {
  return (
    <div
      className={`h-full flex flex-col ${
        name ? "justify-end" : "justify-center"
      }`}
    >
      {name ? (
        <span className="text-white font-family-IranYekan-Bold">{name}</span>
      ) : null}

      <span className="text-white font-family-IranYekan-Bold">
        $ {balance ? balance.toLocaleString() : 0}
      </span>
    </div>
  );
};
