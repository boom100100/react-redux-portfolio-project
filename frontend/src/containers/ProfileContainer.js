import React, {Component} from 'react';
import ProfileComponent from '../components/ProfileComponent'
import { connect } from 'react-redux';

class ProfileContainer extends Component {


  render(){return (<ProfileComponent user={this.props.user}/>)}
}

const mapStateToProps = (state) => {
  // console.log(state);
  // console.log(state.session);
  // console.log(state.user);
  // console.log(state.user.email);
  // console.log(state.user.projects);
  return { user: state.user };
}

export default connect(mapStateToProps)(ProfileContainer);
