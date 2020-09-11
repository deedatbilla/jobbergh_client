import React, { useState } from "react";
import slider1 from "../../../images/AIRCON copy.png";
import slider3 from "../../../images/TV_REPAIRER.png";
import slider2 from "../../../images/PC ASSISTANT copy.png";

import { Carousel } from "react-bootstrap";
const images = [slider1, slider2,slider3];
const FullScreenSlider = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    // <!-- Fullscreen Slider Start -->
    // <div class="slider bg-navy-blue">
    //   <div
    //     id="rev_slider_1078_1_wrapper"
    //     class="rev_slider_wrapper fullwidthbanner-container"
    //     data-alias="classic4export"
    //     data-source="gallery"
    //     style={{ margin: "0px auto", backgroundColor: "transparent", padding: "0px", marginTop: "0px", marginBottom: "0px" }}
    //   >
    //     <div id="rev_slider_1078_1" class="rev_slider fullscreenbanner" style={{ display: "block" }} data-version="5.4.1">
    <Carousel className="slider bg-navy-blue" activeIndex={index} onSelect={handleSelect}>
      {images.map((data) => (
        <Carousel.Item>
          <img className="d-block w-100 "  src={data} alt="First slide" />
          <Carousel.Caption style={{ marginBottom: "600px" }}>
            <h1 style={{ fontWeight: "bold", position: "absolute", right: "0" }}>
              Find the perfect service <br /> that satifies your needs
            </h1>
            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>

    // <div class="tp-bannertimer tp-bottom" style={{ height: "7px", backgroundColor: "rgba(255, 255, 255, 0.25)" }}></div>
  );
};

export default FullScreenSlider;
