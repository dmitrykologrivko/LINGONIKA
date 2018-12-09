import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {
  changeFromLanguageMenuVisibility,
  changeToLanguageMenuVisibility,
  changeSelectedFromLanguage,
  changeSelectedToLanguage
} from '../../../actions/groupsActions';

import './GroupsHeader.css';

class GroupsHeader extends React.Component {
  renderLanguageItems(isFromLanguageMenu) {
    return Object.keys(this.props.languages).map((key => {
      let cssClasses = 'groups-header__languages-menu-item';

      if (isFromLanguageMenu && this.props.selectedFromLanguage === key) {
        cssClasses = `${cssClasses} groups-header__languages-menu-item_active`;
      } else if (!isFromLanguageMenu && this.props.selectedToLanguage === key) {
        cssClasses = `${cssClasses} groups-header__languages-menu-item_active`;
      }

      let onLanguageItemClick;

      if (isFromLanguageMenu) {
        onLanguageItemClick = this.props.changeSelectedFromLanguage.bind(this, key);
      } else {
        onLanguageItemClick = this.props.changeSelectedToLanguage.bind(this, key);
      }

      return (
        <div key={key} className={cssClasses} onClick={onLanguageItemClick}>
          <span className="groups-header__languages-menu-item-name">
            {this.props.languages[key]}
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

const mapStateToProps = state => ({...state.groups.meta, ...state.groups.groupsHeader});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    changeFromLanguageMenuVisibility,
    changeToLanguageMenuVisibility,
    changeSelectedFromLanguage,
    changeSelectedToLanguage
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsHeader);
