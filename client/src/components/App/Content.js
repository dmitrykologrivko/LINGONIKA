import React from 'react';
import {connect} from "react-redux";
import {Route, Switch} from 'react-router';

import Home from '../Home/Home';
import GroupDetailContainer from '../Groups/detail/GroupDetailContainer';
import GroupsListContainer from '../Groups/list/GroupsListContainer';
import AccountViewContainer from '../Account/view/AccountViewContainer';

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
            <Route exact path="/cards/groups" component={GroupsListContainer}/>
            <Route exact path="/cards/groups/:id" component={GroupDetailContainer}/>
            <Route exact path="/account" component={AccountViewContainer}/>
            <Route component={NoMatch}/>
          </Switch>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({...state.router});

export default connect(mapStateToProps)(Content);
