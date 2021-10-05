import React from "react";

const Gallery = ({ activity }) => {
  const urls = activity.galleryImagesUrls;
  const images = urls.map((url, index) => (
    <img key={index} src={url} alt="gallery-img" />
  ));
  return <div className="admin-gallery-container">{images}</div>;
};

export default Gallery;
