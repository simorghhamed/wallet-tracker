import React, { useState } from 'react';
import BaseModal from './BaseModal';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import CustomStyledGoogleButton from '../CustomStyledGoogleButton';
import { googleAuth, registerUser, setLoginModalOpen, setRegisterModalClose } from '../../features/auth/authSlice';

const GOOGLE_CLIENT_ID = "443393120553-o8piqvue2splrbe391aadg7kqdhee3ti.apps.googleusercontent.com";

export const RegisterModal = ({isRegisterModalOpen, dispatch}) => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    dispatch(setRegisterModalClose());
    setFormData({ email: '', password: '', confirmPassword: '' });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    
    if (!formData.email.trim()) {
      newErrors.email = 'ایمیل الزامی است';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'فرمت ایمیل صحیح نیست';
    }
    
    if (!formData.password) {
      newErrors.password = 'رمز عبور الزامی است';
    } else if (formData.password.length < 6) {
      newErrors.password = 'رمز عبور باید حداقل ۶ کاراکتر باشد';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'تکرار رمز عبور مطابقت ندارد';
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
    
    setIsLoading(true);
    console.log('Register data:', formData);
    
    // try {
    //   // اینجا API call برای ثبت نام
      
    //   // شبیه‌سازی AP call
    //   await new Promise(resolve => setTimeout(resolve, 1500));
      
    //   handleClose();
    //   alert('ثبت نام با موفقیت انجام شد!');
      
    // } catch (error) {
    //   console.error('Registration error:', error);
    //   alert('خطا در ثبت نام');
    // } finally {
    //   setIsLoading(false);
    // }


    dispatch(registerUser(formData)).then(res => {
      setIsLoading(false)
    })

  };

  const switchToLogin = () => {
    dispatch(setRegisterModalClose());
    dispatch(setLoginModalOpen());
  };

  const handleGoogleSignIn = (credentialResponse) => {
    const idToken = credentialResponse.credential;
    console.log("Google ID Token:", idToken);
    // sendTokenToServer(idToken); // ارسال توکن به سرور
    dispatch(googleAuth(encodeURIComponent(idToken)))
  };

  return (
    <BaseModal
      isOpen={isRegisterModalOpen}
      onClose={handleClose}
      title="Register"
      className="max-w-lg space-y-4"
    >
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Email Field */}
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border border-[#FFFFFF]/21 bg-[#FFFFFF]/3 rounded-xl text-white
              focus:outline-none focus:ring-2 transition-all duration-200
              placeholder:bg-gradient-to-r placeholder:from-custom-yellow placeholder:to-custom-green placeholder:text-transparent placeholder:bg-clip-text
              ${errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-custom-yellow focus:border-transparent'}
            `}
            placeholder="Email"
          />
        </div>

        {/* Password Field */}
        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border border-[#FFFFFF]/21 bg-[#FFFFFF]/3 rounded-xl text-white
              focus:outline-none focus:ring-2 transition-all duration-200
              placeholder:bg-gradient-to-r placeholder:from-custom-yellow placeholder:to-custom-green placeholder:text-transparent placeholder:bg-clip-text
              ${errors.password ? 'border-red-500 focus:ring-red-500' : 'focus:ring-custom-yellow focus:border-transparent'}
            `}
            placeholder="Password"
          />
        </div>

        {/* Confirm Password Field */}
        <div>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border border-[#FFFFFF]/21 bg-[#FFFFFF]/3 rounded-xl text-white
              focus:outline-none focus:ring-2 transition-all duration-200
              placeholder:bg-gradient-to-r placeholder:from-custom-yellow placeholder:to-custom-green placeholder:text-transparent placeholder:bg-clip-text
              ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'focus:ring-custom-yellow focus:border-transparent'}
            `}
            placeholder="Confirm Password"
          />
        </div>

        <div className='flex items-center justify-center gap-2'>

            {/* <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
              <div className="w-full flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSignIn}
                  onError={() => console.log("Google Sign-In Failed")}
                  theme="filled_blue"
                  size="large"
                  text="continue_with"
                  width="300"
                  shape="rectangular"
                />
              </div>
            </GoogleOAuthProvider> */}

            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
              <CustomStyledGoogleButton 
                onSuccess={handleGoogleSignIn}
                onError={() => console.log("Google Sign-In Failed")}
              />
            </GoogleOAuthProvider>


            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-xl font-family-IranYekan-Bold text-black transition-all duration-200 cursor-pointer
                ${isLoading 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-custom-green to-custom-yellow hover:from-[#3de080] hover:to-[#d4e86b] hover:shadow-lg'
                }
              `}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  Loading...
                  <svg className="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                </div>
              ) : (
                'Submit'
              )}
            </button>

        </div>

        {/* Switch to Login */}
        <div className="text-center pt-4 border-t border-gray-700">
          <p className="text-white font-family-IranYekan-DemiBold">
                Already a member?{' '}
            <button
              type="button"
              onClick={switchToLogin}
              className="text-custom-green hover:text-[#3de080] font-family-IranYekan-DemiBold transition-colors duration-200 cursor-pointer"
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </BaseModal>
  );
};

