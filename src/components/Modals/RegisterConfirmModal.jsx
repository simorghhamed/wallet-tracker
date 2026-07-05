import BaseModal from "./BaseModal";
import { useState } from "react";
import {
  registerConfirmUser,
  setRegisterConfirmModalClose,
} from "../../features/auth/authSlice";

export function RegisterConfirmModal({
  isRegisterConfirmModalOpen,
  currentRegisterEmail,
  dispatch,
}) {
  const [formData, setFormData] = useState({
    code: "",
  });

  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.code) {
      newErrors.code = "کد تایید الزامی است";
    } else if (formData.code.length < 6) {
      newErrors.code = "کد تایید باید حداقل ۶ کاراکتر باشد";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!currentRegisterEmail) {
      setErrors("Email Is Not Valid!");
      return;
    }

    setIsLoading(true);
    // console.log('Register data:', formData);
    const datas = {
      email: currentRegisterEmail,
      code: formData.code,
    };
    dispatch(registerConfirmUser(datas)).then((res) => {
      setIsLoading(false);
    });
  };

  const handleClose = () => {
    dispatch(setRegisterConfirmModalClose());
    //   setFormData({ email: '', password: '', confirmPassword: '' });
    //   setErrors({});
  };

  return (
    <BaseModal
      isOpen={isRegisterConfirmModalOpen}
      onClose={handleClose}
      title="Confirm Code"
      className="max-w-lg space-y-4"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border border-[#FFFFFF]/21 bg-[#FFFFFF]/3 rounded-xl text-white
                  focus:outline-none focus:ring-2 transition-all duration-200
                  placeholder:bg-gradient-to-r placeholder:from-custom-yellow placeholder:to-custom-green placeholder:text-transparent placeholder:bg-clip-text
                  ${
                    errors.code
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-custom-yellow focus:border-transparent"
                  }
                `}
            placeholder="Confirm Code"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-xl font-family-IranYekan-Bold text-black transition-all duration-200 cursor-pointer
                ${
                  isLoading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-custom-green to-custom-yellow hover:from-[#3de080] hover:to-[#d4e86b] hover:shadow-lg"
                }
              `}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              Loading...
              <svg
                className="w-5 h-5 mr-2 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </BaseModal>
  );
}
