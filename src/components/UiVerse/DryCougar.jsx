import React from "react";

export function DryCougar({
  text = "Click",
  dataNoClick,
  afterColor = "white",
  hoverColor = "#CD5D67",
  onClick,
  isLoading,
}) {
  const handleClick = () => {
    onClick();
  };

  if (dataNoClick) {
    return (
      <button
        style={{ "--hover-bg": hoverColor }}
        onClick={handleClick}
        data-no-click
        className={`relative w-full h-full max-w-[140px] max-h-[50px] py-4 rounded-xl cursor-pointer overflow-hidden group bg-[#161616] hover:bg-[var(--hover-bg)] text-white transition-all ease-out duration-300 flex items-center justify-center`}
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
        ) : (
          <>
            <span
              style={{ backgroundColor: afterColor }}
              className={`absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 opacity-10 -skew-x-12 group-hover:-translate-x-36 ease`}
            />
            <span className="relative font-family-IranYekan-Bold leading-0 mt-0.5">
              {text}
            </span>
          </>
        )}
      </button>
    );
  } else {
    return (
      <button
        style={{ "--hover-bg": hoverColor }}
        onClick={handleClick}
        className={`relative w-full h-full max-w-[140px] max-h-[50px] py-4 rounded-xl cursor-pointer overflow-hidden group bg-[#161616] hover:bg-[var(--hover-bg)] text-white transition-all ease-out duration-300 flex items-center justify-center`}
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
        ) : (
          <>
            <span
              style={{ backgroundColor: afterColor }}
              className={`absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 opacity-10 -skew-x-12 group-hover:-translate-x-36 ease`}
            />
            <span className="relative font-family-IranYekan-Bold leading-0 mt-0.5">
              {text}
            </span>
          </>
        )}
      </button>
    );
  }
}
