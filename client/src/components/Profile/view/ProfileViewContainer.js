import React from 'react';
import {connect} from "react-redux";

import ProfileView from "./ProfileView";

class ProfileViewContainer extends React.Component {
  render() {
    return (
      <main className="wide-main">
        <ProfileView/>
      </main>
    )
  }
}

export default connect()(ProfileViewContainer);
