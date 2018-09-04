//import React from 'react';
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Container from './container';

import {actionCreator as postAction} from 'redux/modules/post';

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        submitComment : (message) =>{
            dispatch(postAction.API_comment(ownProps.postid, message))
        } 
    }
}

export default connect(null, mapDispatchToProps)(Container)

//export default connect()(Container)