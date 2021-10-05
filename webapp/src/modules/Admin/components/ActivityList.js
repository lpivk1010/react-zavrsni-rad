import React from "react";

import {ActivityItem} from "../components";

const ActivityListAdmin = ({ activities, onRemoveActivity }) => (
  <div className="admin-activities-container">
    {activities.map((activity) => (
      <ActivityItem
        key={activity.uid}
        activity={activity}
        onRemoveActivity={onRemoveActivity}
      />
    ))}
  </div>
);

export default ActivityListAdmin;
