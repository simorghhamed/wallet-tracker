import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { id: 1, title: "Home", to: "/" },
  { id: 2, title: "Top Wallets", to: "/top-wallets" },
  { id: 3, title: "Watch List", to: "/watch-list" },
  { id: 4, title: "Search History", to: "/history" },
  { id: 5, title: "Favorits", to: "/favorite" },
];
export const NavigationsLink = () => {
  // State برای نگهداری استایل (موقعیت و عرض) خط زیرین
  const [underlineStyle, setUnderlineStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const linksContainerRef = useRef(null);

  useEffect(() => {
    if (linksContainerRef.current) {
      // پیدا کردن تبی که فعال است (دارای کلاس .active)
      const activeLink = linksContainerRef.current.querySelector("a.active");

      if (activeLink) {
        // اگر تب فعالی پیدا شد، استایل خط را به‌روزرسانی می‌کنیم
        setUnderlineStyle({
          left:
            activeLink.offsetLeft +
            (activeLink.offsetWidth - activeLink.offsetWidth * 0.4) / 2,
          width: activeLink.offsetWidth * 0.4,
          opacity: 1,
        });
      }
    }
  }, [location.pathname]);
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      {/* این div نگهدارنده‌ی تب‌ها است و Ref به آن متصل شده */}
      <div
        ref={linksContainerRef}
        className="relative flex items-center space-x-[25px] text-white font-family-IranYekan-Bold text-lg"
      >
        {links.map((link) => (
          <NavLink
            key={link.id}
            to={link.to}
            // به NavLink فعال کلاس 'active' می‌دهیم و رنگ متن را تغییر می‌دهیم
            className={({ isActive }) =>
              `relative z-10 px-4 py-2 transition-colors duration-300 hover:text-[#EDFF7D] text-nowrap ${
                isActive ? "active" : ""
              }`
            }
          >
            {link.title}
          </NavLink>
        ))}

        {/* === (Magic Underline) === */}
        <div
          className="absolute bottom-0 w-[45%] h-[4px] rounded-full bg-[#EDFF7D] shadow-[1px_1px_16px_5px_rgba(73,249,146,0.2)] transition-all duration-300 ease-in-out"
          style={underlineStyle}
        />
      </div>
    </div>
  );
};
