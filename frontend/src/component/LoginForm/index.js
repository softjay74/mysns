import {connect} from 'react-redux';
import Container from './container';
import { actionCreators as UserAction} from "redux/modules/user"
//import { withRouter } from 'react-router-dom'

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        API_FacebookLogin : (access_token) => {
            dispatch(UserAction.API_FacebookLogin(access_token))
        },
        userLogin : (email, password) => {
            dispatch(UserAction.userLogin(email, password))
        }
    }
}
export default connect(null,mapDispatchToProps)(Container);

