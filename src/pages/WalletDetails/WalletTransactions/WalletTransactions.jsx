import { ChevronDown, ChevronUp, Copy, ExternalLink } from "lucide-react";
import { transactions } from "../../../assets/data/transactions";
import {TransactionArrowDownSvg} from "../../../assets/svg/TransactionArrowDownSvg"
import {TransactionArrowUpSvg} from "../../../assets/svg/TransactionArrowUpSvg"
import {TransactionSwapSvg} from "../../../assets/svg/TransactionSwapSvg"
import { useState } from "react";
export const WalletTransactions = () => {
  const [expandedRows, setExpandedRows] = useState([]);
  const toggleRow = (index) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };
  return (
    <div className="space-y-[25px]">
      {/* Title */}
      <div className="w-full text-white text-xl font-family-IranYekan-Bold">
        Transactions History
      </div>

      {/* Table */}
      <div className="bg-[#212121] rounded-2xl overflow-hidden p-5 space-y-5">
        {/* Table Header */}
        <div className="grid grid-cols-3 px-2.5 py-3 bg-[#161616] rounded-xl">
          <div className="text-white text-lg font-family-IranYekan-Bold">
            Transaction type
          </div>
          <div className="text-white text-lg font-family-IranYekan-Bold">
            Token
          </div>
          <div className="text-white text-lg font-family-IranYekan-Bold">
            Wallet Address
          </div>
        </div>

        {/* Table Body */}
        <div className="space-y-5">
          {transactions.map((transaction, index) => (
            <div
              key={transaction.transactionHash || index}
              className={`rounded-xl overflow-hidden ${
                expandedRows.includes(index) ? "border border-[#636363]" : ""
              }`}
            >
              {/* Main Row */}
              <div
                className="grid grid-cols-3 px-2.5 py-4 cursor-pointer hover:bg-[#333333] transition-colors"
                onClick={() => toggleRow(index)}
              >
                {/* Transaction Type */}
                <div className="flex items-center gap-2.5">
                  {/* Icon */}
                  <div className={``}>
                    {transaction.type === "Transfer" &&
                      (transaction.typeAction === "Receive"
                        ? TransactionArrowDownSvg
                        : transaction.typeAction === "Send"
                        ? TransactionArrowUpSvg
                        : null)}
                    {transaction.type === "Swap" && TransactionSwapSvg}
                  </div>

                  {/* Type & Date */}
                  <div className="space-y-2">
                    <div className="text-white text-sm font-family-IranYekan-Bold">
                      {transaction?.type ? transaction.type : ""}{" "}
                      {transaction?.typeAction
                        ? `(${transaction.typeAction})`
                        : ""}
                    </div>
                    <div className="text-[#A3A3A3] text-[13px] font-family-IranYekan-Medium">
                      {transaction.date}
                    </div>
                  </div>
                </div>

                {/* Token */}
                <div className="flex items-center gap-2.5">
                  {/* <img src={transaction?.token?.iconUrl ? transaction.token.iconUrl : ''} className="w-10 h-10 " /> */}
                  {transaction?.token?.iconUrl ? (
                    <img
                      src={transaction.token.iconUrl}
                      className="w-10 h-10"
                      alt="token-icon"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs">
                      N/A
                    </div>
                  )}
                  <span className="text-white text-sm font-family-IranYekan-Medium">
                    {transaction?.token?.amount
                      ? transaction.token.amount
                      : "0"}
                  </span>
                </div>

                {/* Wallet Address */}
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    {/* From & To || Application */}
                    <div className="text-white text-sm font-family-IranYekan-Bold">
                      {transaction?.walletType ? transaction.walletType : ""}
                    </div>

                    {/* Wallet Address || Application Name */}
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-family-IranYekan-Bold">
                        {transaction?.type === "Transfer" &&
                          transaction?.walletAddress &&
                          `${transaction.walletAddress.slice(
                            0,
                            4
                          )}...${transaction.walletAddress.slice(-4)}`}

                        {transaction?.type === "Swap" &&
                          transaction.walletAddress}
                      </span>

                      {transaction?.type === "Transfer" &&
                        transaction?.walletAddress && (
                          <>
                            <Copy
                              size={14}
                              className="text-[#00AAFA] transition-all cursor-pointer hover:text-white"
                              onClick={() =>
                                navigator.clipboard.writeText(
                                  transaction.walletAddress
                                )
                              }
                            />
                            <ExternalLink
                              size={14}
                              className="text-[#00AAFA] transition-all cursor-pointer hover:text-white"
                              onClick={() =>
                                window.open(
                                  `https://etherscan.io/address/${transaction.walletAddress}`,
                                  "_blank"
                                )
                              }
                            />
                          </>
                        )}
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="text-gray-400">
                    {expandedRows.includes(index) ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedRows.includes(index) && (
                <div className="p-[15px] border-t border-[#636363]">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-family-IranYekan-Bold text-sm text-white">
                        Network Fee :{" "}
                      </span>
                      <span className="font-family-IranYekan-Bold text-sm text-[#A3A3A3]">
                        {transaction.networkFee}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-family-IranYekan-Bold text-sm text-white">
                        Transaction Hash :{" "}
                      </span>
                      <span className="font-family-IranYekan-Bold text-sm text-[#A3A3A3]">
                        {transaction.transactionHash}
                      </span>
                      <Copy
                        size={14}
                        className="text-[#00AAFA] transition-all cursor-pointer hover:text-white"
                        onClick={() =>
                          navigator.clipboard.writeText(
                            transaction.transactionHash
                          )
                        }
                      />
                      <ExternalLink
                        size={14}
                        className="text-[#00AAFA] transition-all cursor-pointer hover:text-white"
                        onClick={() =>
                          window.open(
                            `https://etherscan.io/tx/${transaction.transactionHash}`,
                            "_blank"
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
