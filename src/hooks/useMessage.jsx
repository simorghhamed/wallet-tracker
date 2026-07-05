import { onMessage } from "firebase/messaging";
import { useEffect, useState } from "react";
import { messaging } from "../utils/firebase";

export const useMessage = () => {
  const [message, setMessage] = useState();
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log(payload);
      setMessage(payload);
    });

    return () => unsubscribe();
  }, []);

  return {
    message,
  };
};
