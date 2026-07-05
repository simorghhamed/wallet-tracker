import { SearchHistoryItem } from "./SearchHistoryItem";
import {
  useDeleteItemSearchHistoryMutation,
  useGetSearchHistoryQuery,
} from "../../features/wallets/searchHistorySlice";
import { setCleareSearchHistory } from "../../features/wallets/walletsSlice";
import { useAppDispatch } from "../../app/hook";
import { EmptyState } from "../../components/EmptyState";

export function SearchHistory() {
  const dispatch = useAppDispatch();
  const { data: searchHistory, isFetching } = useGetSearchHistoryQuery();
  const [deleteItemSearchHistory] = useDeleteItemSearchHistoryMutation();
  const searchHistoryLength = searchHistory?.length;

  const handleClearHistory = () => {
    deleteItemSearchHistory({
      type: "all",
    });
  };

  if (!searchHistory) return;
  
  if (!searchHistoryLength) {
    return <EmptyState content="History" />;
  }

  return (
    <div className="w-full max-w-[1470px] mx-auto h-full">
      <div className="w-full h-full mt-20 mb-[50px] space-y-[25px]">
        {/* Page Title */}
        <div className="w-full h-full flex items-center justify-between gap-3">
          <div className="w-full h-full flex items-center justify-start gap-3">
            <h2 className="text-white font-family-IranYekan-Bold text-[22px] leading-0 mt-1">
              Search history
            </h2>

            <div className="w-[32px] h-[32px] p-3 rounded-[5px] bg-[#3B3B3B] backdrop-blur-[28px] flex items-center justify-center">
              <span className="text-center text-white text-lg font-family-IranYekan-Medium leading-0 mt-1">
                {searchHistoryLength}
              </span>
            </div>
          </div>
          {searchHistoryLength > 0 && (
            <button
              className={`w-full h-full max-w-[151px] py-4 text-center text-black bg-gradient-to-r from-custom-green to-custom-yellow hover:from-[#3de080] hover:to-[#d4e86b] font-family-IranYekan-Bold rounded-[15px] cursor-pointer transition-all duration-200 hover:opacity-80
            flex items-center justify-center gap-1`}
              onClick={handleClearHistory}
            >
              Clear All
            </button>
          )}
        </div>

        {/* Wallets */}
        <div
          className={`w-full h-full ${
            searchHistoryLength > 0 && "bg-[#212121]"
          } rounded-[15px] space-y-[25px]`}
        >
          {searchHistory.map((item, index) => (
            <SearchHistoryItem
              key={item.id}
              item={item}
              removeHistory={deleteItemSearchHistory}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
