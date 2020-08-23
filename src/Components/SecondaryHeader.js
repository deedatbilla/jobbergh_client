import React from "react";
import { Link } from "react-router-dom";

const SecondaryHeader = (props) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light bg-transparent">
      {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button> */}
      <div class="collapse navbar-collapse navbar-right" id="navbarTogglerDemo01">
        <a class="navbar-brand" href="#">
          Jobbergh
        </a>
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active">
          <Link to="/" class="nav-link" >
              Home <span class="sr-only">(current)</span>
            </Link>
          </li>
          {!props.auth ? (
            <React.Fragment>
              <li class="nav-item">
              <Link to="/client/login" class="nav-link" >
                  Sign In
                </Link>
              </li>
              <li class="nav-item">
              <Link to="/client/register" class="nav-link btn btn-outline-primary" >
                  Join
                </Link>
              </li>
            </React.Fragment>
          ) : (
            <li class="nav-item">
              <Link to="/client/dashboard" class="nav-link btn btn-outline-primary">
                Dashboard
              </Link>
            </li>
          )}
        </ul>
        {/* <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form> */}
      </div>
    </nav>
  );
};

export default SecondaryHeader;
