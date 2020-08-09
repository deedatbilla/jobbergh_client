import React, { Component } from "react";
import SecondaryHeader from "../../Components/SecondaryHeader";
import ArtisanCard from "../../Components/ArtisanCard";

class SearchArtisanPage extends Component {
  render() {
    return (
      <div className="">
        <SecondaryHeader />

        <div className="container-fluid">
          <div className="row mb-5 mt-5">
            <div className="col-md-8">
              <form class="form-inline">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-6">
              <p>100 services available</p>
            </div>
            <div className="col-md-6 ">
              <p className="float-right">sort by <b>Rating</b></p>
            </div>
          </div>

          <div className="row">
            <ArtisanCard />
            <ArtisanCard />
            <ArtisanCard />
            <ArtisanCard />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchArtisanPage;
