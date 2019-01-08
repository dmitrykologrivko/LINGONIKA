import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";

import GroupsHeader from './GroupsHeader';
import GroupsList from './GroupsList';
import {fetchGroups, fetchGroupsMeta} from "../../../actions/groupsActions";

import './GroupsListContainer.css';

class GroupsListContainer extends React.Component {
  componentDidMount() {
    this.props.fetchGroups();
    this.props.fetchGroupsMeta();
  }

  render() {
    return (
      <main>
        <GroupsHeader/>
        <GroupsList/>
      </main>
    );
  }
}

const mapStateToProps = state => ({...state.groups});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchGroups,
    fetchGroupsMeta
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsListContainer);
