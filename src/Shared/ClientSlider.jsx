import React from "react";
import Marquee from "react-fast-marquee";
// import all your logos
import logo1 from "../assets/brands/start.png";
import logo2 from "../assets/brands/start-people 1.png";
import logo3 from "../assets/brands/randstad.png";
import logo4 from "../assets/brands/moonstar.png";
import logo5 from "../assets/brands/casio.png";
import logo6 from "../assets/brands/amazon.png";
import logo7 from "../assets/brands/amazon_vector.png";



const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const ClientSlider = () => {
  return (
    <div className="py-6 bg-white">
      <Marquee pauseOnHover={true} speed={50} gradient={false}>
        {logos.map((logo, index) => (
          <div key={index} className="mx-12 flex justify-center items-center">
            <img src={logo} alt={`Client ${index + 1}`} className="h-8 w-auto" />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ClientSlider;
