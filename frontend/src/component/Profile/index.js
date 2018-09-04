import {connect} from 'react-redux';
import {actionCreators as UserAction} from 'redux/modules/user';
import Container from './container';

const mapStateToProps =(state, ownProps) =>{
    const { user : {profile} } = state;
    return {
        profile
    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        getProfile : () =>{
            dispatch(UserAction.APIgetProfile())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)