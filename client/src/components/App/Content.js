import React from 'react';
import {connect} from "react-redux";
import {Route, Switch} from 'react-router';

import Home from '../Home/Home';
import GroupsListContainer from '../Groups/list/GroupsListContainer';

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
        <div className="content__container">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/cards/groups" component={GroupsListContainer}/>
            <Route component={NoMatch}/>
          </Switch>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({...state.router});

export default connect(mapStateToProps)(Content);
