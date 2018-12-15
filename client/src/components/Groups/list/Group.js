import React from 'react';

import './Group.css';

class Group extends React.Component {
  state = {
    isActionsMenuVisible: false
  };

  render() {
    return (
      <article className="group">
        <span className="group__button-more fas fa-ellipsis-v" onClick={this.onButtonMoreClick.bind(this)}/>
        <a href={`groups/${this.props.group.id}`} className="group__link">
          <div>
            <span className="group__learned-words">{this.props.group.countLearnedWords}</span>
            <span className="group__slash">/</span>
            <span className="group__words-in-group">{this.props.group.countWords}</span>
          </div>
        </a>
        <div>
          <span className="group__name">{this.props.group.name}</span>
        </div>
        <div className="group__actions-menu" style={this.state.isActionsMenuVisible ? {} : {display: 'none'}}>
          <div className="group__actions-menu-item">
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

  onButtonMoreClick() {
    this.setState({
      ...this.state,
      isActionsMenuVisible: !this.state.isActionsMenuVisible
    });
  }
}

export default Group;
