import React from 'react';
import {connect} from 'react-redux';

import './CommonGroup.css';

class CommonGroup extends React.Component {
  render() {
    return (
      <article className="common-group">
        <a href="groups" className="common-group__link">
          <div>
            <span className="common-group__learned-words">{this.props.countLearnedWords}</span>
            <span className="common-group__slash">/</span>
            <span className="common-group__words-in-group">{this.props.countWords}</span>
          </div>
        </a>
        <hr className="common-group__dash"/>
        <div>
          <span className="common-group__title">All cards</span>
        </div>
      </article>
    )
  }
}

const mapStateToProps = state => ({...state.groups.meta});

export default connect(mapStateToProps)(CommonGroup);
