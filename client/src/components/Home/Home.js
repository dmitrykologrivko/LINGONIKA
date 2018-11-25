import React from 'react';
import {connect} from "react-redux";

class Home extends React.Component {
  render() {
    return (
      <div>Home page</div>
    )
  }
}

export default connect()(Home);
