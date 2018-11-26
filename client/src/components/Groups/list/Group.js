import React from 'react';
import {connect} from 'react-redux';

import './Group.css';

class Group extends React.Component {
  render() {
    return (
      <article className="group">
        <span className="group__button-more fas fa-ellipsis-v"></span>
        <a href="groups/1" className="group__link">
          <div>
            <span className="group__learned-words">28</span>
            <span className="group__slash">/</span>
            <span className="group__words-in-group">39</span>
          </div>
        </a>
        <div>
          <span className="group__name">Nouns (Существительные)</span>
        </div>
        <div className="group__actions-menu">
          <div className="group__actions-menu-item group__actions-menu-item_active">
            <span className="group__actions-menu-item-name">Add card</span>
          </div>
          <div className="group__actions-menu-item">
            <span className="group__actions-menu-item-name">Rename</span>
          </div>
          <div className="group__actions-menu-item">
            <span className="group__actions-menu-item-name">Delete</span>
          </div>
        </div>
      </article>
    )
  }
}

export default connect()(Group);
