import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { store, rrfProps } from "./store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/base.css";
import "./rev-slider/revolution/fonts/pe-icon-7-stroke/css/pe-icon-7-stroke.css";
import "./rev-slider/revolution/fonts/font-awesome/css/font-awesome.css";
import "./rev-slider/revolution/css/settings.css";
import "./rev-slider/revolution/css/layers.css";
import "./rev-slider/revolution/css/navigation.css";
import "admin-lte/dist/css/adminlte.min.css";
import "admin-lte/plugins/summernote/summernote-bs4.min.css";
import "admin-lte/plugins/daterangepicker/daterangepicker.css";
import "admin-lte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css";
import "admin-lte/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css";
import "admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css";
import "admin-lte/plugins/chart.js/Chart.min.js";
import "admin-lte/plugins/moment/moment.min.js";
import NotFound from './Pages/NotFound';
import ClientRootComponent from "./Pages/Client/ClientRootComponent";
function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <div className="App">
        
         <ClientRootComponent/>
          {/* <Router>
        
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/artisan" component={ArtisanRootComponent} />
            <Route exact path="" component={NotFound} />
          </Switch>
        
      </Router> */}
        </div>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
