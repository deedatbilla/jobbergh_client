import React from "react";
import { Link } from "react-router-dom";

const ServiceTypeCard = (props) => {
  return (
    <Link to={`/search/${props.name}`}>
      <div className="card service-type-card">
        <div className="card-body p-3">
          <i class="fas fa-briefcase" style={{ fontSize: "40px" }}></i>
          <h4 className="text-muted">{props.name}</h4>
        </div>
      </div>
    </Link>
  );
};

export default ServiceTypeCard;
