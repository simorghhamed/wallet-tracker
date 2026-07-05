import axios from "axios";
import { BASE_URL } from "./endpoints";
// import { showErrorToast, showSuccessToast } from "../utils/VendorProfile/vendorProfileVariables";

const apiInstance = axios.create({

  baseURL: BASE_URL,
  withCredentials: true,
});

// افزودن interceptor برای پاسخ
apiInstance.interceptors.response.use(
  (response) => {
    // اگر پاسخ موفقیت‌آمیز بود، آن را برگردانید
    if (response.status >= 200 && response.status < 300) {
      // console.log(response)+
      // showSuccessToast(response.data.message, response.status)
      // return response;
      const method = response.config.method.toLowerCase();  // Get the request method

      // Call the success toast only for PUT, POST, or DELETE methods
      if (['put', 'post', 'delete'].includes(method)) {
        // showSuccessToast(response.data.message, response.status);
      }
      return response;
    }
    // در غیر این صورت یک خطا را throw کنید
    return Promise.reject(response);
  },
  (error) => {
    const method = error.config?.method?.toLowerCase();  // Get the request method

    // Call the error toast only for PUT, POST, or DELETE methods
    // if (['put', 'post', 'delete'].includes(method)) {
    //   if(error.response.data.result.result){

    //     showErrorToast(error.response.data.result.result.message_developer?.fa? error.response.data.result.result.message_developer.fa : error.response.data.result.result.message_developer,error.response.status)
    //   }else{

    //     showErrorToast(error.response.data.result.message_developer?.fa? error.response.data.result.message_developer.fa : error.response.data.result.message_developer,error.response.status)
    //   }
    // }
    return Promise.reject(error.response || error.message);
  }
);

export default apiInstance;