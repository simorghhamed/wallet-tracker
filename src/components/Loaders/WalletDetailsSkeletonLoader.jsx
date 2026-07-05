import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";


export function WalletDetailsSkeletonLoader() {
  return (
    <SkeletonTheme
      baseColor="#2a2a2a"
      highlightColor="#3a3a3a"
      borderRadius="8px"
    >
      <div className="w-full h-full mt-20 mb-[50px] space-y-12">
        {/* Section 1 - Wallet Info Skeleton */}
        <div className="w-full flex items-center justify-between">
          {/* Wallet Image & Info */}
          <div className="w-full flex items-center justify-start gap-[25px]">
            {/* Wallet Image */}
            <Skeleton height={100} width={100} className="!rounded-[10px]" />

            <div className="flex flex-col justify-center gap-4">
              {/* Wallet Address & Chain */}
              <div className="flex items-center gap-2.5">
                <Skeleton height={28} width={180} />
                {/* <div className="p-[5px] rounded-[5px] bg-[#3B3B3B]"> */}
                  <Skeleton height={28} width={140} />
                {/* </div> */}
              </div>

              {/* Wallet Balance */}
              <Skeleton height={28} width={120} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex items-center justify-end gap-5">
            <Skeleton height={45} width={45} className="!rounded-full" />
            <Skeleton height={45} width={45} className="!rounded-full" />
            <Skeleton height={56} width={140} className="!rounded-[15px]" />
          </div>
        </div>

        {/* Section 2 - Assets Table Skeleton */}
        <div className="space-y-[25px]">
          {/* Title */}
          <div className="w-full flex items-center gap-[25px]">
            <Skeleton height={28} width={80} />
            {/* <div className="p-2.5 rounded-lg bg-[#3B3B3B]"> */}
              <Skeleton height={28} width={180} />
            {/* </div> */}
          </div>

          {/* Table */}
          <div className="bg-[#212121] rounded-2xl overflow-hidden p-5 space-y-5">
            {/* Table Header */}
            <div className="grid grid-cols-5 px-2.5 py-3 bg-[#161616] rounded-xl gap-4">
              <Skeleton height={24} width={28} />
              <Skeleton height={24} width={80} />
              <Skeleton height={24} width={80} />
              <Skeleton height={24} width={80} />
              <Skeleton height={24} width={80} />
            </div>

            {/* Table Rows */}
            <div className="space-y-5">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="grid grid-cols-5 rounded-xl px-2.5 py-3 gap-4"
                >
                  {/* Index */}
                  <div className="flex items-center">
                    <Skeleton height={20} width={28} />
                  </div>

                  {/* Token */}
                  <div className="flex items-center gap-3">
                    <Skeleton
                      height={44}
                      width={44}
                      className="!rounded-full"
                    />
                    <Skeleton height={20} width={60} />
                  </div>

                  {/* Price */}
                  <div className="flex items-center">
                    <Skeleton height={20} width={80} />
                  </div>

                  {/* Balance */}
                  <div className="flex items-center">
                    <Skeleton height={20} width={90} />
                  </div>

                  {/* Value */}
                  <div className="flex items-center">
                    <Skeleton height={20} width={80} />
                  </div>
                </div>
              ))}
            </div>

            {/* More Button */}
            <div className="flex justify-center">
              <Skeleton height={45} width={100} className="!rounded-lg" />
            </div>
          </div>
        </div>

        {/* Section 3 - Transactions History Skeleton */}
        <div className="space-y-[25px]">
          {/* Title */}
          <div className="w-full flex items-center">
            <Skeleton height={28} width={200} />
          </div>

          {/* Table */}
          <div className="bg-[#212121] rounded-2xl overflow-hidden p-5 space-y-5">
            {/* Table Header */}
            <div className="grid grid-cols-3 px-2.5 py-3 bg-[#161616] rounded-xl gap-4">
              <Skeleton height={24} width={130} />
              <Skeleton height={24} width={130} />
              <Skeleton height={24} width={130} />
            </div>

            {/* Transaction Rows */}
            <div className="space-y-5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 px-2.5 py-4 rounded-xl gap-4"
                >
                  {/* Transaction Type */}
                  <div className="flex items-center gap-2.5">
                    <Skeleton
                      height={32}
                      width={32}
                      className="!rounded-full"
                    />
                    <div className="space-y-2 flex-1">
                      <Skeleton height={16} width={100} />
                      <Skeleton height={14} width={80} />
                    </div>
                  </div>

                  {/* Token */}
                  <div className="flex items-center gap-2.5">
                    <Skeleton
                      height={40}
                      width={40}
                      className="!rounded-full"
                    />
                    <Skeleton height={16} width={70} />
                  </div>

                  {/* Wallet Address */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-2 flex-1">
                      <Skeleton height={16} width={60} />
                      <Skeleton height={16} width={100} />
                    </div>
                    <Skeleton height={20} width={20} className="!rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Loading Indicator */}
        <div className="z-50 fixed bottom-8 right-8 bg-gradient-to-r from-[#EDFF7D] to-[#49F992] p-4 rounded-full shadow-lg">
          <div className="flex items-center gap-3 text-black">
            <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            <span className="font-family-IranYekan-Bold text-sm cursor-default">
              Loading wallet data...
            </span>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}

