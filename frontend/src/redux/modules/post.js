//import

//actions
const SET_FEED = "SET_FEED"
const SET_LIKE = "SET_LIKE"
const SET_UNLIKE = "SET_UNLIKE"
const ADD_COMMENT = "ADD_COMMENT"
const GET_POST_LIKE_USER = "GET_POST_LIKE_USER"
//action Creator

function setFeed(feed){
    return {
        type : SET_FEED,
        feed
    }
}

function setLike(postid){
    return {
        type : SET_LIKE,
        postid
    }
}

function setUnlike(postid){
    return {
        type : SET_UNLIKE,
        postid 
    }
}

function addComment(postid, comment){
    return {
        type : ADD_COMMENT,
        postid,
        comment
    }
}

function getPostLikeUser(userList){
    return {
        type : GET_POST_LIKE_USER,
        userList 
    }
}
//api action 

 function getLikeUserList(postid){
    return(dispatch, getState) =>{
        const {user :{token}} = getState();

        fetch(`/post/${postid}/likes`,{
            method : "GET",
            headers :{ 
                Authorization :`JWT ${token}`,
                "Content-Type" : "application/json"

            }
        })
        .then(response=>response.json())
        .then(json => {
            console.log(json)

            dispatch(getPostLikeUser(json))
            }
        )
        .catch(err => console.log(err))
    }
}


function API_setLike (postid){
    return (dispatch, getState) => {
        dispatch(setLike(postid))  // 로컬에서 상태 변화
        const {user : {token}} = getState();
        //console.log("token :", token)
        fetch (`/like/${postid}/`, {
            method : "GET",
            headers : {
                 Authorization :`JWT ${token}` 
            }
        })
        .then(response=>response.json())  //  인증이 실패 했을대 Redirect 해야 하는 부분을 삽입해야 함
        .then(json=>console.log(json))
        .catch(err=>console.log(err))
    }
}


function API_setUnlike (postid){
    return (dispatch, getState) => {
        dispatch(setUnlike(postid))  // 로컬에서 상태 변화
        const {user : {token}}  = getState();
        fetch (`/unlike/${postid}/`,{
            method : "DELETE",
            headers : {
               Authorization : `JWT ${token}` 
            }
        })
        .then(response=>response.json())  //  인증이 실패 했을대 Redirect 해야 하는 부분을 삽입해야 함
        .then(json=>console.log(json))
        .catch(err=>console.log(err))
    }
}

function API_comment(postid, message) {
    return(dispatch, getState) =>{
        const {user : {token} } =getState();
        fetch(`/comment/${postid}/`,{
            method : "POST",
            headers :{
                Authorization :`JWT ${token}`,
                "Content-Type" : "application/json"
            },
            body :JSON.stringify({
                message
            })
        })
        .then(response => response.json())
        .then(json => {
            if(json.message) {
                dispatch(addComment(postid, json))
            }
        })
        .catch(err=> console.log(err))
    }
}

function getNoAuthFeed() {
     return (despatch) =>{
        fetch ('/feed/' ,  {
            method : "GET"
        })    
        .then(response=>response.json())
        .then(json => console.log(json))
        //.then(json => dispatch(setFeed(json)))
        .catch(err => console.log(err))
   }
}      

function getFeed() {
    return (dispatch, getState) => {
       
        const { user : { token } } = getState();
        console.log(token);

        fetch ('/feed/' ,  {
            method : "GET",
            headers : {
                Authorization : `JWT ${token}` 
            }
        })    
        .then(response=>response.json())
        //.then(json => console.log(json))
        .then(json => dispatch(setFeed(json)))
        .catch(err => console.log(err))
   }
}      

// initial State

const initialState = {
    feed : []
}

// reducer
function reducer (state=initialState, action ){
    switch (action.type){
        case SET_FEED :
            return applySetFeed(state, action )
        case SET_LIKE :
            return applySetLike(state, action)
        case SET_UNLIKE : 
            return applySetUnlike(state, action)
        case ADD_COMMENT :
            return applyAddComment(state, action)    
        case GET_POST_LIKE_USER :
            return applyGetPostLikeUser(state, action)   
        default :
            return state;
    }
}
// reducer function 

function applySetFeed(state, action) {
    const {feed} = action ;
    return {
        ...state, 
        feed
    }
}

function applyGetPostLikeUser(state, action){
    const{userList} = action ;
    return {
        ...state,
        userList
    }
}

function applySetLike(state, action){
    const {postid} = action;
    const {feed} = state;
    const updatedFeed = feed.map(post => {
        if(post.id===postid){
            return {...post, is_liked:true, count_likes : post.count_likes+1}
        }
        return post;
    })
    return {...state, feed:updatedFeed};
}

function applySetUnlike(state, action){
    const {postid} = action;
    const {feed} = state;
    const updatedFeed = feed.map(post => {
        if(post.id===postid){
            return {...post, commis_liked:false, count_likes : post.count_likes-1}
        }
        return post;
    })
    return {...state, feed:updatedFeed};
}

function applyAddComment(state, action){
    const {postid, comment} = action;
    const {feed} = state;
    const updatedFeed = feed.map(post => {
        if(post.id===postid){
            return {
                ...post,
                comment : [ ...post.comment, comment]
            
            }
        }
        return post;
    })
    return {...state, feed:updatedFeed};
}


//export 

const actionCreator = {
    getFeed,
    setFeed,
    API_setLike,
    API_setUnlike,
    getNoAuthFeed,
    API_comment,
    getLikeUserList
};

export { actionCreator };

// default reducer export 

export default reducer