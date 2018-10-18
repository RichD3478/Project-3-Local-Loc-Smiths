import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LocsSmiths from "./pages/LocsSmiths";
import NoMatch from "./pages/NoMatch";

const App = () => (
  <Router>
    <div>
      
      <Switch>
        <Route exact path="/" component={LocsSmiths} />
        <Route exact path="/locsSmiths" component={LocsSmiths} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;