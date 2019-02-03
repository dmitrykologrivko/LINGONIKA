import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import './AccountView.css';

class AccountView extends React.Component {
  render() {
    const account = this.props.account;

    return (
      <div className="account-view">
        <div>
          <div className="account-view__avatar-wrapper">
            <img className="account-view__avatar" src={account.avatar} alt="avatar"/>
          </div>
          <div className="account-view__personal-info">
            <p>
              <span className="account-view__name-label">
                {`${account.firstName} ${account.lastName}`}
              </span>
              <br/>
              <span className="account-view__age-label">
                {`${this.getGender(account.isMale)}, ${this.getAge(account.dateOfBirth)}`}
              </span>
            </p>
            <p>
              <Link to="/account/edit" className="account-view__edit-link">Edit Profile</Link>
            </p>
            <p>
              <span className="account-view__email-label">{account.email}</span>
            </p>
          </div>
        </div>
      </div>
    )
  }

  getGender(isMale = true) {
    return isMale ? 'Male' : 'Female';
  }

  getAge(dateOfBirth) {
    const oneYear = 1000 * 60 * 60 * 24 * 365;

    const now = new Date();
    dateOfBirth = new Date(dateOfBirth);

    return Math.round((now.getTime() - dateOfBirth.getTime()) / oneYear);
  }
}

const mapStateToProps = state => ({...state.account});

export default connect(mapStateToProps, null)(AccountView);
