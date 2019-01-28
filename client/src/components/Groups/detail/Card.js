import React from 'react';

import './Card.css';

class Card extends React.Component {
  render() {
    const card = this.props.card;

    return (
      <li className="card">
        <div className="card__body">
          <div className="card__checkbox-wrapper">
            <input type="checkbox"
                   className="card__checkbox"
                   checked={this.props.isCardSelected}
                   onChange={(event) => (this.props.onCardSelected(card.id, event.target.checked))}/>
          </div>
          <div className="card__dot-wrapper">
            {card.isLearned ? (
              <div className="card__dot card__dot_active"/>
            ) : (
              <div className="card__dot"/>
            )}
          </div>
          <div className="card__phrase-wrapper">
            <span className="card__phrase">{card.phrase}</span>
            <span className="card__translation">{card.translation}</span>
          </div>
        </div>
      </li>
    )
  }
}

export default Card;
