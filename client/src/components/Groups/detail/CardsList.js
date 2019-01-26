import React from 'react';

import Card from './Card';

import './CardsList.css';

class CardsList extends React.Component {
  render() {
    return (
      <div>
        <div className="cards-list-actions">

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
