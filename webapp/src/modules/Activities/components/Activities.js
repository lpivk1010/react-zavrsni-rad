import React, { Component } from "react";
import { withFirebase } from "../../Firebase";

import { FeaturedList, ActivityList } from "../components";

class ActivitiesBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      activities: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.activities().on("value", (snapshot) => {
      const activityObject = snapshot.val();

      if (activityObject) {
        const activityList = Object.keys(activityObject).map((key) => ({
          ...activityObject[key],
          uid: key,
        }));

        this.setState({ activities: activityList, loading: false });
      } else {
        this.setState({ activities: null, loading: false });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.activities().off();
  }

  render() {
    const { activities, loading } = this.state;
    return (
      <div>
        {loading && <div>Loading ...</div>}

        {activities ? (
          <>
            <FeaturedList activities={activities} />
            <ActivityList activities={activities} />
          </>
        ) : (
          <div>There are no activites ...</div>
        )}
      </div>
    );
  }
}

const Activities = withFirebase(ActivitiesBase);
export default Activities;
