import React from 'react';
import PropTypes from 'prop-types';
import Ionicon from 'react-ionicons';
import {Col} from 'react-bootstrap';
import FeedCommentList from 'component/FeedComment';
//import WriteCommentBox from 'component/FeedComment/writeComment';
import WriteComment from 'component/FeedCommentBox';
import UserList from 'component/UserList';

const FeedPhoto = (props, context) => {
    return ( 
        <Col lg={4} md={4} sm={6} sx={12}>
    <div className="thumbnail">
        <div>
        <img src={props.creator.user_p.profileImage || require("images/no_profile_image.jpg")}  className="img-circle" alt="" width="60" height="60"/>
        {props.creator.username}
        </div>
        <br/><img src ={props.file} alt={props.caption} width="400"/>

        <br/><span onClick={props.openLikes}>{props.count_likes} { props.count_likes === 1 ? context.t("like") :  context.t("likes")} </span>- {props.caption} - {props.location}
    
            <div>
                
                <span  onClick={props.handleHeartClick} >
                { props.is_liked ? (
                    <Ionicon icon="ios-heart" fontsize="28px"/> 
                    ) : (
                    <Ionicon icon="ios-heart-outline"/> 
                    )
                }
                </span>
                <Ionicon icon="ios-text-outline"/>
            </div>
        <div>
            <FeedCommentList postid={props.id} comments={props.comment} />
            <WriteComment postid={props.id}/>

            {props.seekingLikes && (
                <UserList title={context.t("Likes")} postid={props.id} closeLikes={props.closeLikes}/> 
            )}
        </div>
    </div>
    </Col>
    )
}

FeedPhoto.contextTypes ={
    t : PropTypes.func.isRequired
}

FeedPhoto.propTypes = {
    id : PropTypes.number.isRequired,
    file : PropTypes.string.isRequired,
    caption : PropTypes.string.isRequired,
    location : PropTypes.string.isRequired,
    count_likes : PropTypes.number.isRequired,
    is_liked : PropTypes.bool.isRequired,
    handleHeartClick:PropTypes.func.isRequired,
    seekingLikes: PropTypes.bool.isRequired,
    closeLikes : PropTypes.func.isRequired,
    openLikes : PropTypes.func.isRequired,
    creator : PropTypes.shape({
        username : PropTypes.string.isRequired,
        user_p : PropTypes.shape({
                    user_id : PropTypes.number.isRequired,
                    profileImage : PropTypes.string
                }).isRequired
    }).isRequired,
    comment : PropTypes.arrayOf(
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
            ),
    //tags : PropTypes.arrayOf()
}


export default FeedPhoto 
