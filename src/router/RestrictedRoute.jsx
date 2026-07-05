import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hook";
import { getUserToken } from "../features/auth/authSlice";
import { getTrackLimitation } from "../features/wallets/walletsSlice";
import { TRACK_LIMITED } from "../utils/constance";
// this logic most run on wahtch list and wallet details item page
export const RestrictedRoute = () => {
  const userToken = useAppSelector(getUserToken);
  const trackedWalletsLimit = useAppSelector(getTrackLimitation);

  const isGuest = !userToken;

  const hasRemainingSlots = (trackedWalletsLimit?.remainingWallets ?? 0) > 0;

  const hasAccess = hasRemainingSlots;

  return <Outlet context={hasAccess} />;
};
