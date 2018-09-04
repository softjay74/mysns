import React from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';

const SignupForm = (props, context) => (
    <div>
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
    <p/>
    <form onSubmit ={props.handleSubmit} >
    <input type="email" className="form-control" placeholder={context.t("Email")} name="email" onChange={props.handleInput} value={props.email_value}/>
    <input type="text" className="form-control" placeholder={context.t("Full Name")} name="fullname" onChange={props.handleInput} value={props.fullname_value}/>
    <input type="username" className="form-control" placeholder={context.t("Username")} name="username" onChange={props.handleInput} value={props.username_value}/>
    <input type="password" className="form-control" placeholder={context.t("Password")} name="password_1" onChange={props.handleInput} value={props.password_value_1}/>
    <input type="password" className="form-control" placeholder={context.t("Confirm Password")} name="password_2" onChange={props.handleInput} value={props.password_value_2}/>
    <input type="submit"  className="btn-primary form-control" value="Sign up" />
    </form>
    </div>
);

SignupForm.contextTypes = {
    t : PropTypes.func.isRequired
};

SignupForm.propTypes ={
    username_value : PropTypes.string.isRequired,
    password_value_1 : PropTypes.string.isRequired,
    password_value_2 : PropTypes.string.isRequired,
    email_value : PropTypes.string.isRequired, 
   // fullname_value : PropTypes.string.isRequired,
    handleInput: PropTypes.func.isRequired,
    handleFacebookLogin : PropTypes.func.isRequired,
    handleSubmit : PropTypes.func.isRequired
}

export default SignupForm;