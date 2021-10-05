import React from "react";

import { ActivityItem } from "../components";

const ActivityList = ({ activities }) => (
  <div className="activities-container">
    {activities
      .filter((activity) => activity.featured === false)
      .map((activity) => (
        <ActivityItem key={activity.uid} activity={activity} />
      ))}
  </div>
);

export default ActivityList;