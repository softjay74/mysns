import React from 'react';
import PropTypes from 'prop-types';

import SignupForm from 'component/SignupForm/presenter'

class Container extends React.Component{
    state = {
        username : '',
        password_1 : '',
        password_2 : '',
        email : '',
        fullname : '' 
    }

    static propTypes = {
        API_FacebookLogin : PropTypes.func.isRequired,
        createUser : PropTypes.func.isRequired
    }

    render(){
        const  { email, username , password_1, password_2  } = this.state;
        return (
            <div>


            <SignupForm 
                handleFacebookLogin ={this._handleFacebookLogin}
                handleSubmit = {this._handleSubmit}
                handleInput = {this._handleInput}
                username_value={username}
                password_value_1={password_1}
                password_value_2={password_2}
                email_value={email}
                //fullname_value={fullname}
             />
            </div> 
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

    _handleSubmit = event =>{
        const {email, username ,  password_1, password_2 } = this.state;
        const {createUser} = this.props;
        event.preventDefault();
        createUser(email, username , password_1, password_2)
    }

}
export default Container