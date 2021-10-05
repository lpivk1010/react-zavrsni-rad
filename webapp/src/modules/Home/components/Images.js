import React from "react";

import img1 from "../assets/beach.jpg";
import img2 from "../assets/citytour.jpg";
import img3 from "../assets/hiking.jpg";
import img4 from "../assets/wellness.jpg";

const Images = () => (
  <div className="home-images-container">
    <img src={img1} alt="massage"></img>
    <img src={img2} alt="nightlife"></img>
    <img src={img3} alt="hiking"></img>
    <img src={img4} alt="beach"></img>
  </div>
);

export default Images;
