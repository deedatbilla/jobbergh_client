import React from "react";
import { Link } from "react-router-dom";

const SecondaryHeader = (props) => {
  return (
    

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">
        Jobbergh
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        {/* <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul> */}

        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active">
            <Link to="/" class="nav-link">
              Home <span class="sr-only">(current)</span>
            </Link>
          </li>
          {!props.auth.currentUser ? (
            <React.Fragment>
              <li class="nav-item">
                <Link to="/client/login" class="nav-link">
                  Sign In
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/client/register" class="nav-link btn btn-outline-primary btn-sm">
                  Join
                </Link>
              </li>
            </React.Fragment>
          ) : (
            <li class="nav-item">
              <Link to="/client/dashboard" class="nav-link btn btn-outline-warning btn-sm">
                Dashboard
              </Link>
            </li>
          )}
        </ul>
        {props.showSearch?
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>:null}
      </div>
    </nav>
  );
};

export default SecondaryHeader;
