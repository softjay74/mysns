import React from 'react';
import PropTypes from 'prop-types'
import Textarea from 'react-textarea-autosize';

const WriteComment = (props, context) => {
    return (
        <div>
        <form>
        <Textarea 
            className="form-control" 
            placehoder={context.t("Add a comment...")}
            value = {props.comment}
            onChange={props.handleInputChange}
            onKeyPress ={props.handleKeyPress}
        />
        </form>
        </div>
    )
}  


WriteComment.contextTypes = {
    t : PropTypes.func.isRequired
}


WriteComment.propTypes ={
    handleInputChange : PropTypes.func.isRequired,
    handleKeyPress : PropTypes.func.isRequired,
    comment : PropTypes.string.isRequired
}

export default WriteComment