import { BlurText } from "../ReactBits/BlurText";
import WalletSearchComponent from "../WalletSearchComponent";

export const EmptyState = ({ content }) => {
  return (
    <div className="w-full h-full mt-20 mb-[50px] space-y-[25px] text-white">
      <div className="flex justify-between">
        <div className="border-l-2 border-t border-gray-200">
          <img src="/images/morph-man.svg" alt="" />
        </div>
        <div className="self-center max-w-[800px] w-[673px]  p-[10px] flex flex-col justify-between">
          <BlurText
            text={`No ${content} Yet !`}
            className={
              "text-4xl font-semibold font-family-IranYekan-Bold tracking-widest"
            }
          />
          <p className="my-5 tracking-widest">
            Once You {content} a Wallet, you'll see theme here.
          </p>

          <WalletSearchComponent />
        </div>
        <div className="border-r-2 border-t border-gray-200">
          <img src="/images/wallet_black.png" alt="" />
        </div>
      </div>
    </div>
  );
};
