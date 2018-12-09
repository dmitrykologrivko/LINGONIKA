import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';

import {changeCreateGroupFormVisibility, changeGroupName} from "../../../actions/groupsActions";

import './CreateGroupBox.css';

const MAX_GROUP_NAME_LENGTH = 50;

class CreateGroupBox extends React.Component {
  render() {
    return (
      <article className="create-group-box">
        <section className="create-group-box__link"
                 style={this.props.isCreateGroupFormVisible ? {display: 'none'} : {}}
                 onClick={this.props.changeCreateGroupFormVisibility}>
          <div>
            <span className="create-group-box__plus-icon fas fa-plus"/>
            <span className="create-group-box__add-group-label">Add group</span>
          </div>
        </section>
        <section className="create-group-box__form"
                 style={this.props.isCreateGroupFormVisible ? {} : {display: 'none'}}>
          <form>
            <div className="create-group-box__form-body">
              <textarea name="groupName"
                        placeholder="Group name"
                        className="create-group-box__group-name"
                        value={this.props.groupName}
                        onChange={e => this.props.changeGroupName(e.target.value, MAX_GROUP_NAME_LENGTH)}/>
              <div>
                <span className="create-group-box__group-name-hint">
                  {`${this.props.groupName.length}/${MAX_GROUP_NAME_LENGTH} symbols`}
                </span>
              </div>
            </div>
            <footer className="create-group-box__form-footer">
              <div>
                <button type="button"
                        className="create-group-box__form-button create-group-box__cancel-button"
                        onClick={this.props.changeCreateGroupFormVisibility}>
                  Cancel
                </button>
              </div>
              <div>
                <button type="submit"
                        className="create-group-box__form-button create-group-box__add-button"
                        onClick={this.props.changeCreateGroupFormVisibility}>
                  Add
                </button>
              </div>
            </footer>
          </form>
        </section>
      </article>
    )
  }
}

const mapStateToProps = state => ({...state.groups.common, ...state.groups.createGroupBox});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    changeCreateGroupFormVisibility,
    changeGroupName
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupBox);
