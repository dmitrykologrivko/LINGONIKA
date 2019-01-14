import React from 'react';
import {connect} from 'react-redux';

import {createGroup} from '../../../actions/groupsActions';

import './CreateGroupBox.css';
import {bindActionCreators} from "redux";

const GROUP_NAME_MAX_LENGTH = 50;

class CreateGroupBox extends React.Component {
  state = {
    isCreateGroupFormVisible: false,
    groupName: ''
  };

  render() {
    return (
      <article className="create-group-box">
        <section className="create-group-box__link"
                 style={this.state.isCreateGroupFormVisible ? {display: 'none'} : {}}
                 onClick={this.onAddGroupLinkClick.bind(this)}>
          <div>
            <span className="create-group-box__plus-icon fas fa-plus"/>
            <span className="create-group-box__add-group-label">Add group</span>
          </div>
        </section>
        <section className="create-group-box__form"
                 style={this.state.isCreateGroupFormVisible ? {} : {display: 'none'}}>
          <form>
            <div className="create-group-box__form-body">
              <textarea name="groupName"
                        placeholder="Group name"
                        className="create-group-box__group-name"
                        value={this.state.groupName}
                        onChange={this.onGroupNameChanged.bind(this)}/>
              <div>
                <span className="create-group-box__group-name-hint">
                  {`${this.state.groupName.length}/${GROUP_NAME_MAX_LENGTH} symbols`}
                </span>
              </div>
            </div>
            <footer className="create-group-box__form-footer">
              <div>
                <button type="button"
                        className="create-group-box__form-button create-group-box__cancel-button"
                        onClick={this.onCancelButtonClick.bind(this)}>
                  Cancel
                </button>
              </div>
              <div>
                <button type="button"
                        className="create-group-box__form-button create-group-box__add-button"
                        onClick={this.onAddButtonClick.bind(this)}>
                  Add
                </button>
              </div>
            </footer>
          </form>
        </section>
      </article>
    )
  }

  onAddGroupLinkClick() {
    this.setState({
      ...this.state,
      isCreateGroupFormVisible: true
    });
  }

  onAddButtonClick() {
    this.props.createGroup({
      name: this.state.groupName,
      fromLanguage: this.props.selectedFromLanguage,
      toLanguage: this.props.selectedToLanguage
    });

    this.setState({
      ...this.state,
      isCreateGroupFormVisible: false,
      groupName: ''
    });
  }

  onCancelButtonClick() {
    this.setState({
      ...this.state,
      isCreateGroupFormVisible: false,
      groupName: ''
    });
  }

  onGroupNameChanged(e) {
    this.setState({
      ...this.state,
      groupName: e.target.value.slice(0, GROUP_NAME_MAX_LENGTH)
    });
  }
}

const mapStateToProps = state => ({...state.groups});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({createGroup}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupBox);
