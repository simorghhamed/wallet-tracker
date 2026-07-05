import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export function FavoritesSkeletonLoader() {
  return (
    <SkeletonTheme baseColor="#2a2a2a" highlightColor="#3a3a3a">
      <div className="w-full h-full mt-20 mb-[50px] space-y-[25px]">
        {/* Page Title Skeleton */}
        <div className="w-full h-full flex items-center justify-start gap-3">
          <Skeleton height={28} width={120} className="rounded-md" />
          <div className="w-[32px] h-[32px] p-3 rounded-[5px] bg-[#3B3B3B] backdrop-blur-[28px] flex items-center justify-center">
            <Skeleton height={18} width={10} />
          </div>
        </div>

        {/* Wallet Cards Skeleton */}
        <div className="w-full h-full space-y-[25px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="w-full bg-[#212121] rounded-[15px] p-[25px] grid grid-cols-5 gap-2"
            >
              {/* Drag Icon & Wallet Image & Wallet Balance */}
              <div className="flex items-center justify-start gap-[25px]">
                {/* Drag Icon Skeleton */}
                <Skeleton height={25} width={25} className="rounded-md" />

                {/* Wallet Image Skeleton */}
                <Skeleton height={50} width={50} className="rounded-[10px]" />

                {/* Wallet Balance Skeleton */}
                <Skeleton height={20} width={80} className="rounded-md" />
              </div>

              {/* Wallet Address Skeleton */}
              <div className="flex items-center gap-2">
                <Skeleton height={16} width={100} className="rounded-md" />
                <Skeleton height={14} width={14} className="rounded-sm" />
              </div>

              {/* Wallet Chain Skeleton */}
              <div className="flex items-center">
                <Skeleton height={16} width={120} className="rounded-md" />
              </div>

              {/* Tracking Start Date Skeleton */}
              <div className="flex items-center">
                {/* <Skeleton height={16} width={160} className="rounded-md" /> */}
              </div>

              {/* Star BTN & Dropdown BTN Skeleton */}
              <div className="flex items-center justify-end gap-[12px]">
                <Skeleton height={45} width={45} className="rounded-[10px]" />
                <Skeleton height={34} width={34} className="rounded-[10px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </SkeletonTheme>
  );
}
