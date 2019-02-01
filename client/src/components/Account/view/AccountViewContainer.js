import React from 'react';
import {connect} from "react-redux";

import AccountView from "./AccountView";

class AccountViewContainer extends React.Component {
  render() {
    return (
      <main className="wide-main">
        <AccountView/>
      </main>
    )
  }
}

export default connect()(AccountViewContainer);
