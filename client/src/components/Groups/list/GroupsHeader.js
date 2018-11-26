import React from 'react';
import {connect} from "react-redux";

import './GroupsHeader.css';

class GroupsHeader extends React.Component {
  render() {
    return (
      <header className="groups-header">
        <span>My Vocabulary</span>
        <div className="groups-header__language-selector">
          <button className="groups-header__button-language">en</button>
          <div className="groups-header__languages-menu">
            <div className="groups-header__languages-menu-item groups-header__languages-menu-item_active">
              <span className="groups-header__languages-menu-item-name">English</span>
              <span className="groups-header__languages-menu-item-code">en</span>
            </div>
            <div className="groups-header__languages-menu-item">
              <span className="groups-header__languages-menu-item-name">German</span>
              <span className="groups-header__languages-menu-item-code">gr</span>
            </div>
          </div>
        </div>
        <span> – </span>
        <div className="groups-header__language-selector">
          <button className="groups-header__button-language">ru</button>
          <div className="groups-header__languages-menu">
            <div className="groups-header__languages-menu-item groups-header__languages-menu-item_active">
              <span className="groups-header__languages-menu-item-name">English</span>
              <span className="groups-header__languages-menu-item-code">en</span>
            </div>
            <div className="groups-header__languages-menu-item">
              <span className="groups-header__languages-menu-item-name">German</span>
              <span className="groups-header__languages-menu-item-code">gr</span>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default connect()(GroupsHeader);
