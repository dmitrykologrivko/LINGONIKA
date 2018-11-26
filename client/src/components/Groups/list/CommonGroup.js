import React from 'react';
import {connect} from 'react-redux';

import './CommonGroup.css';

class CommonGroup extends React.Component {
  render() {
    return (
      <article className="common-group">
        <a href="groups" className="common-group__link">
          <div>
            <span className="common-group__learned-words">28</span>
            <span className="common-group__slash">/</span>
            <span className="common-group__words-in-group">39</span>
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

export default connect()(CommonGroup);
