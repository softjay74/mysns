import { connect } from 'react-redux';
import Container from './container';
import {actionCreator as postCreator } from 'redux/modules/post';

const mapStateToProp = (state, ownProps) => {
    const  { post : {feed} } = state;
    return {
        feed
    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        getFeed : () => {
            dispatch(postCreator.getFeed())
        }
    }
}     
export default connect(mapStateToProp, mapDispatchToProps)(Container);
