import React from 'react';
import {connect} from 'react-redux';

import Card from './Card';

import './CardsList.css';

class CardsList extends React.Component {
  state = {
    isAllCardsSelected: false,
    selectedCards: []
  };

  constructor(props) {
    super(props);

    this.onSelectAllCardsCheckboxChanged = this.onSelectAllCardsCheckboxChanged.bind(this);
    this.onCardSelected = this.onCardSelected.bind(this);
  }

  render() {
    const cards = this.props.group.cards.map(card => {
      return <Card key={card.id}
                   card={card}
                   isCardSelected={this.state.selectedCards.includes(card.id)}
                   onCardSelected={this.onCardSelected}/>;
    });

    return (
      <div>
        <div className="cards-list-actions">
          <input type="checkbox"
                 className="cards-list-actions__checkbox"
                 checked={this.state.isAllCardsSelected}
                 onChange={this.onSelectAllCardsCheckboxChanged}/>

          {this.state.selectedCards.length > 0  ? (
            <div className="cards-list-actions__title">
              {`${this.state.selectedCards.length} cards selected`}
            </div>
          ) : null}

          {this.state.selectedCards.length > 0 ? (
            <div className="cards-list-actions__remove-action">
              <span className="cards-list-actions__remove-action-icon fas fa-trash-alt"/>
              <span className="cards-list-actions__remove-action-label">Remove</span>
            </div>
          ) : null}
        </div>
        <ul className="cards-list">
          {cards}
        </ul>
      </div>
    )
  }

  onSelectAllCardsCheckboxChanged(event) {
    const isAllCardsSelected = event.target.checked;

    this.setState({
      ...this.state,
      isAllCardsSelected,
      selectedCards: isAllCardsSelected ? this.props.group.cards.map(card => card.id) : []
    });
  }

  onCardSelected(cardId, checked) {
    let selectedCards = this.state.selectedCards;
    let isAllCardsSelected = false;

    if (checked && !selectedCards.includes(cardId)) {
      selectedCards.push(cardId);
    } else if (!checked && selectedCards.includes(cardId)) {
      selectedCards = selectedCards.filter(currentId => currentId !== cardId);
    }

    if (selectedCards.length === this.props.group.cards.length) {
      isAllCardsSelected = true;
    }

    this.setState({
      ...this.state,
      isAllCardsSelected,
      selectedCards
    });
  }
}

const mapStateToProps = state => ({group: state.groups.detail});

export default connect(mapStateToProps, null)(CardsList);
