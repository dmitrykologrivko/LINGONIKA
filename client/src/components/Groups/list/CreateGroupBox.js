import React from 'react';
import {connect} from 'react-redux';

import './CreateGroupBox.css';

class CreateGroupBox extends React.Component {
  render() {
    return (
      <article className="create-group-box">
        <section className="create-group-box__link">
          <div>
            <span className="create-group-box__plus-icon fas fa-plus"></span>
            <span className="create-group-box__add-group-label">Add group</span>
          </div>
        </section>
        <section className="create-group-box__form">
          <form>
            <div className="create-group-box__form-body">
              <textarea name="groupName" placeholder="Group name" className="create-group-box__group-name"></textarea>
              <div>
                <span className="create-group-box__group-name-hint">0/50 symbols</span>
              </div>
            </div>
            <footer className="create-group-box__form-footer">
              <div>
                <button type="button" className="create-group-box__form-button create-group-box__cancel-button">Cancel
                </button>
              </div>
              <div>
                <button type="submit" className="create-group-box__form-button create-group-box__add-button">Add
                </button>
              </div>
            </footer>
          </form>
        </section>
      </article>
    )
  }
}

export default connect()(CreateGroupBox);
