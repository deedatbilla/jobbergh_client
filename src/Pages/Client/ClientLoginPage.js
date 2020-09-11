import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { notifyUser } from "../../actions/notifyActions";
import { Link } from "react-router-dom";
// import HomeHeader from "./Layouts/Hompage/HomeHeader";
import Alert from "../../Components/Common/Alert";

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    loading: false,
  };
  signInWithGoogle = (e) => {
    e.preventDefault();
    const { firebase, notifyUser } = this.props;
    
      firebase
        .login({
          provider: "google",
          type: "popup",
        }).then(data=>{
          console.log(data)
        })
        .catch((err) => notifyUser(err.message, "error"));
    
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;
    try {
      await firebase.login({
        email,
        password,
      });

      this.setState({ loading: false });
    } catch (error) {
      notifyUser(error.message, "error");
      this.setState({ loading: false });
    }
  };
  render() {
    const { message, messageType } = this.props.notify;
    const { email, password, loading } = this.state;
    return (
      <div className="">
        {/* <Header/> */}
        <section class="wide-tb-100 bg-fixed free-quote free-quote-alt pb-0">
          <div class="container">
            <div class="row">
              <div class="col-lg-5 col-md-7">
                <div class="free-quote-form">
                  {/* <!-- Heading Main --> */}
                  <h1 class="heading-main mb-4">
                    <span>Welcome </span>
                    <span>Log into </span>
                    Your account
                  </h1>
                  {/* <!-- Heading Main --> */}
                  {message ? <Alert message={message} messageType={messageType} /> : null}
                  {/* <!-- Free Quote From --> */}
                  <form onSubmit={this.onSubmit}>
                    <div class="form-row mb-4">
                      <input
                        type="email"
                        name="email"
                        value={email}
                        required
                        onChange={this.onChange}
                        class="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div class="form-row mb-4">
                      <input
                        type="password"
                        required
                        onChange={this.onChange}
                        value={password}
                        name="password"
                        class="form-control"
                        placeholder="Password"
                      />
                    </div>
                    <div className="row">
                      <div className="col-12 text-center">
                        <div class="form-group">
                          <button type="submit" class="form-btn mx-auto btn btn-warning bg-orange">
                            {!this.state.loading ? (
                              <span>
                                Login <i class="icofont-rounded-right"></i>
                              </span>
                            ) : (
                              <span>logging in...</span>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-center">
                        <span>Are you an artisan ?</span>
                        <a href="https://artisan.jobbergh.com"  className="ml-1">
                          Login here
                        </a>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-center">
                        <span>Dont have an account?</span>
                        <Link to="/client/register" className="ml-1">
                          Register
                        </Link>
                      </div>
                    </div>
                    <div className="social-auth-links text-center mb-3">
                      <p>- OR -</p>
                      {/* <a href="#" className="btn btn-block btn-primary">
                  <i className="fab fa-facebook mr-2"></i> Sign in using Facebook
                </a> */}
                      <a href="#!" onClick={this.signInWithGoogle} className="btn btn-block text-white" style={{backgroundColor:"#d34836"}}>
                        <i className="fab fa-google-plus mr-2 text-white"></i> Sign in using Google+
                      </a>
                    </div>
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

LoginPage.propTypes = {
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
)(LoginPage);
