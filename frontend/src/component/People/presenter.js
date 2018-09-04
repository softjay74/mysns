import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
//import UserList from 'component/UserList';

const People = (props, context) =>(
    <div>
    <Grid>
        <Row>

            <h1>{context.t("People")}</h1>
            { 
                props.users && props.users.map(user  => <UserData
                key={user.user_id}
                userid={user.user_id}
                username={user.user.username}
                userImage={user.profileImage}
            />)}
        </Row>
    </Grid>    
    </div>
)
People.contextTypes={
    t : PropTypes.func.isRequired
}


const UserData = props =>(
    
    <Col lg={3}>
    <span><Link to={`/profile/${props.username}`}><img src={props.userImage ||require("images/no_profile_image.jpg") } alt="" width="80" height="80" className="img-circle"/></Link></span>
    <span>{props.username} </span>
    </Col>
    
)
UserData.propTypes={
    userid : PropTypes.number.isRequired,
    username : PropTypes.string.isRequired,
    userImage : PropTypes.string
}


export default People;