import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';

import {changeCreateGroupFormVisibility, changeCreatableGroupName} from "../../../actions/groupsActions";

import './CreateGroupBox.css';

const GROUP_NAME_MAX_LENGTH = 50;

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
                        value={this.props.creatableGroupName}
                        onChange={this.props.onGroupNameChanged}/>
              <div>
                <span className="create-group-box__group-name-hint">
                  {`${this.props.creatableGroupName.length}/${GROUP_NAME_MAX_LENGTH} symbols`}
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

const mapStateToProps = state => ({...state.groups.groupsMeta, ...state.groups.createGroupBox});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    changeCreateGroupFormVisibility,
    onGroupNameChanged: e => changeCreatableGroupName(e.target.value.slice(0, GROUP_NAME_MAX_LENGTH))
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupBox);
