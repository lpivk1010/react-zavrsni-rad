import React, { Component } from "react";
import { withFirebase } from "../../Firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import {
  SingleActivityExtras,
  SingleActivityGallery,
  Banner,
} from "../components";

class SingleActivityBase extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      loading: false,
      url: this.props.match.params.url,
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

        const activity = activityList.find(
          (activity) => activity.url === this.state.url
        );

        this.setState({ activity: activity, loading: false });
      } else {
        this.setState({ activitiy: null, loading: false });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.activities().off();
  }

  render() {
    const { activity, loading } = this.state;
    return (
      <div>
        {loading && <div>Loading ...</div>}

        {activity ? (
          <div>
            <div className="bg-image-container">
              <img className="bg-image" src={activity.bgImageUrl} alt="kappa" />
              <Banner activity={activity} />
            </div>
            <div className="desc-gallery">
              <div className="single-desc">{activity.description}</div>
              <SingleActivityGallery activity={activity} position="right" />
            </div>
            <div className="gallery-extras">
              <SingleActivityGallery activity={activity} position="left" />
              <div className="single-extras">
                <div className="extras-contact">
                  <h1>Equipment and extra activities:</h1>
                  <div>
                    <SingleActivityExtras activity={activity} />
                  </div>
                  <div className="contact">
                    <h3>Contact:</h3>
                    <ul className="contact-ul">
                      <li>Pera Čingrije 7, 20000 Dubrovnik</li>
                      <li>T: +385 20 330 390</li>
                      <li>E: inquiry@hotelrixos.hr</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

const SingleActivity = compose(withRouter, withFirebase)(SingleActivityBase);
export default SingleActivity;