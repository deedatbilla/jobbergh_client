import React, { Component } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Sector, Cell } from "recharts";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { firebaseConnect } from "react-redux-firebase";
import Spinner from "../Components/Common/Spinner";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class DashboardContent extends Component {
  state = { total: 0 };

  componentDidMount() {
    const { orders } = this.props;
    if (orders) {
    }
  }
  render() {
    if (this.props.orders) {
      const { orders } = this.props;
      let total = 0;
      let banks = [];
      for (var i = 1; i < orders.length; i++) {
        total += orders[i].volume;
        banks.push(orders[i].BankBranch);
      }
      let unique = [...new Set(banks)];
      let Piedata = [];
      unique.forEach((element) => {
        const obj = {
          name: element,
          value: 88,
        };
        Piedata.push(obj);
      });

      //  console.log(Piedata);

      return (
        <div className="content-wrapper">
          {/* <!-- Content Header (Page header) --> */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0 text-dark">Dashboard</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Dashboard</li>
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
                <div className="col-md-4">
                  <div className="card p-4">
                    <h3 className="card-title text-center">What service are you looking for?</h3>
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <p className="text-center text-muted">Make a request and receive offers from qualified artisans</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col text-center">
                          <div className="icon p-3">
                            <i className="fa fa-tasks fa-lg text-warning" style={{ fontSize: "50px" }}></i>
                          </div>
                          <Link to="/search" className="btn btn-success p-2 ">Request a service</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card p-4">
                    <div className="card-body">
                      <div className="row">
                        <div className="col text-center">
                          <div className="icon p-3">
                            <i className="fa fa-bell-slash fa-lg text-muted" style={{ fontSize: "50px" }}></i>
                          </div>
                          <p className="text-muted ">No notifications</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /.container-fluid --> */}
          </section>
          {/* <!-- /.content --> */}
        </div>
      );
    } else return <Spinner />;
  }
}

DashboardContent.propTypes = {
  firestore: PropTypes.object.isRequired,
  orders: PropTypes.array,
  firebase: PropTypes.object.isRequired,
};

export default compose(
  firestoreConnect([{ collection: "orders" }]),
  firebaseConnect(),
  connect((state, props) => ({
    orders: state.firestore.ordered.orders,
  }))
)(DashboardContent);
