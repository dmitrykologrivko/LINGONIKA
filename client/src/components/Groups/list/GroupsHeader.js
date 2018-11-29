import React from 'react';
import {connect} from "react-redux";

import './GroupsHeader.css';

class GroupsHeader extends React.Component {
  render() {
    console.log(this.props.meta);

    const languages = Object.keys(this.props.meta.languages).map((key =>
        <div className="groups-header__languages-menu-item groups-header__languages-menu-item_active">
          <span className="groups-header__languages-menu-item-name">
            {this.props.meta.languages[key]}
          </span>
          <span className="groups-header__languages-menu-item-code">{key}</span>
        </div>
    ));

    return (
      <header className="groups-header">
        <span>My Vocabulary</span>
        <div className="groups-header__language-selector">
          <button className="groups-header__button-language">{this.props.selectedFromLanguage}</button>
          <div className="groups-header__languages-menu">
            {languages}
          </div>
        </div>
        <span> – </span>
        <div className="groups-header__language-selector">
          <button className="groups-header__button-language">{this.props.selectedToLanguage}</button>
          <div className="groups-header__languages-menu">
            {languages}
          </div>
        </div>
      </header>
    )
  }
}

const mapStateToProps = state => ({...state.groups});

export default connect(mapStateToProps)(GroupsHeader);
