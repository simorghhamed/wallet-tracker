import React from "react";
import {GradientText} from "./ReactBits/GradientText";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full flex items-center justify-center">
      {/* <div className="container mx-auto py-12"> */}
      {/* <div className="container mx-auto pb-[25px]"> */}
      <div className="container mx-auto pb-4">
        <div className="w-full bg-[#3B3B3B]/30 rounded-[15px] p-6 backdrop-blur-[28px] shadow-[0px_0px_20px_-5px_rgba(0,0,0,0.1)] flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to={'about-us'} className="text-white text-lg font-family-IranYekan-Bold">
              About Us
            </Link>
            <Link to={'contact-us'} className="text-white text-lg font-family-IranYekan-Bold">
              Contact Us
            </Link>
            <Link to={'terms-and-conditions'} className="text-white text-lg font-family-IranYekan-Bold">
              Terms and Conditions
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <span className="text-white text-lg font-family-IranYekan-Bold">
              © All rights reserved by 
            </span>
            <GradientText
              colors={["#49F992", "#EDFF7D"]}
              animationSpeed={3}
              showBorder={false}
              className="text-lg"
            >
              Wallet Tracker
            </GradientText>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
