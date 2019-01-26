import React from 'react';

import Card from './Card';

import './CardsList.css';

class CardsList extends React.Component {
  render() {
    return (
      <div>
        <div className="cards-list-actions">
          <input type="checkbox"/>
          <div className="cards-list-actions__title">39 cards selected</div>
          <div className="cards-list-actions__remove-action">
            <span className="cards-list-actions__remove-action-icon fas fa-trash-alt"/>
            <span className="cards-list-actions__remove-action-label">Remove</span>
          </div>
        </div>
        <ul className="cards-list">
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </ul>
      </div>
    )
  }
}

export default CardsList;
