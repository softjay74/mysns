//import React from 'react';
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Container from './container';
import {actionCreator as postAction} from 'redux/modules/post';


const mapDispatchToProps = (dispatch, ownProps) => {
    console.log(ownProps)
    return {
       handleHeartClick : () => {
            if(ownProps.is_liked){
                dispatch(postAction.API_setUnlike(ownProps.id))
            } else {
                dispatch(postAction.API_setLike(ownProps.id))
            }
        },
        getLikeUser : () =>{
            dispatch(postAction.getLikeUserList(ownProps.id))
         }
    }
}
export default connect(null, mapDispatchToProps)(Container);

