import React, {Component} from 'react';
import ProfileComponent from '../components/ProfileComponent'
import { connect } from 'react-redux';

class ProfileContainer extends Component {


  render(){return (<ProfileComponent user={this.props.user}/>)}
}

const mapStateToProps = (state) => {
  return { user: state.user };
}

export default connect(mapStateToProps)(ProfileContainer);
