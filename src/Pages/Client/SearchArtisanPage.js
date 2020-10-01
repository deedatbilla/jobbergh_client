import React, { Component } from "react";
import SecondaryHeader from "../../Components/SecondaryHeader";
import ArtisanCard from "../../Components/ArtisanCard";
import PropTypes from "prop-types";
import Spinner from "../../Components/Common/Spinner";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect, firestoreConnect } from "react-redux-firebase";
// import SearchLayout from "../../Components/Layouts/SearchLayout";
import { getShopImages } from "../../actions/getShopImages";
class SearchArtisanPage extends Component {
  state = {
    details: [],
  };

  render() {
    const { artisans, match, firebase, firestore } = this.props;
    let filtered = [];
    if (artisans) {
      if (match.params.artisan) {
        // console.log(this.props.artisans)

        artisans.forEach((element) => {
          if (element.registrationComplete) {
            if (element.services.includes(match.params.artisan)) {
              filtered.push(element);
            }
          }
        });
      } else {
        filtered = [...artisans];
      }
      // console.log(temp)
      return (
        <div className="">
          <SecondaryHeader auth={this.props.firebase.auth()} showSearch={true} />

          <div className="container-fluid p-4">
            {/* <div className="row mb-5 mt-1">
              <div className="col-md-8">
                <form class="form-inline">
                  <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                  <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </div> */}
            <div className="row">
              <h3>Results for "{match.params.artisan}"</h3>
            </div>
            <div className="row mb-2">
              <div className="col-md-6">
                <p>{filtered.length} services available</p>
              </div>
              <div className="col-md-6 ">
                <p className="float-right">
                  sort by <b>Rating</b>
                </p>
              </div>
            </div>

            <div className="row">
              {filtered.map((data) => (
                <ArtisanCard key={data.id} data={data} match={match.params.artisan} firebase={this.props.firebase} />
              ))}
            </div>
          </div>
        </div>
      );
    } else return <Spinner />;
  }
}

SearchArtisanPage.propTypes = {
  firebase: PropTypes.object.isRequired,
  artisans: PropTypes.array.isRequired,
};
export default compose(
  firestoreConnect([
    { collection: "users", storeAs: "artisans", where: [["userType", "==", "artisan"]] },
    { collection: "services" },
  ]),
  firebaseConnect(),

  connect(
    (state, props) => ({
      artisans: state.firestore.ordered.artisans,
      services: state.firestore.ordered.services,
      shop_images: state.shop_images.shop_images,
    }),
    { getShopImages }
  )
)(SearchArtisanPage);
