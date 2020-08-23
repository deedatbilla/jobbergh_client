import SecondaryHeader from "../../Components/SecondaryHeader";
import ArtisanCard from "../../Components/ArtisanCard";
import PropTypes from "prop-types";
import Spinner from "../../Components/Common/Spinner";
import axios from 'axios';

import React, { useState, useEffect } from "react";

const SearchLayout = ({ artisans, firebase, params }) => {
  const [list, setlist] = useState([]);
  useEffect(() => {
    console.log(artisans)
    artisans.forEach((element) => {
      if (element.services.includes(params)) {
        setlist(list.concat(element));
      }
    });
  }, [artisans, firebase, params]);
  //   console.log(list[0]);
  return (
   
  );
};

export default SearchLayout;
