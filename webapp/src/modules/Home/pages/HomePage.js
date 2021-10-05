import React from "react";

import { About, HeaderBanner, Images } from "../components";

import header from "../assets/hotel.jpg";

const HomePage = () => (
  <>
    <div className="header-container">
      <HeaderBanner />
      <img src={header} className="header" alt="header" />
    </div>
    <About />
    <Images />
  </>
);

export default HomePage;
