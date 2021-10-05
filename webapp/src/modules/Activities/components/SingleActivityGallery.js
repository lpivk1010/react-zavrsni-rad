import React from "react";

const SingleActivityGallery = ({ activity, position }) => {
  const urls1 = activity.galleryImagesUrls.slice(0, 2);
  const urls2 = activity.galleryImagesUrls.slice(2, 4);
  console.log(urls1);
  console.log(urls2);
  const images1 = urls1.map((url, index) => (
    <div className="single-gallery-img-container">
      <img key={index} src={url} alt="single-gallery-img" />
    </div>
  ));
  const images2 = urls2.map((url, index) => (
    <div className="single-gallery-img-container">
      <img key={index} src={url} alt="single-gallery-img" />
    </div>
  ));
  if (position === "left")
    return <div className="single-gallery-container">{images1}</div>;
  else return <div className="single-gallery-container">{images2}</div>;
};

export default SingleActivityGallery;
