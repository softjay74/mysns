import {connect} from 'react-redux';
import Container from './container';
import {actionCreators as UserAction } from 'redux/modules/user'


const mapStateToProp = (state, ownProps) => {
    const  { user : {users} } = state;
    return {
        users
    }
}

const mapDispatchToProps = (dispatch, ownProps)=>{
    return {
        getAllUser : () =>{
            dispatch ( UserAction.APIgetAllUser())
        }
    }    
}

export default connect(mapStateToProp, mapDispatchToProps)(Container)

