import React from "react";
import artisan from "../images/900-darren2x.png";
import placeholder from '../images/about_img.png';

const ArtisanCard = () => {
  return (
    <div className="col-md-3 ">
      <div class="card shadow-lg p-3 mb-5 bg-white rounded">
        <img class="card-img-top" src={placeholder} alt="Card image" />
        <div class="card-body">
        <div className="container">
          <div className="row">
            <img src={artisan} height={30} width={40} className="rounded-circle" alt="user profile" />
            <h4 class="card-title">John Doe</h4>
          </div>
          <div className="row">
          <p class="card-text">Some example text.</p>
          </div>
          </div>
          <a href="#" class="btn  bg-orange text-white">
            See Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArtisanCard;
