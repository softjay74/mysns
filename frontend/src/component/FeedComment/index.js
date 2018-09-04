import React from 'react';
import PropTypes from 'prop-types'
//import WriteComment from 'component/FeedCommentBox'

const FeedCommentList = props => {
   
    return (
        <div>
        <ul>
            {props.comments.map(comment =>(
                <FeedComment  
                    Writer = {comment.creator.username}
                    WriterImage ={comment.creator.user_p.profileImage}
                    created = {comment.created}
                    message ={comment.message}
                    key={comment.id}
                />
            ))}   
        </ul>
        
       {/* <WriteComment postid={props.postid}/> */} 
        </div>
    )
}

FeedCommentList.propTypes = {
    postid : PropTypes.number.isRequired,
    comments : PropTypes.arrayOf(
                PropTypes.shape({
                    id : PropTypes.number.isRequired,
                    message : PropTypes.string.isRequired,
                    created : PropTypes.string.isRequired,
                    creator : PropTypes.shape({
                        username : PropTypes.string.isRequired,
                        user_p : PropTypes.shape({
                            user_id : PropTypes.number.isRequired,
                            profileImage : PropTypes.string
                        }).isRequired
                    })
                })
            )
}

    
const FeedComment = props => {
    //console.log("comment -- " , props)
    return (
        <li>
        <span><img src={props.WriterImage || require("images/no_profile_image.jpg")} alt="" width="50" height="50" className="img-circle" /></span>
        <span>{props.Writer}</span>
        <span>{props.message}</span>
        <p>{props.created}</p>
        </li>    
    )
}
FeedComment.propTypes ={
    Writer : PropTypes.string,
    WriterImage : PropTypes.string,
    created : PropTypes.string,
    message : PropTypes.string
}

export default FeedCommentList

