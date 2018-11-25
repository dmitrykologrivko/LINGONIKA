import React from 'react';
import {connect} from "react-redux";

class GroupsList extends React.Component {
  render() {
    return (
      <div>Groups list</div>
    );
  }
}

export default connect()(GroupsList);
