import React from 'react';
import PropTypes from 'prop-types';
//import Loading from 'component/Feed/loading';
import Ionicons from 'react-ionicons';
import './popup.css';

const UserList = (props) => (
        
        <div className='popup'>
            <div className='popup_inner'>
                {<span onClick={props.closeLikes}><Ionicons icon="md-close" fontsize="20px" color="black" /></span>}
                <h4>UserList</h4>
                {props.title}
                { props.loading ? <h1>loading</h1> : <RenderList userlist={props.userList}/> } 
            </div>
        </div>
)
UserList.propTypes ={
    title : PropTypes.string.isRequired,
    closeLikes : PropTypes.func.isRequired,
    loading : PropTypes.bool,
    userList : PropTypes.array,
    postid : PropTypes.number.isRequired
}

const RenderList = props =>(
    <div>
    <ul>
    { props.userlist && props.userlist.map(user  => <UserData
            key={user.creator.user_p.user_id}
            username={user.creator.username}
            userImage={user.creator.user_p.profileImage}
        />) }
    </ul>
    </div>
)
RenderList.propTypes={
    userlist : PropTypes.arrayOf(
        PropTypes.shape({
            id : PropTypes.number.isRequired,
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


const UserData = props =>(
    <div>
    {props.username} {props.userImage}
    </div>
)
UserData.propTypes={
    
    username : PropTypes.string.isRequired,
    userImage : PropTypes.string
}

export default UserList
