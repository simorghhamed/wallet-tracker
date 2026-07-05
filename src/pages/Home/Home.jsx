import { useEffect, useState } from "react";
import { cards } from "../../assets/data/cards";
import { TrueFocus } from "../../components/ReactBits/TrueFocus";
import { customYellow, customGreen } from "../../Utils/colors";
import WalletSearchComponent from "../../components/WalletSearchComponent";
import { GradientText } from "../../components/ReactBits/GradientText";
import { SpotlightCard } from "../../components/ReactBits/SpotlightCard";
import { FeaturesSvg } from "../../assets/svg/FeaturesSvg";

export function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Section 1 ==> شامل هدر و بکگراند  */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Main Content Area */}
        <div className="flex items-center justify-center h-full -mt-20">
          <div className="text-center w-full -space-y-12">
            <div className="flex items-center justify-center">
              <img
                src="/images/Flux_Dev_A_pair_of_dark_brown_leather_gloves.svg"
                alt=""
              />
            </div>

            {/* Search Box */}
            <div className="max-w-2xl mx-auto space-y-5">
              <div className="w-max mx-auto">
                <TrueFocus
                  sentence="Wallet Tracker"
                  manualMode={false}
                  blurAmount={4}
                  borderColor={customYellow}
                  animationDuration={1}
                  pauseBetweenAnimations={1}
                />
              </div>

              <h2 className="text-white font-family-IranYekan-Medium text-lg">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's
              </h2>

              <WalletSearchComponent />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      {/* <div className='w-full min-h-screen flex items-center justify-center'> */}
      <div className="w-full py-20 flex items-center justify-center">
        <div className="container mx-auto px-6 py-20 space-y-[50px]">
          <div className="mx-auto flex items-center justify-center gap-2.5">
            <GradientText
              colors={[customGreen, customYellow]}
              animationSpeed={3}
              showBorder={false}
              className="text-[26px]"
              svg={FeaturesSvg}
            >
              Features
            </GradientText>
          </div>

          {/* Cards */}
          {/* <div className='w-full mx-auto flex items-center justify-around'> */}
          <div className="relative w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            <div className="w-[80%] h-0 m-auto top-0 bottom-0 absolute -z-10 bg-custom-green shadow-[0px_0px_115px_70px_theme(color.custom-green)] rounded-[2px] opacity-40"></div>

            {cards.map((card, i) => (
              <SpotlightCard
                key={i}
                className="min-w-[340px] max-w-[340px] min-h-[380px] p-8"
                spotlightColor={customGreen}
              >
                <div className="w-full h-full space-y-[30px]">
                  <div className="flex items-center justify-center gap-2.5">
                    <img
                      src={card.icon}
                      alt=""
                      className="w-[35px] h-[35px] flex-shrink-0"
                    />
                    <span className="text-lg text-white font-family-IranYekan-Bold text-wrap text-center leading-tight">
                      {card.title}
                    </span>
                  </div>

                  <p className="text-justify text-white font-family-IranYekan-Medium text-base leading-7">
                    {card.desc}
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>

      {/* Section 3 */}
      {/* <div className='w-full min-h-screen flex items-center justify-center'> */}
      <div className="w-full py-20 flex items-center justify-center">
        <div className="container mx-auto px-6 py-12 space-y-[50px]">
          <div className="mx-auto flex items-center justify-center gap-2.5">
            <GradientText
              colors={[customGreen, customYellow]}
              animationSpeed={3}
              showBorder={false}
              className="text-[26px]"
              svg={FeaturesSvg}
            >
              Mobile application
            </GradientText>
          </div>

          {/* Cards */}
          {/* <div className='w-full mx-auto flex items-center justify-around'> */}
          <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="w-full h-max space-y-5">
              <p className="text-justify text-white font-family-IranYekan-Medium text-base leading-7">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries
              </p>

              {/* <div className='flex items-center gap-5'> */}
              <div className="flex items-center gap-5 flex-wrap">
                <SpotlightCard
                  // className='p-4 flex items-center justify-center gap-4 min-w-[160px] max-w-[160px]'
                  className="p-4 flex items-center justify-center gap-4 min-w-[160px] transition-transform duration-200 cursor-pointer"
                  spotlightColor={customGreen}
                >
                  <img
                    src="/images/google-play.png"
                    className="w-[25px] h-[25px]"
                    alt="Google Play Store"
                  />
                  <span className="text-white font-family-IranYekan-Regular text-base">
                    Google Play
                  </span>
                </SpotlightCard>

                <SpotlightCard
                  // className='p-4 flex items-center justify-center gap-4 min-w-[160px] max-w-[160px]'
                  className="p-4 flex items-center justify-center gap-4 min-w-[160px] transition-transform duration-200 cursor-pointer"
                  spotlightColor={customGreen}
                >
                  <img
                    src="/images/icons8-apple-inc-.png"
                    className="w-[25px] h-[25px]"
                    alt="Apple App Store"
                  />
                  <span className="text-white font-family-IranYekan-Regular text-base">
                    Apple Store
                  </span>
                </SpotlightCard>
              </div>
            </div>

            {/* <div className='w-full h-full flex items-center justify-end'> */}
            <div className="flex items-center justify-center lg:justify-end">
              <img
                src="/images/realistic-smartphone-mockup-isometric-smartphone-set-3d-mobile-phones-with-blank-screen-illustration-vector.png"
                alt=""
                // className='w-[400px] h-[400px]'
                className="w-full max-w-[400px] h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-custom-green to-custom-yellow 
           hover:from-[#3de080] hover:to-[#d4e86b] rounded-full shadow-lg hover:shadow-xl
           transition-all duration-300 flex items-center justify-center group cursor-pointer
           ${
             showScrollTop
               ? "opacity-100 translate-y-0"
               : "opacity-0 translate-y-16 pointer-events-none"
           }`}
        aria-label="Scroll to top"
      >
        <svg
          className="w-6 h-6 text-black transition-transform duration-200 group-hover:-translate-y-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 11l5-5m0 0l5 5m-5-5v12"
          />
        </svg>
      </button>
    </>
  );
}
