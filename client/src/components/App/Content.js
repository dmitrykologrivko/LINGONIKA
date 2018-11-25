import React from 'react';
import {connect} from "react-redux";
import {Route, Switch} from 'react-router';

import Home from '../Home/Home';
import GroupsList from '../Cards/GroupsList';

import './Content.css';

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
      <section className="content">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/cards/groups" component={GroupsList}/>
          <Route component={NoMatch}/>
        </Switch>
      </section>
    )
  }
}

const mapStateToProps = state => ({...state.router});

export default connect(mapStateToProps)(Content);
