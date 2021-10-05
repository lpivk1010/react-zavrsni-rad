import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const FeaturedItem = ({ activity }) => (
  <div className="gridelements">
    <Link to={`/${activity.url}`}>
      <div className="gridimagecontainer">
        <img
          src={activity.headerImageUrl}
          alt="grid-first"
          className="gridimg"
        />
      </div>
      <div className="gridtextcontainer">
        <h2>{activity.title}</h2>
        <p>{activity.shortDescription}</p>
        <div className="griddate">
          <div>29th of August - 1st of Semptember</div>
          <div className="details-link">
            <FaArrowRight className="details-icon" />
          </div>
        </div>
      </div>
    </Link>
  </div>
);

export default FeaturedItem;
