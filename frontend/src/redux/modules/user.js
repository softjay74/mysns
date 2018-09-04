import { push} from 'react-router-redux';
// action
const SAVE_TOKEN = "SAVE_TOKEN";
const GET_ALL_USER = "GET_ALL_USER"
const GET_PROFILE ="GET_PROFILE"

// action creators

function saveToken(token){
    return {
        type : SAVE_TOKEN,
        token : token,
    }
}
//

function setAllUser(users){
    return {
        type : GET_ALL_USER,
        users : users
    }
}

function getProfile(profile){
    return {
        type : GET_PROFILE,
        profile 
    }
} 

// API Actions
function APIgetProfile(){
    return(dispatch, getState) =>{
        const{user:{token}} = getState();
        fetch('',{
            method : "GET",
            headers : {
                Authorization : `JWT ${token}`,
                "Content-Type" : "application/json"
            }
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            dispatch(getProfile(json))
        })
        .catch(err=> console.log(err))
    } 
}



function APIgetAllUser(){
    return(dispatch, getState) => {
       const {user :{token}} = getState();
       fetch('/people/',{
            method : "GET",
            headers : {
                Authorization : `JWT ${token}`,
                "Content-Type" : "application/json"
            }
       })
       .then(response=>response.json())
       .then(json=>{
            console.log(json)
            dispatch(setAllUser(json))

       })
       .catch(err=> console.log(err))
    }    
}


function API_FacebookLogin(access_token){
   // console.log(access_token)
    return function(dispatch){
        fetch("/rest-auth/facebook/",{
            method : "POST",
            headers : {
               "Content-Type" : "application/json"     
            },
            body : JSON.stringify({
                access_token
            })
        })
        .then(response => response.json())
        .then(json => {
            if (json.token){
                localStorage.setItem("jwt", json.token )
                dispatch(saveToken(json.token))
           }
        })
        .catch(err => console.log(err)) 
    }
}


function userLogin(username, password){
    return function(dispatch){
        fetch("/rest-auth/login/",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                username,
                password
            })
        })
        .then(response => response.json())
        .then( json => {
               if(json.token){
                   localStorage.setItem("jwt", json.token )
                   dispatch(saveToken(json.token))
                   dispatch(push('/feed'))
               }

        })
        .catch(err => console.log(err));
    }
}


function CreateUser(email, username, password1, password2){
    return function(dispatch){
        fetch('/rest-auth/registration/',{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                email, 
                username, 
                password1, 
                password2
            })
        })
        .then(response =>response.json())
        .then(json =>{
            if(json.token){
                localStorage.setItem("jwt", json.token )
                dispatch(saveToken('json.token'))
            }
        })
        .catch(err => console.log(err))
    }
}

// intial State

const intialState = {
    isLoggedIn : localStorage.getItem("jwt") ? true : false,
    token : localStorage.getItem("jwt")
}    

// reducer

function reducer(state=intialState, action) {
    switch (action.type)  {
        case SAVE_TOKEN :
            return applySetToken(state, action)
        case GET_ALL_USER :
            return applyGetUsers(state, action) 
        case GET_PROFILE:
            return applyGetProfile(state, action)               
        default : 
            return state;
    }
}

//  reducer Function 

function applySetToken(state, action) {
    const {token} = action 
    return {
        ...state,
        isLoggedIn : true,
        token
    }
}

function applyGetUsers(state, action){
    const {users} = action
    return {
        ...state,
        users
    }
}

function applyGetProfile(state, action){
    const{profile} = action 
    return{
        ...state,
        profile
    }
}
// actionCreator

const actionCreators = {
    API_FacebookLogin,
    userLogin,
    CreateUser,
    APIgetAllUser,
    APIgetProfile
};
export { actionCreators };

// export  

export default reducer;