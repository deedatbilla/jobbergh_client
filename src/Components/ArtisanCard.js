import React, { useState, useEffect } from "react";
import artisan from "../images/900-darren2x.png";
import placeholder from "../images/about_img.png";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import axios from "axios";
const ArtisanCard = (props) => {
  const [images,setimages]=useState([])
  
  useEffect(() => {
    const fetch = async () => {
     
      try {
        const response = await axios.get(`http://radel.pythonanywhere.com/getImagesFromWorkPlace/${props.data.id}`);
        console.log(response.data)
        setimages([...response.data.images])
      } catch (error) {
        console.log(error.message)
      }
    };
    fetch()
   
  }, []);
  const { fname, lname, shop_images, id, shop_location,bio } = props.data;
  // console.log(JSON.stringify(shop_images));
  return (
    <div className="col-md-3">
      <div class="card shadow-lg mb-5 bg-white rounded">
        <Carousel>
          {images.map((data) => (
            <Carousel.Item>
              <img className="d-block w-100 " src={data} alt="First slide" />
            </Carousel.Item>
          ))}
        </Carousel>
        <div class="card-body">
          <div className="container">
            <div className="row">
              <img src={artisan} height={30} width={40} className="rounded-circle" alt="user profile" />
              <h4 class="card-title">
                {fname} {lname}
              </h4>
            </div>
            <div className="row mt-1 p-2">
              <p class="card-text">{bio}</p>
            </div>

            <div className="row mt-1 p-2">
           {[5,7,8].map(data=>(<i class="fa fa-star-o p-1" aria-hidden="true"></i>))}
            </div>
          </div>
          <Link to={`/service/${JSON.stringify({id:id,service:props.match})}`} class="btn  bg-orange text-white">
            See Profile
          </Link>
        </div>
      </div>
    </div>
  );

  
};

export default ArtisanCard;
