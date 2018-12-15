import React from 'react';
import {connect} from "react-redux";

import GroupsHeader from './GroupsHeader';
import GroupsList from './GroupsList';

import './GroupsListContainer.css';

class GroupsListContainer extends React.Component {
  render() {
    return (
      <main>
        <GroupsHeader/>
        <GroupsList/>
      </main>
    );
  }
}

export default connect()(GroupsListContainer);
