import React from 'react';
import PropTypes from 'prop-types'
//import {Redirect} from 'react-router-dom'
import Popup from 'component/popup'

class TestContainer extends React.Component { 
    
    //const  { user } = state ;
    //console.log(user)
    

    render(){
    // Type : Signup // Login // Users // Error // 
    return ( 
    <div>
        { 
            <Popup 
            popupType="Login"
            />
            
        }
    </div>
    )}   
}

TestContainer.contextTypes ={
    t : PropTypes.func.isRequired
}


export default TestContainer

