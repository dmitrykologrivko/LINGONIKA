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
        <div className="groups-list_item">
          <CommonGroup/>
        </div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => <div className="groups-list_item"><Group/></div>)}
        <div className="groups-list_item">
          <CreateGroupBox/>
        </div>
      </section>
    );
  }
}

export default connect()(GroupsList);
