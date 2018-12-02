import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeFromLanguageMenuVisibility, changeToLanguageMenuVisibility} from '../../../actions/groupsHeaderActions';

import './GroupsHeader.css';

class GroupsHeader extends React.Component {
  renderLanguageItems(isFromLanguageMenu) {
    return Object.keys(this.props.meta.languages).map((key => {
      let cssClasses = 'groups-header__languages-menu-item';

      if (isFromLanguageMenu && this.props.selectedFromLanguage === key) {
        cssClasses = `${cssClasses} groups-header__languages-menu-item_active`;
      } else if (!isFromLanguageMenu && this.props.selectedToLanguage === key) {
        cssClasses = `${cssClasses} groups-header__languages-menu-item_active`;
      }

      return (
        <div key={key} className={cssClasses}>
          <span className="groups-header__languages-menu-item-name">
            {this.props.meta.languages[key]}
          </span>
          <span className="groups-header__languages-menu-item-code">{key}</span>
        </div>
      )
    }));
  }

  render() {
    return (
      <header className="groups-header">
        <span>My Vocabulary</span>
        <div className="groups-header__language-selector">
          <button className="groups-header__button-language"
                  onClick={this.props.changeFromLanguageMenuVisibility}>
            {this.props.selectedFromLanguage}
          </button>
          <div className="groups-header__languages-menu"
               style={this.props.isFromLanguageMenuVisible ? {} : {display: 'none'}}>
            {this.renderLanguageItems(true)}
          </div>
        </div>
        <span> – </span>
        <div className="groups-header__language-selector">
          <button className="groups-header__button-language"
                  onClick={this.props.changeToLanguageMenuVisibility}>
            {this.props.selectedToLanguage}
          </button>
          <div className="groups-header__languages-menu"
               style={this.props.isToLanguageMenuVisible ? {} : {display: 'none'}}>
            {this.renderLanguageItems(false)}
          </div>
        </div>
      </header>
    )
  }
}

const mapStateToProps = state => ({...state.groups});

const mapDispatchToProps = dispatch => {
  const functions = {
    changeFromLanguageMenuVisibility,
    changeToLanguageMenuVisibility
  };
  return bindActionCreators(functions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsHeader);
