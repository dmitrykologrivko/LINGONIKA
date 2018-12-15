import React from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';

import './Header.css';
import avatar from './avatar.png';

class Header extends React.Component {
  state = {
    isProfileMenuVisible: false
  };

  render() {
    return (
      <header className="header">
        <div className="header__container">
          <div className="header__logo">
            <Link to="/" className="header__logo-link font_bold">LINGONIKA</Link>
          </div>
          <div className="header__nav-wrapper">
            <nav className="header__nav">
              <div className="header__nav-item header__nav-item_active">
                <Link to="/cards/groups" className="header__nav-link font_bold">Cards</Link>
              </div>
              <div className="header__nav-item">
                <Link to="/community" className="header__nav-link font_bold">Community</Link>
              </div>
            </nav>
          </div>
          <div className="header__profile">
            <a className="header__profile-link" href="#">
              <img className="header__profile-avatar" src={avatar}/>
              <span className="header__profile-name">Dmitry Kologrivko</span>
            </a>
            <span className="header__profile-more-button fas fa-caret-down"
                  onClick={this.onProfileMoreButtonClick.bind(this)}/>
            <div className="header__profile-nav-wrapper"
                 style={this.state.isProfileMenuVisible ? {} : {display: 'none'}}>
              <nav className="header__profile-nav">
                <a className="header__profile-nav-item" href="#">Profile</a>
                <a className="header__profile-nav-item" href="#">Sign Out</a>
              </nav>
            </div>
          </div>
        </div>
      </header>
    )
  }

  onProfileMoreButtonClick() {
    this.setState({
      ...this.state,
      isProfileMenuVisible: !this.state.isProfileMenuVisible
    });
  }
}

export default connect()(Header);
