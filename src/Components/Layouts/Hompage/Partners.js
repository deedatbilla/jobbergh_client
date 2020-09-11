import React, { Component } from "react";
import gcb from '../../../images/gcb.jpg';
import lswg from '../../../images/lswg.png';

class Partners extends Component {
  render() {
    return (
      <section className="wide-tb-100 bg-fixed clients-bg pos-rel">
        <div className="bg-overlay blue opacity-80"></div>
        <div className="container">
          <div className="row">
            {/* <!-- Heading Main --> */}
            <div className="col-sm-12 wow fadeInDown" data-wow-duration="0" data-wow-delay="0s">
              <h1 className="heading-main">
                <span>Our</span>
                Partners
              </h1>
            </div>
            {/* <!-- Heading Main --> */}

            <div className="col-sm-12 wow fadeInUp" data-wow-duration="0" data-wow-delay="0.2s">
              <div className="owl-carousel owl-theme" id="home-clients">
                <div className="item">
                  <img src={gcb} alt="gcb" />
                </div>

                <div className="item">
                  <img src={lswg} alt="lswg" />
                </div>

               
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Partners;
