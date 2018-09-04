import React, {Component} from 'react';
import Auth from './presenter';

class Container extends Component {
    state = {
       action : "Login"     
    };

    render() {
        const {action} = this.state;
        return <Auth action={action} changeAction={this._changeAction} />;
    }

    _changeAction = () => {
        this.setState(prevState => {
           const { action } = prevState;
           if (action === "Login") {
               return {
                   action : "Signup"
               }
           } else if (action === "Signup") {
                return {
                    action : "Login"
                }
           }
        })
    }

};

export default Container;
