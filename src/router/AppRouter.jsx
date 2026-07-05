import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { RestrictedRoute } from "./RestrictedRoute";
import { Home } from "../pages/Home";
import { AboutUs } from "../pages/AboutUs";
import { ContactUs } from "../pages/ContactUs";
import { TermsAndConditions } from "../pages/TermsAndConditions";
import { WalletDetails } from "../pages/WalletDetails";
import { Favorite } from "../pages/Favorite";
import { SearchHistory } from "../pages/SearchHistory";
import { WatchList } from "../pages/WatchList";
import {TopWallets} from "../pages/TopWallets"
import { Layout } from "../components/Layout";
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/top-wallets" element={<TopWallets />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          

          <Route element={<ProtectedRoute />}>
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/history" element={<SearchHistory />} />
          </Route>
          <Route element={<RestrictedRoute />}>
            <Route path="/watch-list" element={<WatchList />} />
            <Route path="/wallet/:network/:address" element={<WalletDetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
