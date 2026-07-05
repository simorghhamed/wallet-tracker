// ............................................ Memoized Version ............................................

import React, { useCallback, useMemo, useState } from "react";
import SearchBoxNetworkSelect from "./SearchBoxNetworkSelect";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { createSelector } from "@reduxjs/toolkit";
import {
  getSearchWallets,
  setCurrentWallet,
  setSearchWallets,
} from "../features/wallets/walletsSlice";
import { useGetNetwoksQuery } from "../features/network/networksSlice";
import { useAddSearchWalletMutation } from "../features/wallets/searchWalletSlice";

const WalletSearchComponent = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const selector = createSelector([getSearchWallets], (searchWallets) => {
    return {
      searchWallets,
    };
  });

  const { searchWallets } = useAppSelector(selector);

  const [walletAddress, setWalletAddress] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [addSearchWallet] = useAddSearchWalletMutation();
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  // const {data, isError, isFetching, error} = useGetNetwoksQuery()
  const searchResults = useMemo(() => searchWallets || [], [searchWallets]);
  const { data: networkData } = useGetNetwoksQuery();

  const networks = useMemo(
    () => (networkData?.length ? networkData : []),
    [networkData]
  );
  // Regex pattern for Ethereum wallet address validation
  const WALLET_REGEX = /^0x[a-fA-F0-9]{40}$/;

  const validateWalletAddress = (address) => {
    return WALLET_REGEX.test(address);
  };

  const handleInputChange = useCallback(
    (e) => {
      const value = e.target.value;
      setWalletAddress(value);

      if (value !== "") {
        setIsValid(validateWalletAddress(value));
      } else {
        setHasSearched(false);
        dispatch(setSearchWallets([]));
      }
    },
    [dispatch, validateWalletAddress]
  );

  const handleSearch = useCallback(async () => {
    // Early validation
    if (
      !walletAddress ||
      !validateWalletAddress(walletAddress) ||
      !selectedNetwork
    ) {
      setIsValid(false);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    const searchData = {
      address: walletAddress,
      // networkId: selectedNetwork
      networkName: selectedNetwork,
    };

    try {
      console.log(searchData);
      // mutation rtk hook
      await addSearchWallet(searchData);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, [walletAddress, selectedNetwork, validateWalletAddress, dispatch]);

  const handleResultClick = useCallback((result) => {
    console.log("Clicked wallet:", result);
    // Add your click handler logic here
    if (result?.address && result?.networkId) {
      // const trackWalletDatas = {
      //   address: result.address,
      //   networkId: result.networkId,
      // }

      // dispatch(trackWallet(trackWalletDatas))

      dispatch(setCurrentWallet(result));

      navigate(`/wallet/${result.network}/${result.address}`);
    }
  }, []);

  return (
    <>
      <div className="flex items-center justify-center gap-5">
        <div className="w-full relative">
          <input
            type="text"
            placeholder="Wallet Address"
            value={walletAddress}
            onChange={handleInputChange}
            className={`w-full h-full px-6 py-4 text-base font-family-IranYekan-Regular rounded-[15px] bg-[#3B3B3B] shadow-[0px_0px_17px_-4px_rgba(222,222,222,0.13)]
              focus:outline-none focus:ring-1 focus:ring-custom-yellow focus:border-transparent transition-all duration-300
              placeholder:bg-gradient-to-r placeholder:from-custom-yellow placeholder:to-custom-green placeholder:text-transparent placeholder:bg-clip-text text-white
              `}
          />
          {/* {walletAddress && (
            <div className="absolute right-20 top-1/2 transform -translate-y-1/2">
              {isValid ? (
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          )} */}
          <SearchBoxNetworkSelect
            options={networks}
            value={selectedNetwork}
            onChange={setSelectedNetwork}
          />
        </div>
        <button
          onClick={handleSearch}
          // disabled={isLoading || !walletAddress}
          disabled={isLoading}
          className={`w-full h-full max-w-[151px] py-4 text-center text-black bg-gradient-to-r from-custom-green to-custom-yellow hover:from-[#3de080] hover:to-[#d4e86b] font-family-IranYekan-Bold rounded-[15px] cursor-pointer transition-all duration-200 hover:opacity-80
            flex items-center justify-center gap-1
            ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent"></div>
          ) : (
            <>
              <svg
                className="w-4 h-4 mb-[2px]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.061 1.061l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clipRule="evenodd"
                />
              </svg>
              Search
            </>
          )}
        </button>
      </div>

      {/* Search Results */}
      {hasSearched && (
        <div className="mt-5">
          {isLoading ? (
            <div className="bg-[#3B3B3B] rounded-[15px] p-6 shadow-[0px_0px_17px_-4px_rgba(222,222,222,0.13)]">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-custom-yellow border-t-transparent"></div>
                <span className="ml-3 text-white font-family-IranYekan-Medium">
                  Searching ....
                </span>
              </div>
            </div>
          ) : searchResults?.length > 0 ? (
            <div className="space-y-3">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="bg-[#3B3B3B] rounded-[15px] p-4 shadow-[0px_0px_17px_-4px_rgba(222,222,222,0.13)] 
                    hover:bg-[#4B4B4B] cursor-pointer transition-all duration-200 hover:shadow-[0px_0px_20px_-2px_rgba(222,222,222,0.2)]
                    border border-transparent hover:bordenr-yellow-400/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-6 h-6 text-custom-yellow"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474L15.79 17H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <div className="text-white font-family-IranYekan-Medium text-left">
                          {/* {result.address.slice(0, 4)}...{result.address.slice(-4)} */}
                          {result?.address
                            ? result?.address
                            : "Without Address"}
                        </div>
                        {/* <div className="text-gray-400 text-sm"> */}
                        <div className="text-gray-400 font-family-IranYekan-Medium text-left text-sm">
                          {/* {result.network} • Transaction {result.transactions} */}
                          {result?.network
                            ? result.network[0].toUpperCase() +
                              result.network.slice(1)
                            : "Without Network"}{" "}
                          •{" "}
                          {result?.transactions?.length
                            ? `Transaction : ${result.transactions[0]}`
                            : "Without Transaction"}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-custom-yellow font-family-IranYekan-Medium text-right">
                        {result?.balance ? result.balance : 0} $
                      </div>
                      <div className="text-gray-400 font-family-IranYekan-Medium text-right text-sm">
                        {/* {result.lastActive} */}
                        Yesterday
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#3B3B3B] rounded-[15px] p-6 shadow-[0px_0px_17px_-4px_rgba(222,222,222,0.13)] text-center">
              <p className="text-custom-yellow font-family-IranYekan-Medium text-lg">
                No Wallet Found.!
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default WalletSearchComponent;
