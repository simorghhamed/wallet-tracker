import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, clearCurrentUserThunk } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { NOTIFICATION_DISABLED } from "../utils/constance";

export const UserDropdown = ({ isOpen, onClose, user }) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  // بستن dropdown با کلیک بیرون از آن
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleLogout = () => {
    dispatch(clearCurrentUserThunk());
    onClose();
    // navigate after logout to home
    navigate("/");
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2 w-64 bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden"
    >
      {/* User Info Section */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#49F992] to-[#EDFF7D] flex items-center justify-center">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-black font-family-IranYekan-Bold text-lg">
                {user?.username?.charAt(0) || "U"}
              </span>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-white font-family-IranYekan-Bold text-sm">
              {user?.username || "User"}
            </h3>
            <p className="text-gray-400 text-xs">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-2 child:cursor-pointer">
        <button className="w-full px-4 py-3 text-right text-white hover:bg-[#2a2a2a] transition-colors duration-200 flex items-center space-x-3 rtl:space-x-reverse">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="font-family-IranYekan-Medium">My Profile</span>
        </button>

        <button className="w-full px-4 py-3 text-right text-white hover:bg-[#2a2a2a] transition-colors duration-200 flex items-center space-x-3 rtl:space-x-reverse">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="font-family-IranYekan-Medium">Settings</span>
        </button>

        <button className="w-full px-4 py-3 text-right text-white hover:bg-[#2a2a2a] transition-colors duration-200 flex items-center space-x-3 rtl:space-x-reverse">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-family-IranYekan-Medium">History</span>
        </button>

        <hr className="my-2 border-gray-700" />

        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 text-right text-red-400 hover:bg-red-500/10 transition-colors duration-200 flex items-center space-x-3 rtl:space-x-reverse"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="font-family-IranYekan-Medium">LogOut</span>
        </button>
      </div>
    </div>
  );
};
