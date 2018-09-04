import React from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';
import {connect} from 'react-redux';
import { actionCreators as UserAction} from "redux/modules/user"

class SingupContainer extends React.Component{
    state = {
        username : '',
        password_1 : '',
        password_2 : '',
        email : '',
        fullname : '' 
    }

    render(){
        const  { username , password_1, password_2 , email, fullname } = this.state;
        return (
            <SignupForm 
                handleFacebookLogin ={this._handleFacebookLogin}
                handleInput = {this._handleInput}
                username_value={username}
                password_value_1={password_1}
                password_value_2={password_2}
                email_value={email}
                fullname_value={fullname}
             />
        )

    }

    _handleInput = event =>{
        const { target : {name, value} } = event
        this.setState({
            [name] : value
        })

        console.log(this.state);
    }

    _handleFacebookLogin = response => {
        console.log(response);
        const { API_FacebookLogin } = this.props;
            API_FacebookLogin(response.accessToken);
    }

}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        API_FacebookLogin : (access_token) => {
            dispatch(UserAction.API_FacebookLogin(access_token))
        },
        CreatUser : (username, password, email, fullname ) => {
            dispatch(UserAction.CreatUser( username,  password, email,fullname))
        }
    }
}
export default connect(null,mapDispatchToProps)(SingupContainer);


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
    <input type="email" className="form-control" placeholder={context.t("Email")} name="email" onChange={props.handleInput} value={props.email_value}/>
    <input type="text" className="form-control" placeholder={context.t("Full Name")} name="fullname" onChange={props.handleInput} value={props.fullname_value}/>
    <input type="username" className="form-control" placeholder={context.t("Username")} name="username" onChange={props.handleInput} value={props.username_value}/>
    <input type="password" className="form-control" placeholder={context.t("Password")} name="password_1" onChange={props.handleInput} value={props.password_value_1}/>
    <input type="password" className="form-control" placeholder={context.t("Confirm Password")} name="password_2" onChange={props.handleInput} value={props.password_value_2}/>
    <button  className="btn-primary form-control" >Sign up</button>
    
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
    fullname_value : PropTypes.string.isRequired,
    handleInput: PropTypes.func.isRequired,
    handleFacebookLogin : PropTypes.func.isRequired
}

