import React, { useState, useEffect } from "react";
import SecondaryHeader from "../../Components/SecondaryHeader";
import Ratings from "react-ratings-declarative";
import axios from "axios";
// import ph from "../../images/900-darren2x.png";
import PropTypes from "prop-types";
import Spinner from "../../Components/Common/Spinner";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect, firestoreConnect } from "react-redux-firebase";
import { Modal, Button } from "react-bootstrap";
import { JOBBERGH_BASE_URL } from "../../config";
// import { Carousel } from "react-bootstrap";
import avatar from "../../images/avatar.webp";
// import DashBoardHeader from "../../Components/DashBoardHeader";
var periods = {
  month: 30 * 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
};
const ServiceInfoPage = (props) => {
  const [workimages, setimages] = useState([]);
  const [sampleworks, setSampleWorks] = useState([]);
  const [show, setShow] = useState(false);
  const [description, setdescription] = useState("");
  const [location, setlocation] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [ovrRating, setOvrRating] = useState(0);
  const [number_of_rate, setNumber_of_rate] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const changeRating = (newRating) => {
    setRating(newRating);
  };

  const formatTime = (timeCreated) => {
    var diff = Date.now() - timeCreated;
    if (diff > periods.month) {
      // it was at least a month ago
      return Math.floor(diff / periods.month) + "m ago";
    } else if (diff > periods.week) {
      return Math.floor(diff / periods.week) + "w ago";
    } else if (diff > periods.day) {
      return Math.floor(diff / periods.day) + "d ago";
    } else if (diff > periods.hour) {
      return Math.floor(diff / periods.hour) + "h ago";
    } else if (diff > periods.minute) {
      return Math.floor(diff / periods.minute) + "m ago";
    }
    return "Just now";
  };
  const OnRequestService = async (e) => {
    e.preventDefault();
    const { firebase, history, firestore } = props;
    const { shop_location, email, phone } = props.artisan;
    // firebase.auth().currentUser.uid
    // alert(description)

    setLoading(true);
    if (firebase.auth().currentUser !== null) {
      try {
        const payload = {
          skill: JSON.parse(props.match.params.data).service,
          type: "individual",
          job_area: location,
          description: description,
          client_id: firebase.auth().currentUser.uid,
          artisan_id: JSON.parse(props.match.params.data).id,
          clientPhone: firebase.auth().currentUser.phoneNumber,
          datecreated: new Date().getTime(),
          status: "pending",
          clientEmail: firebase.auth().currentUser.email,
        };
        // const response = await axios.post(`${BASE_URL}/createservice/`, payload);
        await firestore.add({ collection: "ArtisanRequests" }, payload);
        const notification = await axios.post(`${JOBBERGH_BASE_URL}/api/send-request-notification`, {
          email,
          service: JSON.parse(props.match.params.data).service,
          phone: phone,
        });
        console.log(notification.data);
        alert("you have requested for a service");
        setLoading(false);
        handleClose();
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    } else {
      history.push("/client/login");
      setLoading(false);
    }
  };
  const onChangeDesc = (e) => setdescription(e.target.value);
  const onChangeLoc = (e) => setlocation(e.target.value);
  const onCommentChange = (e) => setComment(e.target.value);
  const ConfirmationModal = () => {
    return (
      <Modal show={show} onHide={handleClose}>
        <form onSubmit={OnRequestService}>
          <Modal.Header closeButton>
            <Modal.Title>You are about to request a service from {props.artisan.fname}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label htmlFor="loc">Enter location of work to be done</label>
            <input
              type="text"
              name="location"
              value={location}
              required
              className="form-control"
              placeholder="Location"
              onChange={onChangeLoc}
            />
            <label htmlFor="desc">Provide a description of the service you want</label>
            <textarea
              placeholder="Description"
              rows={5}
              required
              value={description}
              name="description"
              onChange={onChangeDesc}
              className="form-control"
            />{" "}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <button type="submit" className="btn bg-orange text-white">
              {!loading ? <span>Confirm</span> : <span>requesting...</span>}
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  };
  const leaveReview = async (e) => {
    e.preventDefault();
    // alert("sfdf")
    const { firestore, firebase, reviews, history } = props;
    const user = props.firebase.auth().currentUser;
    try {
      if (firebase.auth().currentUser !== null) {
        if (reviews.length > 0) {
          // console.log("Sd")
          for (var i = 0; i < reviews.length; i++) {
            if (reviews[i].reviewerid === user.uid) {
              alert("you have already left a review for this person");
              break;
            } else {
              await firestore.add(
                { collection: "reviews" },
                {
                  artisanid: JSON.parse(props.match.params.data).id,
                  reviewerid: user.uid,
                  reviewerName: user.displayName,
                  PhotoURL: user.photoURL,
                  comment: comment,
                  rating: rating,
                  timestamp: new Date().getTime(),
                }
              );
              setComment("");
              alert("success");
              break;
            }
          }
        } else {
          await firestore.add(
            { collection: "reviews" },
            {
              artisanid: JSON.parse(props.match.params.data).id,
              reviewerid: user.uid,
              reviewerName: user.displayName,
              PhotoURL: user.photoURL,
              comment: comment,
              rating: rating,
              timestamp: new Date().getTime(),
            }
          );
          setComment("");
          alert("success");
        }
      } else {
        history.push("/client/login");
      }
    } catch (error) {}
  };
  useEffect(() => {
    // console.log(props.artisan);
    const fetch = async () => {
      try {
        // const response = await axios.get(`${BASE_URL}/getImagesFromWorkPlace/${props.match.params.id}`);
        // console.log(response.data);
        // let temp = [];
        // response.data.images.forEach((element) => {
        //   if (!images.includes(element)) {
        //     temp.push(element);
        //   }
        // });
        // setimages([...temp]);
        let artisanid = JSON.parse(props.match.params.data).id;
        const { firebase } = props;
        // setLoading(true);

        firebase
          .database()
          .ref(`/artisan/${artisanid}/workplace`)
          .once("value")
          .then((snapshot) => {
            console.log(snapshot.val());
            snapshot.forEach((element) => {
              console.log(element.val().downloadURL);
              const data = element.val();
              // this.setState({ workimages: this.state.workimages.concat(data) });
              setimages((oldArray) => [...oldArray, data]);
              // console.log(images)
            });

            // setLoading(false);
            // ...
          });

        firebase
          .database()
          .ref(`/artisan/${artisanid}/sample_works`)
          .once("value")
          .then((snapshot) => {
            console.log(snapshot.val());
            snapshot.forEach((element) => {
              console.log(element.val().downloadURL);
              const data = element.val();
              // this.setState({ workimages: this.state.workimages.concat(data) });
              setSampleWorks((oldArray) => [...oldArray, data]);
              // console.log(images)
            });
          });
      } catch (error) {
        console.log(error.message);
      }
    };

    fetch();
  }, []);

  // console.log(shop);
  if (workimages && props.artisan && props.reviews) {
    const { bio, fname, lname, shop_location, services, photoURL } = props.artisan;
    // console.log(reviews, "asdsa");
    // calulateOvrRating(props)
    let sum = 0;
    props.reviews.forEach((element) => {
      sum += element.rating;
    });
    sum = sum / props.reviews.length;
    return (
      <div>
        {ConfirmationModal()}
        <SecondaryHeader auth={props.firebase.auth()} showSearch={true} />

        <div class="container">
          {/* <!-- Content Header (Page header) --> */}
          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>Profile</h1>
                </div>
                {/* <div class="col-sm-6">
                  <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li class="breadcrumb-item active">User Profile</li>
                  </ol>
                </div> */}
              </div>
            </div>
            {/* <!-- /.container-fluid --> */}
          </section>

          {/* <!-- Main content --> */}
          <section class="content">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-3">
                  {/* <!-- Profile Image --> */}
                  <div class="card  card-outline" style={{ borderTopColor: "#fe8704", borderTopWidth: "3px" }}>
                    <div class="card-body box-profile">
                      <div class="text-center">
                        {!photoURL ? (
                          <img class="profile-user-img img-fluid img-circle" src={avatar} alt="User profile picture" />
                        ) : (
                          <img class="profile-user-img img-fluid img-circle" src={photoURL} alt="User profile picture" />
                        )}
                      </div>

                      <h3 class="profile-username text-center">
                        {fname} {lname}
                      </h3>

                      <p class="text-muted text-center">Artisan</p>

                      <ul class="list-group list-group-unbordered mb-3">
                        <li class="list-group-item">
                          <b>Services completed</b> <a class="float-right">12</a>
                        </li>
                        {/* <li class="list-group-item">
                          <b>Following</b> <a class="float-right">543</a>
                        </li> */}
                        <li class="list-group-item">
                          <b>Rating</b>{" "}
                          <a class="float-right">
                            {sum || 0}/5 ({props.reviews.length})
                          </a>
                        </li>
                      </ul>

                      <button class="btn bg-orange  btn-block" onClick={handleShow}>
                        <b className="text-white">Request service</b>
                      </button>
                    </div>
                    {/* <!-- /.card-body --> */}
                  </div>
                  {/* <!-- /.card --> */}

                  {/* <!-- About Me Box --> */}
                  <div class="card card-primary">
                    <div class="card-header bg-orange">
                      <h3 class="card-title text-white">About Me</h3>
                    </div>
                    {/* <!-- /.card-header --> */}
                    <div class="card-body">
                      <strong>
                        <i class="fas fa-book mr-1"></i> Education
                      </strong>

                      <p class="text-muted">B.S. in Computer Science from the University of Tennessee at Knoxville</p>

                      <hr />

                      <strong>
                        <i class="fas fa-map-marker-alt mr-1"></i> Location
                      </strong>

                      <p class="text-muted">{shop_location}</p>

                      <hr />

                      <strong>
                        <i class="fas fa-pencil-alt mr-1"></i> Services
                      </strong>

                      <p class="text-muted">
                        {services.map((data) => (
                          <span class="tag tag-danger">{data} </span>
                        ))}
                      </p>

                      <hr />

                      <strong>
                        <i class="far fa-file-alt mr-1"></i> Bio
                      </strong>

                      <p class="text-muted">{bio}</p>
                    </div>
                    {/* <!-- /.card-body --> */}
                  </div>
                  {/* <!-- /.card --> */}
                </div>
                {/* <!-- /.col --> */}
                <div class="col-md-9">
                  <div class="card">
                    <div class="card-header p-2">
                      <ul class="nav nav-pills">
                        <li class="nav-item">
                          <a class="nav-link active" href="#activity" data-toggle="tab">
                            Activity
                          </a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="#timeline" data-toggle="tab">
                            Workshop and sample works
                          </a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="#settings" data-toggle="tab">
                            Review
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* <!-- /.card-header --> */}
                    <div class="card-body">
                      <div class="tab-content">
                        <div class="active tab-pane" id="activity">
                          {/* <!-- Post --> */}
                          {props.reviews.length > 0 ? (
                            <React.Fragment>
                              {props.reviews.map((data) => (
                                <div class="post">
                                  <div class="user-block">
                                    {data.PhotoURL ? (
                                      <img class="profile-user-img img-fluid img-circle" src={data.PhotoURL} />
                                    ) : (
                                      <img class="profile-user-img img-fluid img-circle" src={avatar} />
                                    )}
                                    <span class="username">
                                      <a href="#">{data.reviewerName}</a>
                                      <span className="float-right">
                                        <Ratings
                                          rating={data.rating}
                                          widgetRatedColors="#fe8704"
                                          // changeRating={changeRating}
                                          widgetDimensions="20px"
                                          widgetSpacings="15px"
                                          className="float-right"
                                        >
                                          <Ratings.Widget widgetSpacing="5px" widgetDimension="15px" />
                                          <Ratings.Widget widgetSpacing="5px" widgetDimension="15px" />
                                          <Ratings.Widget widgetSpacing="5px" widgetDimension="15px" />
                                          <Ratings.Widget widgetSpacing="5px" widgetDimension="15px" />
                                          <Ratings.Widget widgetSpacing="5px" widgetDimension="15px" />
                                        </Ratings>
                                      </span>
                                    </span>
                                    <span class="description">Shared publicly - {formatTime(data.timestamp)}</span>
                                  </div>
                                  {/* <!-- /.user-block --> */}
                                  <p>{data.comment}</p>

                                  {/* <p>
                                <a href="#" class="link-black text-sm mr-2">
                                  <i class="fas fa-share mr-1"></i> Share
                                </a>
                                <a href="#" class="link-black text-sm">
                                  <i class="far fa-thumbs-up mr-1"></i> Like
                                </a>
                                <span class="float-right">
                                  <a href="#" class="link-black text-sm">
                                    <i class="far fa-comments mr-1"></i> Comments (5)
                                  </a>
                                </span>
                              </p>

                              <input class="form-control form-control-sm" type="text" placeholder="Type a comment" /> */}
                                </div>
                              ))}
                            </React.Fragment>
                          ) : (
                            <p className="text-center">no reviews yet</p>
                          )}
                        </div>
                        {/* <!-- /.tab-pane --> */}
                        <div class="tab-pane" id="timeline">
                          {/* <!-- The timeline --> */}
                          <div class="timeline timeline-inverse">
                            <div>
                              {/* <i class="fas fa-camera bg-purple"></i> */}

                              <div class="timeline-item">
                                <h3 class="timeline-header ">
                                  <a href="#" style={{ color: "#fe8704" }}>
                                    My
                                  </a>{" "}
                                  workshop
                                </h3>

                                <div class="timeline-body">
                                  {workimages.map((data) => (
                                    <img src={data.downloadURL} alt="shop" height={100} width={100} />
                                  ))}
                                </div>
                              </div>
                            </div>
                            {/* <!-- END timeline item --> */}
                            {/* <div>
                              <i class="far fa-clock bg-gray"></i>
                            </div> */}
                          </div>
                          <div class="timeline timeline-inverse">
                            <div>
                              {/* <i class="fas fa-camera bg-purple"></i> */}

                              <div class="timeline-item">
                                <h3 class="timeline-header">
                                  <a href="#" style={{ color: "#fe8704" }}>
                                    My
                                  </a>{" "}
                                  sample works
                                </h3>

                                <div class="timeline-body">
                                  {sampleworks.map((data) => (
                                    <img src={data.downloadURL} alt="shop" height={100} width={100} />
                                  ))}
                                </div>
                              </div>
                            </div>
                            {/* <!-- END timeline item --> */}
                            {/* <div>
                             <i class="far fa-clock bg-gray"></i>
                           </div> */}
                          </div>
                        </div>

                        {/* <!-- /.tab-pane --> */}

                        <div class="tab-pane" id="settings">
                          <form class="form-horizontal" onSubmit={leaveReview}>
                            <div class="form-group row">
                              <label for="inputExperience" class="col-sm-2 col-form-label">
                                Leave a review
                              </label>
                              <div class="col-sm-10">
                                <textarea
                                  class="form-control"
                                  placeholder="Review"
                                  name="comment"
                                  value={comment}
                                  onChange={onCommentChange}
                                />
                              </div>
                            </div>

                            <div class="form-group row float-right">
                              <Ratings
                                rating={rating}
                                widgetRatedColors="#fe8704"
                                changeRating={changeRating}
                                widgetDimensions="40px"
                                widgetSpacings="15px"
                              >
                                <Ratings.Widget widgetSpacing="12px" widgetDimension="15px" />
                                <Ratings.Widget widgetSpacing="12px" widgetDimension="15px" />
                                <Ratings.Widget widgetSpacing="12px" widgetDimension="15px" />
                                <Ratings.Widget widgetSpacing="12px" widgetDimension="15px" />
                                <Ratings.Widget widgetSpacing="12px" widgetDimension="15px" />
                              </Ratings>
                            </div>
                            <div class="form-group row mt-5">
                              <div class="offset-sm-2 col-sm-10">
                                <button type="submit" class="btn bg-orange text-white" style={{ color: "white" }}>
                                  Submit
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                        {/* <!-- /.tab-pane --> */}
                      </div>
                      {/* <!-- /.tab-content --> */}
                    </div>
                    {/* <!-- /.card-body --> */}
                  </div>
                  {/* <!-- /.card --> */}
                </div>
                {/* <!-- /.col --> */}
              </div>
              {/* <!-- /.row --> */}
            </div>
            {/* <!-- /.container-fluid --> */}
          </section>
          {/* <!-- /.content --> */}
        </div>
      </div>
    );
  } else return <Spinner />;
};

ServiceInfoPage.propTypes = {
  firebase: PropTypes.object.isRequired,
  artisans: PropTypes.array.isRequired,
};
export default compose(
  firestoreConnect((props) => [
    { collection: "users", storeAs: "artisan", doc: JSON.parse(props.match.params.data).id },
    { collection: "reviews", where: [["artisanid", "==", JSON.parse(props.match.params.data).id]] },
  ]),
  firebaseConnect(),
  connect(({ firestore: { ordered } }, props) => ({
    artisan: ordered.artisan && ordered.artisan[0],
    reviews: ordered.reviews,
  }))
)(ServiceInfoPage);
