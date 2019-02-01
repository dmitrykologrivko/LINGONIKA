import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import './ProfileView.css';
import avatar from '../../App/avatar.png';

class ProfileView extends React.Component {
  render() {
    return (
      <div className="profile-view">
        <div>
          <div className="profile-view__avatar-wrapper">
            <img className="profile-view__avatar" src={avatar} alt="avatar"/>
          </div>
          <div className="profile-view__personal-info">
            <p>
              <span className="profile-view__name-label">Dmitry Kologrivko</span><br/>
              <span className="profile-view__age-label">Male, 25</span>
            </p>
            <p>
              <Link to="/profile/edit" className="profile-view__edit-link">Edit Profile</Link>
            </p>
            <p>
              <span className="profile-view__email-label">dmitrykologrivko@gmail.com</span>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(ProfileView);
