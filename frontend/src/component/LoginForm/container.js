import React from 'react';
import LoginForm from './presenter'
import PropTypes from 'prop-types'

class Container extends React.Component {
    state={
        username:'',
        password :''
    }

    static propTypes ={
        API_FacebookLogin : PropTypes.func.isRequired,
        userLogin : PropTypes.func.isRequired
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
        const { userLogin } = this.props;
        const { username, password } = this.state;
        event.preventDefault();
        userLogin(username, password); 
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
export default Container;
