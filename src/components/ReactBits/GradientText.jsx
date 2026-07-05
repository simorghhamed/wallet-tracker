export function GradientText({
  children,
  className = "",
  colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
  animationSpeed = 8,
  showBorder = false,
  svg = null,
}) {
  const gradientStyle = {
    background: `linear-gradient(90deg, ${colors.join(", ")})`,
    backgroundSize: "200% 100%",
    animation: `gradientMove ${animationSpeed}s ease-in-out infinite`,
  };

  return (
    <>
      <style>{`
        @keyframes gradientMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      <div className="flex items-center justify-center gap-2.5">
        <span>{svg}</span>

        <div
          className={`relative inline-block font-family-IranYekan-Bold ${className}`}
        >
          {showBorder && (
            <div
              className="absolute inset-0 rounded-[1.25rem] p-[2px]"
              style={gradientStyle}
            >
              <div className="bg-black rounded-[1.25rem] w-full h-full"></div>
            </div>
          )}

          <span
            className="relative z-[8] text-transparent !bg-clip-text"
            style={gradientStyle}
          >
            {children}
          </span>
        </div>
      </div>
    </>
  );
}
