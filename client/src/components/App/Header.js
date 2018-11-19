import React from 'react';
import './Header.css';
import avatar from './avatar.png'

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="header__container">
          <div className="header__logo">
            <a href="#" className="header__logo-link font_bold">LINGONIKA</a>
          </div>
          <div className="header__nav-wrapper">
            <nav className="header__nav">
              <div className="header__nav-item header__nav-item_active">
                <a href="#" className="header__nav-link font_bold">Cards</a>
              </div>
              <div className="header__nav-item">
                <a href="#" className="header__nav-link font_bold">Community</a>
              </div>
            </nav>
          </div>
          <div className="header__profile">
            <a className="header__profile-link" href="#">
              <img className="header__profile-avatar" src={avatar} />
              <span className="header__profile-name">Dmitry Kologrivko</span>
            </a>
            <span className="header__profile-more-button fas fa-caret-down"/>
            <div className="header__profile-nav-wrapper">
              <nav className="header__profile-nav">
                <a className="header__profile-nav-item header__profile-nav-item_active" href="#">Profile</a>
                <a className="header__profile-nav-item" href="#">Sign Out</a>
              </nav>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;
