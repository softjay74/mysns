import React from 'react';
import PropTypes from 'prop-types'
import {Grid, Row} from 'react-bootstrap'
const Profile = props => (
    <div>
    { props.profile ? <RenderProfile 
                        id={props.profile.user_id}
                        username={props.profile.user.username}
                        first_name={props.profile.user.first_name}
                        last_name={props.profile.user.last_name}
                        city={props.profile.city}
                        profileImage={props.profile.profileImage}
                        description={props.profile.description}
                        following={props.profile.followingCount}
                        follower={props.profile.followersCount}
                        /> : null
    }

    </div>    
)
export default Profile

const RenderProfile = props => (
   
    <Grid>
        <Row>
        <br/>id : {props.id}
        <br/>username : {props.username}
        <br/>first_name :  {props.first_name}
        <br/>last_name : {props.last_name}
        <br/>profileImage : {props.profileImage}
        <br/>city :{props.city}
        <br/>description : {props.description}
        <br/>following :{props.following}
        <br/>follower :  {props.follower}
        </Row>
    </Grid>    
)
RenderProfile.propTypes = {
    id : PropTypes.number.isRequired,
    username : PropTypes.string.isRequired,
    first_name : PropTypes.string.isRequired,
    last_name : PropTypes.string.isRequired,
    profileImage : PropTypes.string.isRequired,
    city : PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
    following : PropTypes.number.isRequired,
    follower : PropTypes.number.isRequired
}