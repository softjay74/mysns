import {connect} from 'react-redux';
import Container from './container';
import { actionCreators as UserAction } from 'redux/modules/user'

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        API_FacebookLogin : (access_token) => {
            dispatch(UserAction.API_FacebookLogin(access_token));
        },
        createUser : (username, email, password_1, password_2) => {
            dispatch(UserAction.CreateUser(username, email, password_1,password_2));
        }
    }

}

export default connect(null, mapDispatchToProps)(Container);
