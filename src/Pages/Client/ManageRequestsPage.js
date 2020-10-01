import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect, firestoreConnect } from "react-redux-firebase";
import DashBoardHeader from "../../Components/DashBoardHeader";
import DashboardContent from "../../Components/DashboardContent";
import DashboardSideBar from "../../Components/DashboardSideBar";
import Spinner from "../../Components/Common/Spinner";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
class ManageRequestsPage extends Component {
  render() {
    if (this.props.requests) {
      //   console.log(this.props.firebase.auth().currentUser.uid);
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
                    <h1 className="m-0 text-dark"> Manage requests</h1>
                  </div>
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item">
                        <a href="#">Home</a>
                      </li>
                      <li className="breadcrumb-item active">Manage requests</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /.content-header --> */}

            {/* <!-- Main content --> */}
            <section className="content">
              <div className="container-fluid">
                <div className="row">
                  <div class="col">
                    <div class="card">
                      <div class="card-header border-transparent">
                        <h3 class="card-title">My service requests</h3>

                        <div class="card-tools">
                          <button type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                          </button>
                          <button type="button" class="btn btn-tool" data-card-widget="remove">
                            <i class="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                      {/* <!-- /.card-header --> */}
                      <div class="card-body p-0">
                        <div class="table-responsive">
                          <table class="table m-0">
                            <thead>
                              <tr>
                                <th>Request ID</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>Service requested</th>
                                <th>Date requested</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.props.requests.map((data) => (
                                <tr key={data.id}>
                                  <td>{data.id}</td>
                                  <td>{data.job_area}</td>
                                  <td>
                                    <span
                                      className={
                                        data.status === "pending"
                                          ? "badge badge-warning"
                                          : data.status === "cancelled"
                                          ? "badge badge-danger"
                                          : data.status === "in-progress"
                                          ? "badge badge-primary"
                                          : data.status === "complete"
                                          ? "badge badge-success"
                                          : data.status === "awaiting client confirmation"
                                          ? "badge badge-warning"
                                          : null
                                      }
                                    >
                                      {data.status === "awaiting client confirmation"
                                        ? "Waiting for you to confirm completion of work"
                                        : data.status}
                                    </span>
                                  </td>
                                  <td>{data.skill}</td>
                                  <td>{new Date(data.datecreated).toLocaleDateString()}</td>
                                  {data.status === "pending" ? (
                                    <td>
                                      <button
                                        className="btn btn-danger btn-sm"
                                        onClick={async () => {
                                          const { firestore } = this.props;
                                          confirmAlert({
                                            title: "Cancel request",
                                            message: "Are you sure to cancel this request?.",
                                            buttons: [
                                              {
                                                label: "Yes",
                                                onClick: async () => {
                                                  try {
                                                    await firestore.update(
                                                      { collection: "ArtisanRequests", doc: data.id },
                                                      { status: "cancelled" }
                                                    );
                                                  } catch (error) {
                                                    console.log(error.message);
                                                  }
                                                },
                                              },
                                              {
                                                label: "No",
                                                onClick: () => null,
                                              },
                                            ],
                                          });
                                          //   await firestore.u
                                        }}
                                      >
                                        Cancel
                                      </button>
                                    </td>
                                  ) : null}

                                  {data.status === "awaiting client confirmation" ? (
                                    <td>
                                      <button
                                        className="btn btn-success btn-sm"
                                        onClick={async () => {
                                          const { firestore } = this.props;
                                          confirmAlert({
                                            title: "Confirm Completion",
                                            message: "You are about to confirm completion of this service",
                                            buttons: [
                                              {
                                                label: "Confirm",
                                                onClick: async () => {
                                                  try {
                                                    await firestore.update(
                                                      { collection: "ArtisanRequests", doc: data.id },
                                                      { status: "complete" }
                                                    );
                                                  } catch (error) {
                                                    console.log(error.message);
                                                  }
                                                },
                                              },
                                              {
                                                label: "No",
                                                onClick: () => null,
                                              },
                                            ],
                                          });
                                          //   await firestore.u
                                        }}
                                      >
                                        confirm service Completion
                                      </button>
                                    </td>
                                  ) : null}
                                </tr>
                              ))}
                              {/* <tr>
                                <td>
                                  <a href="pages/examples/invoice.html">OR9842</a>
                                </td>
                                <td>Call of Duty IV</td>
                                <td>
                                  <span class="badge badge-success">Shipped</span>
                                </td>
                                <td>
                                  <div class="sparkbar" data-color="#00a65a" data-height="20">
                                    90,80,90,-70,61,-83,63
                                  </div>
                                </td>
                              </tr> */}
                            </tbody>
                          </table>
                        </div>
                        {/* <!-- /.table-responsive --> */}
                      </div>
                      {/* <!-- /.card-body --> */}

                      {/* <!-- /.card-footer --> */}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

ManageRequestsPage.propTypes = {
  firebase: PropTypes.object.isRequired,
  //   artisans: PropTypes.array.isRequired,
};
export default compose(
  firestoreConnect((props) => [
    // { collection: "users", storeAs: "artisan", doc: JSON.parse(props.match.params.data).id },
    { collection: "ArtisanRequests", storeAs: "requests", where: [["client_id", "==", props.firebase.auth().currentUser.uid]] },
  ]),
  firebaseConnect(),
  connect(({ firestore: { ordered } }, props) => ({
    // artisan: ordered.artisan && ordered.artisan[0],
    requests: ordered.requests,
  }))
)(ManageRequestsPage);
