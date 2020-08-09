import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { notifyUser } from "../../actions/notifyActions";
import { Link } from "react-router-dom";
// import HomeHeader from "./Layouts/Hompage/HomeHeader";
import Alert from "../../Components/Common/Alert";
import { fn } from "admin-lte/plugins/moment/moment.min";

class ClientRegisterPage extends Component {
  state = {
    email: "",
    password: "",
    loading: false,
    fname: "",
    lname: "",
    comfirm: "",
    agree: false,
  };
  signInWithGoogle = (e) => {
    e.preventDefault();
    const { firebase, notifyUser } = this.props;
    if (this.state.agree) {
      firebase
        .login({
          provider: "google",
          type: "popup",
        }).then(data=>{
          console.log(data)
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
    const { firebase, notifyUser, firestore } = this.props;
    const { email, password, comfirm, fname, lname, agree } = this.state;
    if (password === comfirm) {
      if (agree) {
        firebase
          .createUser({
            email,
            password,
            displayName: `${fname} ${lname}`,
          })
          .then((data) => {
            // firestore.set({collection:"clients",doc:data.uid})
            console.log(data);
          })
          .catch((err) => {
            notifyUser("User Already Exists", "error");
            this.setState({ loading: false });
          });
      } else {
        notifyUser("You have to agree to out terms first", "error");
        this.setState({ loading: false });
      }
    } else {
      notifyUser("passwords do not match", "error");
      this.setState({ loading: false });
    }
  };
  render() {
    const { message, messageType } = this.props.notify;
    const { email, password, loading, agree, fname, lname, comfirm } = this.state;
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
                    <span>Log into </span>
                    Your account
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
                        type="text"
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        class="form-control"
                        placeholder="Email"
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
                        value={comfirm}
                        name="comfirm"
                        class="form-control"
                        placeholder="Comfirm password"
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
                    <div className="social-auth-links text-center mb-3">
                      <p>- OR -</p>
                      {/* <a href="#" className="btn btn-block btn-primary">
                  <i className="fab fa-facebook mr-2"></i> Sign in using Facebook
                </a> */}
                      <a href="#!" onClick={this.signInWithGoogle} className="btn btn-block text-white" style={{backgroundColor:"#d34836"}}>
                        <i className="fab fa-google-plus mr-2 text-white"></i> Sign up using Google+
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
