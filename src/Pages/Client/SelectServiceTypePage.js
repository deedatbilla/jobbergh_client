import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect, firestoreConnect } from "react-redux-firebase";
import DashBoardHeader from "../../Components/DashBoardHeader";
import ProfileContent from "../../Components/ProfileContent";
import DashboardSideBar from "../../Components/DashboardSideBar";
import Spinner from "../../Components/Common/Spinner";
import ServiceTypeCard from "../../Components/ServiceTypeCard";
class SelectServiceTypePage extends Component {
  render() {
    if (this.props.services) {
    return (
      <div>
        {/* <p onClick={this.logout}>textInComponent</p>{" "} */}
        <DashBoardHeader />
        <DashboardSideBar />
        <div className="content-wrapper">
          {/* <!-- Content Header (Page header) --> */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0 text-dark"> Select service type</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Select service type</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- /.content-header --> */}

          {/* <!-- Main content --> */}
          <section className="content">
            <div className="container-fluid">
              <div class="row">
                {this.props.services.map(data=>(<div className="col-md-3">
                  <ServiceTypeCard key={data.id} name={data.name}/>
                </div>))}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
    }
     else {
      return <Spinner />;
    }
  }
}

SelectServiceTypePage.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
export default compose(
  firestoreConnect([{ collection: "services" }]),
  firebaseConnect(),

  connect((state, props) => ({
    services: state.firestore.ordered.services,
  }))
)(SelectServiceTypePage);
