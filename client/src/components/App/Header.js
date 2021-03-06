import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';

import './Header.css';
import avatar from './avatar.png';

class Header extends React.Component {
  state = {
    isProfileMenuVisible: false
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside.bind(this));
  }

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
            <Link to="/account" className="header__profile-link">
              <img className="header__profile-avatar" src={avatar} alt="avatar"/>
              <span className="header__profile-name">Dmitry Kologrivko</span>
            </Link>
            <span className="header__profile-more-button fas fa-caret-down"
                  onClick={this.onProfileMoreButtonClick.bind(this)}/>
            <div className="header__profile-nav-wrapper"
                 style={this.state.isProfileMenuVisible ? {} : {display: 'none'}}>
              <nav className="header__profile-nav">
                <Link to="/profile" className="header__profile-nav-item">Profile</Link>
                <a className="header__profile-nav-item" href="sign-out">Sign Out</a>
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

  handleClickOutside(event) {
    const node = ReactDOM.findDOMNode(this);

    if (!node || !node.contains(event.target)) {
      this.setState({
        ...this.state,
        isProfileMenuVisible: false
      });
    }
  }
}

export default connect()(Header);
