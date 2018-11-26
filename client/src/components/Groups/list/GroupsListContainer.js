import React from 'react';
import {connect} from "react-redux";

import GroupsListHeader from './GroupsListHeader';
import GroupsList from './GroupsList';

import './GroupsListContainer.css';

class GroupsListContainer extends React.Component {
  render() {
    return (
      <main>
        <GroupsListHeader/>
        <GroupsList/>
      </main>
    );
  }
}

export default connect()(GroupsListContainer);
