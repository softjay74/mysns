import {connect} from 'react-redux';
import Container from './container';
import { withRouter } from 'react-router-dom';

const CheckLoginStatus = (state, ownProps) =>{
  const {user, routing: {location} } = state;
  return {
    isLoggedIn:user.isLoggedIn,
    pathname : location.pathname
  };
};


export default withRouter(connect(CheckLoginStatus)(Container));
