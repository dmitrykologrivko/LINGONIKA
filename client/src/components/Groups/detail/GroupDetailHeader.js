import React from 'react';
import {connect} from 'react-redux';

import './GroupDetailHeader.css';

const ALL_WORDS_FILTER = 'ALL_WORDS_FILTER';
const LEARNED_WORDS_FILTER = 'LEARNED_WORDS_FILTER';

class GroupDetailHeader extends React.Component {
  state = {
    selectedFilter: ALL_WORDS_FILTER
  };

  render() {
    return (
      <header className="cards-header">
        <h3 className="cards-header__group_name">{this.props.group.name}</h3>
        <nav className="cards-header__nav">
          {this.state.selectedFilter === ALL_WORDS_FILTER ? (
            <span className="cards-header__nav-selected-item">All</span>
          ) : (
            <button className="cards-header__button-all-cards"
                    onClick={this.onAllCardsButtonClick.bind(this)}>All</button>
          )}

          {this.state.selectedFilter === LEARNED_WORDS_FILTER ? (
            <span className="cards-header__nav-selected-item">Learned</span>
          ) : (
            <button className="cards-header__button-learned-cards"
                    onClick={this.onLearnedWordsButtonClick.bind(this)}>Learned</button>
          )}
          <button className="cards-header__button-add-card">
            <span className="cards-header__button-add-card-icon fas fa-plus"/>
            <span className="cards-header__button-add-card-label">Add Card</span>
          </button>
        </nav>
      </header>
    )
  }

  onAllCardsButtonClick() {
    this.setState({
      ...this.state,
      selectedFilter: ALL_WORDS_FILTER
    });
  }

  onLearnedWordsButtonClick() {
    this.setState({
      ...this.state,
      selectedFilter: LEARNED_WORDS_FILTER
    });
  }
}

const mapStateToProps = state => ({group: state.groups.detail});

export default connect(mapStateToProps, null)(GroupDetailHeader);
