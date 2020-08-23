import React from "react";
import Spinner from "../Components/Common/Spinner";
import avatar from '../images/avatar.webp';

const ProfileContent = (props) => {
  if (props.firebase) {
    const user = props.firebase.auth().currentUser;
    const { email, name, newpass, confirm } = props.details;
    const { onChange,onSubmit } = props;
    return (
      <div className="content-wrapper">
        {/* <!-- Content Header (Page header) --> */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Profile</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Profile</li>
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
              <div class="col mb-3">
                <div class="card">
                  <div class="card-body">
                    <div class="e-profile">
                      <div class="row">
                        <div class="col-12 col-sm-auto mb-3">
                          <div class="mx-auto" style={{ width: "140px" }}>
                          <img class="profile-user-img img-fluid img-circle" src={avatar} alt="User profile picture" />
                          </div>
                        </div>
                        <div class="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                          <div class="text-center text-sm-left mb-2 mb-sm-0">
                            <h4 class="pt-sm-2 pb-1 mb-0 text-nowrap">{name}</h4>

                            <div class="mt-2">
                              <button class="btn btn-primary" type="button">
                                <i class="fa fa-fw fa-camera"></i>
                                <span>Change Photo</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ul class="nav nav-tabs">
                        <li class="nav-item">
                          <a href="" class="active nav-link">
                            Settings
                          </a>
                        </li>
                      </ul>
                      <div class="tab-content pt-3">
                        <div class="tab-pane active">
                          <form class="form" onSubmit={onSubmit}>
                            <div class="row">
                              <div class="col">
                                <div class="row">
                                  <div class="col">
                                    <div class="form-group">
                                      <label>Full Name</label>
                                      <input
                                        class="form-control"
                                        type="text"
                                        name="name"
                                        placeholder="Full name"
                                        value={name}
                                        required
                                        onChange={onChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col">
                                    <div class="form-group">
                                      <label>Email</label>
                                      <input
                                        class="form-control"
                                        value={email}
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        required
                                        disabled
                                        // onChange={onChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-12 col-sm-6 mb-3">
                                <div class="mb-2">
                                  <b>Change Password</b>
                                </div>

                                <div class="row">
                                  <div class="col">
                                    <div class="form-group">
                                      <label>Old Password</label>
                                      <input
                                        class="form-control"
                                        type="password"
                                        name="oldpass"
                                        placeholder="••••••"
                                        onChange={onChange}
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div class="row">
                                  <div class="col">
                                    <div class="form-group">
                                      <label>New Password</label>
                                      <input
                                        class="form-control"
                                        type="password"
                                        name="newpass"
                                        placeholder="••••••"
                                        
                                        onChange={onChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col">
                                    <div class="form-group">
                                      <label>
                                        Confirm <span class="d-none d-xl-inline">Password</span>
                                      </label>
                                      <input
                                        class="form-control"
                                        name="confirm"
                                        type="password"
                                        placeholder="••••••"
                                        
                                        onChange={onChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                            </div>
                            <div class="row">
                              <div class="col d-flex justify-content-end">
                                <button class="btn btn-primary" type="submit">
                                  Save Changes
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default ProfileContent;
