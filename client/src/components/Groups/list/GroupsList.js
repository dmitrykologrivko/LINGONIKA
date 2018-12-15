import React from 'react';
import {connect} from 'react-redux';

import Group from './Group';
import CommonGroup from './CommonGroup';
import CreateGroupBox from './CreateGroupBox';

import './GroupsList.css';

class GroupsList extends React.Component {
  render() {
    const groups = this.props.list.map(group => {
      return (
        <div key={group.id} className="groups-list_item">
          <Group group={group}/>
        </div>
      );
    });

    return (
      <section className="groups-list">
        <div className="groups-list_item">
          <CommonGroup/>
        </div>
        {groups}
        <div className="groups-list_item">
          <CreateGroupBox/>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({...state.groups});

export default connect(mapStateToProps)(GroupsList);
