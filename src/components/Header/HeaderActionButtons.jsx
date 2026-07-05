import { createSelector } from "@reduxjs/toolkit";
import { useAppSelector } from "../../app/hook";
import { UserDropdown } from "../UserDropdown";
import { PlusSvg } from "../../assets/svg/PlusSvg";
import { UserSvg } from "../../assets/svg/UserSvg";
export const HeaderActionButtons = ({
  handlers,
  showUserDropdown,
  isAuthenticated,
  currentUser,
}) => {
  return (
    <div className="flex-shrink-0 flex items-center space-x-[15px]">
      {/* User Button */}
      <button
        onClick={handlers.handleProfileAction}
        className="w-[45px] h-[45px] rounded-full cursor-pointer bg-[#3B3B3B] text-white child:text-white flex items-center justify-center hover:bg-[#4B4B4B] transition-all duration-200"
        // title={isAuthenticated ? 'پروفایل کاربری' : 'ورود'}
      >
        {isAuthenticated && currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt="User Avatar"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          UserSvg
        )}
      </button>

      {/* Plus Button */}
      <button
        onClick={handlers.handleSearchWallet}
        className="w-[45px] h-[45px] rounded-full cursor-pointer bg-gradient-to-tr from-[#49F992] to-[#EDFF7D] text-black flex items-center justify-center hover:from-[#3de080] hover:to-[#d4e86b] transition-all duration-200"
        // title={isAuthenticated ? 'افزودن' : 'ثبت نام'}
      >
        {PlusSvg}
      </button>

      <UserDropdown
        isOpen={showUserDropdown}
        onClose={() => handlers.setShowUserDropdown(false)}
        user={currentUser}
      />
    </div>
  );
};
