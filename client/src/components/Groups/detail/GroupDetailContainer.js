import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import GroupDetailHeader from './GroupDetailHeader';
import CardsList from './CardsList';
import {fetchGroup} from '../../../actions/groupsActions';

class GroupDetailContainer extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchGroup(id);
  }

  render() {
    return (
      <main>
        <GroupDetailHeader/>
        <CardsList/>
      </main>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({fetchGroup}, dispatch);
};

export default connect(null, mapDispatchToProps)(GroupDetailContainer);
