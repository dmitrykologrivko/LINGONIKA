import React from 'react';
import {connect} from "react-redux";
import { Route, Switch } from 'react-router';
import {ConnectedRouter} from 'connected-react-router';
import { Link } from 'react-router-dom';

import './Content.css';

// TODO: Remove this hardcoded component
class Home extends React.Component {
  render() {
    return (
      <div>
        Content page
        <Link to="/about">About page</Link>
      </div>
    );
  }
}

// TODO: Remove this hardcoded component
class About extends React.Component {
  render() {
    return (
      <div>
        About page
      </div>
    );
  }
}

// TODO: Remove this hardcoded component
class NoMatch extends React.Component {
  render() {
    return (
      <div>
        404 page not found
      </div>
    );
  }
}

class Content extends React.Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <Switch>
          {/* TODO: Change hardcoded routes */}
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route component={NoMatch}/>
        </Switch>
      </ConnectedRouter>
    )
  }
}

export default connect()(Content);
