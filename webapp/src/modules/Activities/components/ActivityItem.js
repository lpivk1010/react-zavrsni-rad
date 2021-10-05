import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const ActivityItem = ({ activity }) => (
  <div
    className={
      activity.headerPosition === "left"
        ? "activities-item-left"
        : "activities-item-right"
    }
  >
    {activity.headerPosition === "left"
      ? getImage({ activity })
      : getDesc({ activity })}
    {activity.headerPosition === "left"
      ? getDesc({ activity })
      : getImage({ activity })}
  </div>
);

export default ActivityItem;

const getImage = ({ activity }) => (
  <img
    className="activities-img"
    src={activity.headerImageUrl}
    alt="header-img"
  />
);

const getDesc = ({ activity }) => (
  <div className="activities-description">
    <h1>{activity.title}</h1>
    <p>{activity.shortDescription}</p>
    <div className="details-link">
      <Link to={`/${activity.url}`}>
        <span>DETAILS </span>
        <span>
          <FaArrowRight className="details-icon" />
        </span>
      </Link>
    </div>
  </div>
);
