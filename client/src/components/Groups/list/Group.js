import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {editGroup, deleteGroup} from '../../../actions/groupsActions';

import './Group.css';
import {bindActionCreators} from "redux";

const GROUP_NAME_MAX_LENGTH = 50;

class Group extends React.Component {
  state = {
    isActionsMenuVisible: false,
    isEditGroupFormVisible: false,
    editableGroupName: null
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside.bind(this));
  }

  render() {
    let groupName;

    if (this.state.editableGroupName === null)
      groupName = this.props.group.name;
    else
      groupName = this.state.editableGroupName;

    return (
      <article className="group">
        <section className="group__info"
                 style={this.state.isEditGroupFormVisible ? {display: 'none'} : {}}>
          <span className="group__button-more fas fa-ellipsis-v" onClick={this.onButtonMoreClick.bind(this)}/>
          <Link to={`groups/${this.props.group.id}`} className="group__link">
            <div>
              <span className="group__learned-words">{this.props.group.countLearnedWords}</span>
              <span className="group__slash">/</span>
              <span className="group__words-in-group">{this.props.group.countWords}</span>
            </div>
          </Link>
          <div>
            <span className="group__name">{this.props.group.name}</span>
          </div>
          <div className="group__actions-menu" style={this.state.isActionsMenuVisible ? {} : {display: 'none'}}>
            <div className="group__actions-menu-item">
              <span className="group__actions-menu-item-name">Add card</span>
            </div>
            <div className="group__actions-menu-item"
                 onClick={this.onRenameMenuItemClick.bind(this)}>
              <span className="group__actions-menu-item-name">Rename</span>
            </div>
            <div className="group__actions-menu-item"
                 onClick={this.onDeleteMenuItemClick.bind(this)}>
              <span className="group__actions-menu-item-name">Delete</span>
            </div>
          </div>
        </section>
        <section className="group__edit-form"
                 style={this.state.isEditGroupFormVisible ? {} : {display: 'none'}}>
          <form>
            <div className="group__form-body">
              <textarea name="groupName"
                        placeholder="Group name"
                        className="group__field-name"
                        value={groupName}
                        onChange={this.onGroupNameChanged.bind(this)}/>
              <div>
                <span className="group__field-name-hint">
                  {`${groupName.length}/${GROUP_NAME_MAX_LENGTH} symbols`}
                </span>
              </div>
            </div>
            <footer className="group__form-footer">
              <div>
                <button type="button"
                        className="group__form-button group__negative-button"
                        onClick={this.onCancelButtonClick.bind(this)}>
                  Cancel
                </button>
              </div>
              <div>
                <button type="button"
                        className="group__form-button group__positive-button"
                        onClick={this.onEditButtonClick.bind(this)}>
                  Edit
                </button>
              </div>
            </footer>
          </form>
        </section>
      </article>
    )
  }

  onButtonMoreClick() {
    this.setState({
      ...this.state,
      isActionsMenuVisible: !this.state.isActionsMenuVisible
    });
  }

  onRenameMenuItemClick() {
    this.setState({
      ...this.state,
      isEditGroupFormVisible: true,
      isActionsMenuVisible: false
    });
  }

  onDeleteMenuItemClick() {
    this.props.deleteGroup(this.props.group.id);

    this.setState({
      ...this.state,
      isActionsMenuVisible: false
    });
  }

  onEditButtonClick() {
    this.props.editGroup({
      ...this.props.group,
      name: this.state.editableGroupName || this.props.group.name
    });

    this.setState({
      ...this.state,
      isEditGroupFormVisible: false,
      editableGroupName: null
    });
  }

  onCancelButtonClick() {
    this.setState({
      ...this.state,
      isEditGroupFormVisible: false,
      editableGroupName: null
    });
  }

  onGroupNameChanged(event) {
    this.setState({
      ...this.state,
      editableGroupName: event.target.value.slice(0, GROUP_NAME_MAX_LENGTH)
    });
  }

  handleClickOutside(event) {
    let node;

    try {
      node = ReactDOM.findDOMNode(this);
    } catch (error) {
      return;
    }

    if (!node || !node.contains(event.target)) {
      this.setState({
        ...this.state,
        isActionsMenuVisible: false
      });
    }
  }
}

const mapStateToProps = state => ({...state.groups});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({editGroup, deleteGroup}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);
