import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {
  selectFromLanguage,
  selectToLanguage,
  fetchGroupsData
} from '../../../actions/groupsActions';

import './GroupsHeader.css';

class GroupsHeader extends React.Component {
  state = {
    isFromLanguageMenuVisible: false,
    isToLanguageMenuVisible: false
  };

  render() {
    return (
      <header className="groups-header">
        <span>My Vocabulary</span>
        <div className="groups-header__language-selector">
          <button className="groups-header__button-language"
                  onClick={this.onFromLanguageButtonClick.bind(this)}>
            {this.props.filters.fromLanguage}
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
            {this.props.filters.toLanguage}
          </button>
          <div className="groups-header__languages-menu"
               style={this.state.isToLanguageMenuVisible ? {} : {display: 'none'}}>
            {this.renderLanguageItems(false)}
          </div>
        </div>
      </header>
    )
  }

  renderLanguageItems(isFromLanguageMenu) {
    return Object.keys(this.props.meta.languages).map((key => {
      let cssClasses = 'groups-header__languages-menu-item';

      if (isFromLanguageMenu && this.props.filters.fromLanguage === key) {
        cssClasses = `${cssClasses} groups-header__languages-menu-item_active`;
      } else if (!isFromLanguageMenu && this.props.filters.toLanguage === key) {
        cssClasses = `${cssClasses} groups-header__languages-menu-item_active`;
      }

      let onLanguageItemClick = () => {
        if (isFromLanguageMenu) {
          this.props.selectFromLanguage(key);

          this.setState({
            ...this.state,
            isFromLanguageMenuVisible: !this.state.isFromLanguageMenuVisible
          });
        } else {
          this.props.selectToLanguage(key);

          this.setState({
            ...this.state,
            isToLanguageMenuVisible: !this.state.isToLanguageMenuVisible
          });
        }

        this.props.fetchGroupsData();
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

const mapStateToProps = state => ({...state.groups});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    selectFromLanguage,
    selectToLanguage,
    fetchGroupsData
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsHeader);
