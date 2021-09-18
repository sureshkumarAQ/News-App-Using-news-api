import "./App.css";

import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
export default class App extends Component {
  c = "Suresh";
  render() {
    return (
      <div>
        <Router>
          <Navbar />

          <Switch>
            <Route exact path="/">
              <News pageSize={9} key=" general" category="general" />
            </Route>
            <Route exact path="/business">
              <News pageSize={9} key=" business" category="business" />
            </Route>
            <Route exact path="/entertainment">
              <News
                pageSize={9}
                key=" entertainment"
                category="entertainment"
              />
            </Route>
            <Route exact path="/health">
              <News pageSize={9} key="health " category="health" />
            </Route>
            <Route exact path="/science">
              <News pageSize={9} key=" science" category="science" />
            </Route>
            <Route exact path="/sports">
              <News pageSize={9} key=" sports" category="sports" />
            </Route>
            <Route exact path="/technology">
              <News pageSize={9} key="technology " category="technology" />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
