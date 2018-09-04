import {connect} from 'react-redux';
import Container from './container';
//import { actionCreators as UserAction} from "redux/modules/user"
//import LoginContainer from 'component/Auth/LoginForm'

/*
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        API_FacebookLogin : (access_token) => {
            dispatch(UserAction.API_FacebookLogin(access_token))
        }
    }
}
export default connect(null,mapDispatchToProps)(Container);
*/

export default connect()(Container);