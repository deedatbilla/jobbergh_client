import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { notifyUser } from "../../actions/notifyActions";
import { JOBBERGH_BASE_URL } from "../../config";
import axios from "axios";
import SecondaryHeader from '../../Components/SecondaryHeader';
// import { Link } from "react-router-dom";
// import HomeHeader from "./Layouts/Hompage/HomeHeader";
import Alert from "../../Components/Common/Alert";
// import { fn } from "admin-lte/plugins/moment/moment.min";

class ClientRegisterPage extends Component {
  state = {
    email: "",
    password: "",
    loading: false,
    fname: "",
    lname: "",
    confirm: "",
    agree: false,
    phone: "",
  };
  signInWithGoogle = (e) => {
    e.preventDefault();
    const { firebase, notifyUser } = this.props;
    if (this.state.agree) {
      firebase
        .login({
          provider: "google",
          type: "popup",
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => notifyUser(err.message, "error"));
    } else {
      notifyUser("You have to agree to our terms first", "error");
    }
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { firebase, notifyUser, firestore, history } = this.props;
    const { email, password, confirm: confirm, fname, lname, agree, phone } = this.state;
    try {
      if (password === confirm) {
        if (agree) {
          const userdata = { email, password, fname, lname, phone };

          const resp = await axios.post(`${JOBBERGH_BASE_URL}/api/register/client`, userdata);
          // history.push("/client/dashboard")
          await firebase.login({
            email,
            password,
          });
          console.log(resp.data);
        } else {
          notifyUser("You have to agree to out terms first", "error");
          this.setState({ loading: false });
        }
      } else {
        notifyUser("passwords do not match", "error");
        this.setState({ loading: false });
      }
    } catch (e) {
      notifyUser("User Already Exists", "error");
      this.setState({ loading: false });
    }
  };
  render() {
    const { message, messageType } = this.props.notify;
    const { email, password, loading, agree, fname, lname, confirm: confirm, phone } = this.state;
    return (
      <div className="">
        {/* <Header/> */}
        <SecondaryHeader auth={this.props.firebase.auth()} showSearch={false} />
        {/* //free-quote free-quote-alt pb-0 */}
        <section class="wide-tb-100 bg-fixed">
          <div class="container">
            <div class="row">
              <div class="col-lg-5 col-md-7">
                <div class="free-quote-form">
                  {/* <!-- Heading Main --> */}
                  <h1 class="heading-main mb-4">
                    <span>Register </span>
                    For free
                  </h1>
                  {/* <!-- Heading Main --> */}
                  {message ? <Alert message={message} messageType={messageType} /> : null}
                  {/* <!-- Free Quote From --> */}
                  <form onSubmit={this.onSubmit}>
                    <div class="form-row mb-4">
                      <input
                        type="text"
                        name="fname"
                        value={fname}
                        onChange={this.onChange}
                        class="form-control"
                        placeholder="First name"
                      />
                    </div>
                    <div class="form-row mb-4">
                      <input
                        type="text"
                        name="lname"
                        value={lname}
                        onChange={this.onChange}
                        class="form-control"
                        placeholder="Last name"
                      />
                    </div>
                    <div class="form-row mb-4">
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        class="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div class="form-row mb-4">
                      <input
                        type="text"
                        name="phone"
                        value={phone}
                        maxLength="10"
                        minLength="10"
                        onChange={this.onChange}
                        class="form-control"
                        placeholder="Phone number"
                      />
                    </div>
                    <div class="form-row mb-4">
                      <input
                        type="password"
                        onChange={this.onChange}
                        value={password}
                        name="password"
                        class="form-control"
                        placeholder="Password"
                      />
                    </div>
                    <div class="form-row mb-4">
                      <input
                        type="password"
                        onChange={this.onChange}
                        value={confirm}
                        name="confirm"
                        class="form-control"
                        placeholder="confirm password"
                      />
                    </div>
                    <div className="row">
                      <div className="col-8 text-left">
                        <div className="icheck-primary">
                          <input type="checkbox" id="agreeTerms" name="agree" value={agree} onChange={this.onChange} />
                          <label for="agreeTerms" className="ml-2">
                            I agree to the <a href="#">terms</a>
                          </label>
                        </div>
                      </div>
                      <div class="form-row text-center">
                        <button type="submit" class="btn btn-warning bg-orange text-white">
                          {!this.state.loading ? (
                            <span className="text-white">
                              Register <i class="icofont-rounded-right text-white"></i>
                            </span>
                          ) : (
                            <span>Registering...</span>
                          )}
                        </button>
                      </div>
                    </div>
                    {/* <div className="social-auth-links text-center mb-3">
                      <p>- OR -</p> */}
                    {/* <a href="#" className="btn btn-block btn-primary">
                  <i className="fab fa-facebook mr-2"></i> Sign in using Facebook
                </a> */}
                    {/* <a href="#!" onClick={this.signInWithGoogle} className="btn btn-block text-white" style={{backgroundColor:"#d34836"}}>
                        <i className="fab fa-google-plus mr-2 text-white"></i> Sign up using Google+
                      </a>
                    </div> */}
                  </form>
                  {/* <!-- Free Quote From --> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

ClientRegisterPage.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired,
};
export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify,
    }),
    { notifyUser }
  )
)(ClientRegisterPage);
