import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import AccountView from "./AccountView";
import {fetchAccount} from '../../../actions/accountActions';

class AccountViewContainer extends React.Component {
  componentDidMount() {
    this.props.fetchAccount();
  }

  render() {
    return (
      <main className="wide-main">
        <AccountView/>
      </main>
    )
  }
}

const mapStateToProps = state => ({...state.account});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({fetchAccount}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountViewContainer);
