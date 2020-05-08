import React from 'react';
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';

const LogoutComponent = (props) => {

  const { history } = props;
  props.doLogout(history);

  return (
    <div>Logging out.</div>
  )
}

var propTypes = {
    history: PropTypes.object.isRequired
  };

export default withRouter(LogoutComponent);
