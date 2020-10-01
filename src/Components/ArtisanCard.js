import React, { useState, useEffect } from "react";
import avatar from "../images/avatar.webp";
import placeholder from "../images/about_img.png";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import ArtisanCardShimmer from "./ArtisanCardShimmer";
import axios from "axios";
const ArtisanCard = (props) => {
  const [images, setimages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        // const response = await axios.get(`https://radel.pythonanywhere.com/getImagesFromWorkPlace/${props.data.id}`);
        // console.log(response.data)
        const { data, firebase } = props;
        setLoading(true);

        firebase
          .database()
          .ref(`/artisan/${data.id}/workplace`)
          .once("value")
          .then((snapshot) => {
            snapshot.forEach((element) => {
              // console.log(element.val().downloadURL);
              const data = element.val();
              // this.setState({ workimages: this.state.workimages.concat(data) });
              setimages((oldArray) => [...oldArray, data]);
              // console.log(images)
            });
            setLoading(false);
            // ...
          });
        // setimages([...response.data.images])
      } catch (error) {
        console.log(error.message);
      }
    };
    fetch();
  }, []);
  const { fname, lname, shop_images, id, shop_location, bio, photoURL } = props.data;
  // console.log(JSON.stringify(shop_images));
  return (
    <div className="col-md-3">
      <div class="card shadow-lg mb-5 bg-white rounded">
        {loading ? (
          <ArtisanCardShimmer />
        ) : (
          <Carousel>
            {images.map((data) => (
              <Carousel.Item>
                <img className="d-block w-100 " src={data.downloadURL} alt="First slide" />
              </Carousel.Item>
            ))}
          </Carousel>
        )}
        <div class="card-body">
          <div className="container">
            <div className="row">
              <div className="col-3">
                {!photoURL ? (
                  <img
                    class=" img-fluid img-circle"
                    height={40} width={40}
                    src={avatar}
                    alt="User profile picture"
                  />
                ) : (
                  <img src={photoURL} height={50} width={50} className="img-fluid img-circle" alt="user profile" />
                )}
              </div>
              <div className="col-9">
                <h6 class="text-muted">
                  {fname} {lname}
                </h6>
                {/* {[5,7,8].map(data=>(<i class="fa fa-star-o " aria-hidden="true"></i>))} */}
              </div>
            </div>
            <div className="row mt-1 p-2">
              <p class="card-text">{bio}</p>
            </div>

            <div className="row mt-1 p-2"></div>
          </div>
          <Link to={`/service/${JSON.stringify({ id: id, service: props.match })}`} class="btn  bg-orange text-white">
            See Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArtisanCard;
