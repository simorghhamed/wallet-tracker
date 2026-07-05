import { assets } from "../../../assets/data/walletAssets";
export const WalletAssets = ({currentWallet}) => {
  return (
    <div className="space-y-[25px]">
      {/* Title */}
      <div className="w-full flex items-center gap-[25px]">
        <span className="text-white text-xl font-family-IranYekan-Bold flex items-center justify-center">
          Assets
        </span>

        <div className="p-2.5 rounded-lg bg-[#3B3B3B] backdrop-blur-[28px] flex items-center justify-center">
          <span className="text-center text-white text-sm font-family-IranYekan-Medium">
            Number of tokens :{" "}
            <span className="text-custom-green">
              {currentWallet?.assets?.length}
            </span>
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#212121] rounded-2xl overflow-hidden p-5 space-y-5">
        {/* Table Header */}
        <div className="grid grid-cols-5 px-2.5 py-3 bg-[#161616] rounded-xl">
          <div className="text-white text-xl font-family-IranYekan-Bold">#</div>
          <div className="text-white text-lg font-family-IranYekan-Bold">
            Token
          </div>
          <div className="text-white text-lg font-family-IranYekan-Bold">
            Price
          </div>
          <div className="text-white text-lg font-family-IranYekan-Bold">
            Balance
          </div>
          <div className="text-white text-lg font-family-IranYekan-Bold">
            Value
          </div>
        </div>

        {/* Table Body */}
        <div className="space-y-5">
          {assets.map((asset, i) => (
            <div
              key={asset.id}
              className="grid grid-cols-5 rounded-xl px-2.5 py-3 hover:bg-[#333333] transition-colors"
            >
              {/* Index */}
              <div className="text-white text-lg font-family-IranYekan-Bold flex items-center">
                {i + 1}
              </div>

              {/* Token */}
              <div className="flex items-center gap-3">
                <img src={asset.iconUrl} className="w-11 h-11" />
                <span className="text-white font-family-IranYekan-Bold">
                  {asset.name}
                </span>
              </div>

              {/* Price */}
              <div className="text-white font-family-IranYekan-Bold flex items-center">
                {asset.price}
              </div>

              {/* Balance */}
              <div className="text-white font-family-IranYekan-Bold flex items-center">
                {asset.balance}
              </div>

              {/* Value */}
              <div className="text-white font-family-IranYekan-Bold flex items-center">
                {asset.value}
              </div>
            </div>
          ))}
        </div>

        {/* More Button */}
        <div className="flex justify-center">
          <div className="p-px bg-gradient-to-r from-[#EDFF7D] to-[#49F992] flex items-center justify-center rounded-lg cursor-pointer child:cursor-pointer">
            <button className="relative overflow-hidden px-6 py-3 rounded-lg text-white text-sm font-family-IranYekan-Bold transition-all duration-300 bg-[#161616] hover:text-black focus:outline-none">
              <span className="relative z-10 pointer-events-none">More</span>
              <span className="absolute z-0 inset-0 bg-gradient-to-r from-[#EDFF7D] to-[#49F992] opacity-0 hover:opacity-100 transition-all duration-300"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
