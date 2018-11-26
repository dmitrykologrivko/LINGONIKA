import React from 'react';
import {connect} from 'react-redux';

import Group from './Group';
import CommonGroup from './CommonGroup';
import CreateGroupBox from './CreateGroupBox';

import './GroupsList.css';

class GroupsList extends React.Component {
  render() {
    return (
      <section className="groups-list">
        <CommonGroup/>
        <Group/>
        <CreateGroupBox/>
      </section>
    );
  }
}

export default connect()(GroupsList);
