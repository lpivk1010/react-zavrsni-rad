import React from "react";

import { ExtrasList, Gallery } from "../components";

const ActivityItemAdmin = ({ activity, onRemoveActivity }) => (
  <div className="admin-activities-item">
    <div className="header-title-description">
      {" "}
      <img
        className="admin-header-img"
        src={activity.headerImageUrl}
        alt="header-img"
      />
      <div className="title-description">
        <h3>
          Title: {activity.title}
          <span>Featured: {activity.featured.toString()}</span>
          <span>Url: /{activity.url}</span>
          <button type="button" onClick={() => onRemoveActivity(activity.uid)}>
            Delete
          </button>
        </h3>
        <p>
          <b>Description: </b>
          {activity.description}
        </p>
        <p>
          <b>Short Description: </b>
          {activity.shortDescription}
        </p>
        <div className="extras-gallery">
          <div className="admin-extras">
            <b>Extras: </b>
          </div>
          <div className="admin-extras-list">
            <ExtrasList activity={activity} />{" "}
          </div>
          <div className="admin-extras">
            <b>Gallery: </b>
          </div>
          <div>
            <Gallery activity={activity} />
          </div>
          <img
            className="admin-bg-img"
            src={activity.bgImageUrl}
            alt="header-img"
          />
        </div>
      </div>
    </div>
  </div>
);

export default ActivityItemAdmin;