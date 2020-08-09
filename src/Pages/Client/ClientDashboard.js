import React, { Component } from 'react';
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
class ClientDashboard extends Component {

    logout=()=>{
        const {firebase}=this.props
        firebase.logout()
    }
  render() {
    return (
      <div > 
          <p onClick={this.logout}>textInComponent</p> </div>
    );
  }
}

ClientDashboard.propTypes = {
    firebase: PropTypes.object.isRequired,
    notify: PropTypes.object.isRequired,
    notifyUser: PropTypes.func.isRequired,
  };
  export default compose(
    firebaseConnect(),
    connect(
      (state, props) => ({
        // notify: state.notify,
      }),
    //   { notifyUser }
    )
  )(ClientDashboard);
