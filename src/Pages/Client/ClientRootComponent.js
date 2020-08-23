import React, { Component } from "react";

import { UserIsAuthenticated, UserIsNotAuthenticated } from "../../helpers/ClientAuthHelper";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "../";
import ClientLoginPage from './ClientLoginPage';
import ClientRegisterPage from './ClientRegisterPage';
import ClientDashboard from './ClientDashboard';
import SearchArtisanPage from './SearchArtisanPage';
import ServiceInfoPage from './ServiceInfoPage';
class ClientRootComponent extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch >
            <Route exact path="/" component={HomePage} />
            <Route exact path="/client/login" component={UserIsNotAuthenticated(ClientLoginPage)} />
            <Route exact path="/client/register" component={UserIsNotAuthenticated(ClientRegisterPage)} />
            <Route exact path="/client/dashboard" component={UserIsAuthenticated(ClientDashboard)} />
            {/* <Route exact path="/search/:artisan" component={UserIsAuthenticated(SearchArtisanPage)} /> */}
            <Route exact path="/search/:artisan" component={SearchArtisanPage} />
            <Route exact path="/search" component={SearchArtisanPage} />
            
            <Route exact path="/service/:data" component={ServiceInfoPage} />
           
          </Switch>
        </Router>
      </div>
    );
  }
}

export default ClientRootComponent;
