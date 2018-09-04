import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Textarea from 'react-textarea-autosize';
import {connect } from 'react-redux';
import {actionCreator as postAction} from 'redux/modules/post'

class WriteCommentBox extends Component{
    state = {
        comment : ""
    }

    render(){
        return(
            <WriteComment 
                {...this.state} 
                handleInputChange={this._handleInputChange}
                handleKeyPress = {this._handleKeyPress}
            />
        )
    }
    
    _handleInputChange = event =>{
        const{target : {value}} = event;
        this.setState({
            comment : value
        })
    }

    _handleKeyPress = event => {
        const {key} = event;
        const { submitComment } = this.props;
        const { comment } = this.state;
        
        if (key==="Enter"){
            console.log(key)
            event.preventDefault();
            submitComment(comment);
            this.setState({
                comment : ""
            })
        }
    }
}


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


const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        submitComment : (message) =>{
            dispatch(postAction.API_comment(ownProps.postid, message))
        } 
    }
}
export default connect(null, mapDispatchToProps)(WriteCommentBox)