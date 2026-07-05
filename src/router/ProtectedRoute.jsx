import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { getUserToken, setLoginModalOpen } from "../features/auth/authSlice";
import { LoginModal } from "../components/Modals/LoginModal";

export const ProtectedRoute = () => {
  const token = useAppSelector(getUserToken);
  const dispatch = useAppDispatch();
  if (token) {
    return <Outlet />;
  }

  // return <Redirect to={ROUTES.LOGIN} />;
  return (
    <div className="flex items-center justify-center mt-[20%]">
      {/* Modal Content */}
      <div
        className={` w-full max-w-md mx-4 bg-[#2C2C2C] rounded-[15px] shadow-[0px_0px_17px_-4px_rgba(222,222,222,0.13)]`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-[15px] gap-6 flex-col">
          <h2 className="text-white">
            You Need To Login For Access To This Section
          </h2>
          <button
            onClick={() => dispatch(setLoginModalOpen())}
            className="w-full h-full max-w-[151px] py-4 text-center text-black bg-gradient-to-r from-custom-green to-custom-yellow hover:from-[#3de080] hover:to-[#d4e86b] font-family-IranYekan-Bold rounded-[15px] cursor-pointer transition-all duration-200 hover:opacity-80
            flex items-center justify-center gap-1"
          >
            Login
          </button>
        </div>

        {/* Content */}
      </div>
    </div>
  );
};
