import React from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';
import {connect} from 'react-redux';
import { actionCreators as UserAction} from "redux/modules/user"

class LoginContainer extends React.Component {
    state={
        username:'',
        password :''
    }

    render(){
        
        const {username, password} = this.state;

        return (
            <div>
            <LoginForm 
                handleFacebookLogin ={this._handleFacebookLogin}
                handleSubmit={this._handleSubmit} 
                handleInputChange={this._handleInputChange} 
                usernameVlaue={username} 
                passwordValue={password}
                
            />
            </div>
        )

    }

    _handleInputChange = event => {
        const { target : { name, value  } } = event
        this.setState({
            [name] : value
        })

        console.log(this.state);
    }

    _handleSubmit = event => {
        event.preventDefault();
        console.log(this.state);
        //redux 실행됨 
    }

    _handleFacebookLogin = response => {
        console.log(response);
        const { API_FacebookLogin } = this.props;
        API_FacebookLogin(response.accessToken);
        
       // console.log(response)
    }
    
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        API_FacebookLogin : (access_token) => {
            dispatch(UserAction.API_FacebookLogin(access_token))
        }
    }
}
export default connect(null,mapDispatchToProps)(LoginContainer);


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