import React from "react";

import { FeaturedItem } from "../components";

const FeaturedList = ({ activities }) => (
  <>
    <div className="featured-desc">
      <div className="featured-title">
        <h6>MAKE MEMORIES HAPPEN ...</h6>
        <h1>Featured activities</h1>
      </div>
      <div className="featured-text">
        Take advantage of special savings and exclusive offers when you book
        direct with Adriatic Luxury Hotels. Whether you’re looking to explore
        Dubrovnik and other parts of the beautiful south Dalmatia, or perhaps
        you just want a weekend away, we have special packages across our
        properties to suit your needs.
      </div>
    </div>
    <div className="gridcontainer">
      {activities
        .filter((activity) => activity.featured === true)
        .map((activity) => (
          <FeaturedItem key={activity.uid} activity={activity} />
        ))}
    </div>
  </>
);

export default FeaturedList;
