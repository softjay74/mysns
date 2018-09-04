import {connect} from 'react-redux';
import Container from './container';
//import {actionCreator as postCreator} from 'redux/modules/post'

const mapStateToProp = (state, ownProps) => {
    const  { post : {userList} } = state;
    return {
        userList
    }
}


export default connect(mapStateToProp)(Container);
