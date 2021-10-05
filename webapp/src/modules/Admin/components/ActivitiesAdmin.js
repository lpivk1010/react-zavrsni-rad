import React, { Component } from "react";

import { AuthUserContext } from "../../Authentication";
import { withFirebase } from "../../Firebase";

import { ActivityList } from "../components";

class ActivitiesBaseAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      url: "",
      featured: false,
      headerImage: null,
      headerImageUrl: "",
      headerPosition: "left",
      bgImage: null,
      bgImageUrl: "",
      description: "",
      shortDescription: "",
      galleryImages: [],
      galleryImagesUrls: [],
      extras: "",
      progress: 0,
      loading: true,
      activities: [],
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeHeaderImgUpload = this.onChangeHeaderImgUpload.bind(this);
    this.onChangeBgImgUpload = this.onChangeBgImgUpload.bind(this);
    this.onChangeGalleryImgUpload = this.onChangeGalleryImgUpload.bind(this);
    this.onChangeRadio = this.onChangeRadio.bind(this);
    this.onChangeFeatured = this.onChangeFeatured.bind(this);
  }

  componentDidMount() {
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

  onChangeText = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeHeaderImgUpload = (e) => {
    if (e.target.files[0]) {
      const headerImage = e.target.files[0];
      this.setState(() => ({ headerImage }));
    }
  };

  onChangeBgImgUpload = (e) => {
    if (e.target.files[0]) {
      const bgImage = e.target.files[0];
      this.setState(() => ({ bgImage }));
    }
  };

  onChangeGalleryImgUpload = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      console.log(newFile);
      newFile["id"] = i + 1;
      this.setState((previousState) => ({
        galleryImages: [...previousState.galleryImages, newFile],
      }));
    }
  };

  onChangeRadio = (e) => {
    this.setState({ headerPosition: e.target.value });
  };

  onChangeFeatured = (e) => {
    this.setState((prevState) => ({
      featured: !prevState.featured,
    }));
  };

  handleHeaderImgUpload = (e) => {
    e.preventDefault();
    const { headerImage } = this.state;
    const uploadTask = this.props.firebase.storage
      .ref(`images/${headerImage.name}`)
      .put(headerImage);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      (error) => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        this.props.firebase.storage
          .ref("images")
          .child(headerImage.name)
          .getDownloadURL()
          .then((headerImageUrl) => {
            this.setState({ headerImageUrl });
          });
      }
    );
  };

  handleBgImgUpload = (e) => {
    e.preventDefault();
    const { bgImage } = this.state;
    const uploadTask = this.props.firebase.storage
      .ref(`images/${bgImage.name}`)
      .put(bgImage);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      (error) => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        this.props.firebase.storage
          .ref("images")
          .child(bgImage.name)
          .getDownloadURL()
          .then((bgImageUrl) => {
            this.setState({ bgImageUrl });
          });
      }
    );
  };

  handleGalleryImgUpload = (e) => {
    e.preventDefault();
    const promises = [];
    const files = this.state.galleryImages;
    const urls = [];
    files.forEach((file) => {
      const uploadTask = this.props.firebase.storage
        .ref(`images/${file.name}`)
        .put(file);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress });
        },
        (error) => {
          // Error function ...
          console.log(error);
        },
        async () => {
          const url = await uploadTask.snapshot.ref.getDownloadURL();
          urls.push(url);
        }
      );
    });
    Promise.all(promises)
      .then(() => {
        alert("All files uploaded");
        this.setState({ galleryImagesUrls: urls });
      })
      .catch((err) => console.log(err.code));
  };

  onCreateActivity = (event) => {
    event.preventDefault();
    this.props.firebase.activities().push({
      title: this.state.title,
      url: this.state.url,
      featured: this.state.featured,
      headerImage: this.state.headerImage,
      headerImageUrl: this.state.headerImageUrl,
      headerPosition: this.state.headerPosition,
      bgImage: this.state.bgImage,
      bgImageUrl: this.state.bgImageUrl,
      description: this.state.description,
      shortDescription: this.state.shortDescription,
      galleryImages: this.state.galleryImages,
      galleryImagesUrls: this.state.galleryImagesUrls,
      extras: this.state.extras,
    });

    this.setState({
      title: "",
      url: "",
      headerImage: null,
      headerImageUrl: "",
      headerPosition: "left",
      bgImage: null,
      bgImageUrl: "",
      description: "",
      shortDescription: "",
      galleryImages: [],
      galleryImagesUrls: [],
      extras: "",
    });
  };

  onRemoveActivity = (uid) => {
    this.props.firebase.activity(uid).remove();
  };

  render() {
    const {
      title,
      url,
      description,
      shortDescription,
      extras,
      activities,
      loading,
    } = this.state;
    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            {loading && <div>Loading ...</div>}

            {activities ? (
              <ActivityList
                activities={activities}
                onRemoveActivity={this.onRemoveActivity}
              />
            ) : (
              <div>There are no activities ...</div>
            )}

            <form
              className="form"
              onSubmit={(event) => this.onCreateActivity(event, authUser)}
            >
              <div className="form-addtitle">
                {" "}
                <h1> ADD NEW ACTIVITY</h1>
                <input
                  className="add-title"
                  type="text"
                  name="title"
                  value={title}
                  onChange={this.onChangeText}
                  placeholder="Title"
                />
                <input
                  className="add-url"
                  type="text"
                  name="url"
                  value={url}
                  onChange={this.onChangeText}
                  placeholder="URL"
                />
                <input
                  className="featured-checkbox"
                  type="checkbox"
                  name="featured"
                  onChange={this.onChangeFeatured}
                />
                <span> Featured</span>
              </div>
              <div>
                <input
                  className="form-adddesc"
                  type="text"
                  name="description"
                  value={description}
                  onChange={this.onChangeText}
                  placeholder="Description"
                />
              </div>
              <div>
                <input
                  className="form-adddesc"
                  type="text"
                  name="shortDescription"
                  value={shortDescription}
                  onChange={this.onChangeText}
                  placeholder="Short Description"
                />
              </div>
              <input
                className="form-adddesc"
                type="text"
                name="extras"
                value={extras}
                onChange={this.onChangeText}
                placeholder="Extras (comma between every item)"
              />
              <div className="form-adbg">
                <input type="file" onChange={this.onChangeBgImgUpload} />
                <button onClick={this.handleBgImgUpload}>Upload BG Image</button>
              </div>
              <div className="form-addheader">
                <input type="file" onChange={this.onChangeHeaderImgUpload} />
                <span>Header Position:</span>
                <input
                  type="radio"
                  name="headerPosition1"
                  value="left"
                  checked={this.state.headerPosition === "left"}
                  onChange={this.onChangeRadio}
                />
                <label for="headerPosition1">Left</label>
                <input
                  type="radio"
                  name="headerPosition2"
                  value="right"
                  checked={this.state.headerPosition === "right"}
                  onChange={this.onChangeRadio}
                />
                <label for="headerPosition2">Right</label>
                <button onClick={this.handleHeaderImgUpload}>
                  Upload Header
                </button>
              </div>

              {/*<progress
                value={this.state.progress}
                max="100"
                className="progress"
              />*/}

              <div className="form-addgallery">
                {" "}
                <input
                  type="file"
                  multiple
                  onChange={this.onChangeGalleryImgUpload}
                />
                <button onClick={this.handleGalleryImgUpload}>
                  Upload gallery photos
                </button>
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const ActivitiesAdmin = withFirebase(ActivitiesBaseAdmin);
export default ActivitiesAdmin;
