import React from 'react';

import './Card.css';

class Card extends React.Component {
  render() {
    return (
      <li className="card">
        <div className="card__body">
          <div className="card__checkbox-wrapper">
            <input type="checkbox" className="card__checkbox"/>
          </div>
          <div className="card__dot-wrapper">
            <div className="card__dot card__dot_active"/>
          </div>
          <div className="card__phrase-wrapper">
            <span className="card__phrase">avenue</span>
            <span className="card__translation">проспект</span>
          </div>
        </div>
      </li>
    )
  }
}

export default Card;
