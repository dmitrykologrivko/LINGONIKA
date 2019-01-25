import React from 'react';

import './CardsHeader.css';

const ALL_WORDS_FILTER = 'ALL_WORDS_FILTER';
const LEARNED_WORDS_FILTER = 'LEARNED_WORDS_FILTER';

class CardsHeader extends React.Component {
  state = {
    selectedFilter: ALL_WORDS_FILTER
  };

  render() {
    let allWordsFilter = <button className="cards-header__button-all-cards"
                                 onClick={this.onAllCardsButtonClick.bind(this)}>All</button>;
    if (this.state.selectedFilter === ALL_WORDS_FILTER)
      allWordsFilter = <span className="cards-header__nav-selected-item">All</span>;

    let learnedWordsFilter = <button className="cards-header__button-learned-cards"
                                     onClick={this.onLearnedWordsButtonClick.bind(this)}>Learned</button>;
    if (this.state.selectedFilter === LEARNED_WORDS_FILTER)
      learnedWordsFilter = <span className="cards-header__nav-selected-item">Learned</span>;

    return (
      <header className="cards-header">
        <h3 className="cards-header__group_name">Nouns (Существительные)</h3>
        <nav className="cards-header__nav">
          {allWordsFilter}
          {learnedWordsFilter}
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

export default CardsHeader;
