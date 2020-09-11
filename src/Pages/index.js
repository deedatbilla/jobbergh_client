import React from "react";
import Header from "../Components/Layouts/Hompage/HomeHeader";
import FullScreenSlider from "../Components/Layouts/Hompage/FullScreenSlider";
import Section1 from "../Components/Layouts/Hompage/Section1";
import Section2 from "../Components/Layouts/Hompage/AboutUs";
import WhyLayout from "../Components/Layouts/Hompage/WhyLayout";
import Footer from "../Components/Layouts/Hompage/Footer";
import Spinner from "../Components/Common/Spinner";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect, firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import ReactSearchBox from "react-search-box";
import Partners from '../Components/Layouts/Hompage/Partners';
const data = [
  {
    key: "john",
    value: "John Doe",
  },
  {
    key: "jane",
    value: "Jane Doe",
  },
  {
    key: "mary",
    value: "Mary Phillips",
  },
  {
    key: "robert",
    value: "Robert",
  },
  {
    key: "karius",
    value: "Karius",
  },
];
const HomePage = ({ services, history }) => {
  // console.log(props.services)

  return (
    <div>
      <Header />
      <FullScreenSlider />
      <main id="body-content" style={{ overflowY: "inherit" }}>
        <Section1 />
        <WhyLayout />
        <Section2 />
        <Partners/>

        <Footer />
      </main>
      <a id="mkdf-back-to-top" href="#" class="off">
        <i class="icofont-rounded-up"></i>
      </a>
      <div class="overlay overlay-hugeinc">
        <form class="form-inline mt-2 mt-md-0">
          <div class="form-inner">
            <div class="form-inner-div d-inline-flex align-items-center no-gutters">
              <div class="col-md-1">
                <i class="icofont-search"></i>
              </div>
              <div class="col-10">
                {services ? (
                  <ReactSearchBox
                    placeholder="Find services eg. Painting"
                    value=""
                    data={services.map((data) => {
                      return { key: data.name, value: data.name };
                    })}
                    onSelect={(record) => history.push(`search/${record.key}`)}
                  />
                ) : null}
                {/* <input class="form-control w-100 p-0" type="text" placeholder="Search for an artisan" aria-label="Search" /> */}
              </div>
              <div class="col-md-1">
                <a href="#" class="overlay-close link-oragne">
                  <i class="icofont-close-line"></i>
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

HomePage.propTypes = {
  firebase: PropTypes.object.isRequired,
  //   artisans: PropTypes.array.isRequired,
};
export default compose(
  firestoreConnect((props) => [
    // { collection: "users", storeAs: "artisan", doc: JSON.parse(props.match.params.data).id },
    { collection: "services" },
  ]),
  firebaseConnect(),
  connect(({ firestore: { ordered } }, props) => ({
    // artisan: ordered.artisan && ordered.artisan[0],
    services: ordered.services,
  }))
)(HomePage);
