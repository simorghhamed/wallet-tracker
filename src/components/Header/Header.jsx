import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { HeaderActionButtons } from "./HeaderActionButtons";
import { HeaderLogo } from "./HeaderLogo";
import { NavigationsLink } from "./NavigationsLink";
import { createSelector } from "@reduxjs/toolkit";
import {
  checkIsAuthenticated,
  checkIsLoginModalOpen,
  checkIsRegisterModalOpen,
  getCurrentRegisterEmail,
  getCurrentUser,
  setLoginModalOpen,
} from "../../features/auth/authSlice";
import { RegisterModal } from "../Modals/RegisterModal";
import { RegisterConfirmModal } from "../Modals/RegisterConfirmModal";
import { LoginModal } from "../Modals/LoginModal";
import { WalletSearchComponentModal } from "../Modals/WalletSearchComponentModal";

export const Header = () => {
  const dispatch = useAppDispatch();
  const checkIsRegisterConfirmModalOpen = (state) =>
    state.auth.isRegisterConfirmModalOpen;
  const selector = createSelector(
    [
      getCurrentUser,
      getCurrentRegisterEmail,
      checkIsAuthenticated,
      checkIsLoginModalOpen,
      checkIsRegisterModalOpen,
      checkIsRegisterConfirmModalOpen,
    ],
    (
      currentUser,
      currentRegisterEmail,
      isAuthenticated,
      isLoginModalOpen,
      isRegisterModalOpen,
      isRegisterConfirmModalOpen
    ) => {
      return {
        isAuthenticated,
        currentUser,
        currentRegisterEmail,
        isLoginModalOpen,
        isRegisterModalOpen,
        isRegisterConfirmModalOpen,
      };
    }
  );
  const {
    isAuthenticated,
    currentUser,
    currentRegisterEmail,
    isLoginModalOpen,
    isRegisterModalOpen,
    isRegisterConfirmModalOpen,
  } = useAppSelector(selector);

  const [isOpenSeachWalletModal, setIsOpenSearchWalletModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const handleProfileAction = () => {
    if (isAuthenticated) {
      setShowUserDropdown(!showUserDropdown);
    } else {
      dispatch(setLoginModalOpen());
    }
  };

  const handleSearchWallet = () => {
    setIsOpenSearchWalletModal(!isOpenSeachWalletModal);
  };
  return (
    <>
      <header className="pt-4 bg-[#161616]">
        <nav className="relative flex items-center justify-between">
          <HeaderLogo />
          <NavigationsLink />
          <HeaderActionButtons
            handlers={{
              handleProfileAction,
              handleSearchWallet,
              setShowUserDropdown,
            }}
            showUserDropdown={showUserDropdown}
            isAuthenticated={isAuthenticated}
            currentUser={currentUser}
          />
        </nav>
      </header>
      <LoginModal isLoginModalOpen={isLoginModalOpen} dispatch={dispatch} />
      <RegisterModal
        isRegisterModalOpen={isRegisterModalOpen}
        dispatch={dispatch}
      />
      <RegisterConfirmModal
        isRegisterConfirmModalOpen={isRegisterConfirmModalOpen}
        dispatch={dispatch}
        currentRegisterEmail={currentRegisterEmail}
      />
      <WalletSearchComponentModal
        isOpen={isOpenSeachWalletModal}
        setIsOpen={setIsOpenSearchWalletModal}
      />
    </>
  );
};
