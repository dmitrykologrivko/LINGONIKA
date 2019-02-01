import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import './AccountView.css';
import avatar from '../../App/avatar.png';

class AccountView extends React.Component {
  render() {
    return (
      <div className="account-view">
        <div>
          <div className="account-view__avatar-wrapper">
            <img className="account-view__avatar" src={avatar} alt="avatar"/>
          </div>
          <div className="account-view__personal-info">
            <p>
              <span className="account-view__name-label">Dmitry Kologrivko</span><br/>
              <span className="account-view__age-label">Male, 25</span>
            </p>
            <p>
              <Link to="/account/edit" className="account-view__edit-link">Edit Profile</Link>
            </p>
            <p>
              <span className="account-view__email-label">dmitrykologrivko@gmail.com</span>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(AccountView);
