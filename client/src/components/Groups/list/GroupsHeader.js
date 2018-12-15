import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {
  changeSelectedFromLanguage,
  changeSelectedToLanguage
} from '../../../actions/groupsActions';

import './GroupsHeader.css';

class GroupsHeader extends React.Component {
  state = {
    isFromLanguageMenuVisible: false,
    isToLanguageMenuVisible: false
  };

  renderLanguageItems(isFromLanguageMenu) {
    return Object.keys(this.props.meta.languages).map((key => {
      let cssClasses = 'groups-header__languages-menu-item';

      if (isFromLanguageMenu && this.props.selectedFromLanguage === key) {
        cssClasses = `${cssClasses} groups-header__languages-menu-item_active`;
      } else if (!isFromLanguageMenu && this.props.selectedToLanguage === key) {
        cssClasses = `${cssClasses} groups-header__languages-menu-item_active`;
      }

      let onLanguageItemClick = () => {
        if (isFromLanguageMenu) {
          // Change selected language globally
          this.props.changeSelectedFromLanguage(key);
          // Change internal flag
          this.setState({
            ...this.state,
            isFromLanguageMenuVisible: !this.state.isFromLanguageMenuVisible
          });
        } else {
          // Change selected language globally
          this.props.changeSelectedToLanguage(key);
          // Change internal flag
          this.setState({
            ...this.state,
            isToLanguageMenuVisible: !this.state.isToLanguageMenuVisible
          });
        }
      };

      return (
        <div key={key} className={cssClasses} onClick={onLanguageItemClick.bind(this)}>
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
                  onClick={this.onFromLanguageButtonClick.bind(this)}>
            {this.props.selectedFromLanguage}
          </button>
          <div className="groups-header__languages-menu"
               style={this.state.isFromLanguageMenuVisible ? {} : {display: 'none'}}>
            {this.renderLanguageItems(true)}
          </div>
        </div>
        <span> – </span>
        <div className="groups-header__language-selector">
          <button className="groups-header__button-language"
                  onClick={this.onToLanguageButtonClick.bind(this)}>
            {this.props.selectedToLanguage}
          </button>
          <div className="groups-header__languages-menu"
               style={this.state.isToLanguageMenuVisible ? {} : {display: 'none'}}>
            {this.renderLanguageItems(false)}
          </div>
        </div>
      </header>
    )
  }

  onFromLanguageButtonClick() {
    this.setState({
      ...this.state,
      isFromLanguageMenuVisible: !this.state.isFromLanguageMenuVisible
    });
  }

  onToLanguageButtonClick() {
    this.setState({
      ...this.state,
      isToLanguageMenuVisible: !this.state.isToLanguageMenuVisible
    });
  }
}

const mapStateToProps = state => ({...state.groups.groups});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    changeSelectedFromLanguage,
    changeSelectedToLanguage
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsHeader);
