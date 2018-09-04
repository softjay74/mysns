import React from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';
//import {connect} from 'react-redux';
//import { actionCreators as UserAction} from "redux/modules/user"


const LoginForm = (props, context) => (
    <div>
    <form onSubmit={props.handleSubmit} >
    <input 
        type="text" 
        className="form-control" 
        value ={props.usernameVlaue}
        onChange={props.handleInputChange}
        name="username"
        placeholder={context.t("Username")}
    />
    <input 
        type="password" 
        className="form-control" 
        value = {props.passwordValue}
        onChange={props.handleInputChange}
        name="password"
        placeholder={context.t("Username")}
    />
    <input type="submit" className="btn-primary form-control" value="Login"/>
    </form>

    <p>Or</p>
    <span>    
    <FacebookLogin
        appId ="1948602975161936"
        autoLoad={false}
        fields="name,email,picture"
        callback={props.handleFacebookLogin} 
        cssClass="my-facebook-button-class"
        icon="fa-facebook-official"
        textButton={context.t("Log in with facebook")}
    />
    </span>

    </div>
)

LoginForm.contextTypes = {
    t: PropTypes.func.isRequired
}

LoginForm.propTypes = {
    usernameVlaue : PropTypes.string.isRequired,
    passwordValue : PropTypes.string.isRequired,
    handleInputChange : PropTypes.func.isRequired,
    handleFacebookLogin : PropTypes.func.isRequired,
    handleSubmit : PropTypes.func.isRequired
}

export default LoginForm;