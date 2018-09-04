import React, {Component} from 'react';
//import PropTypes from 'prop-types'
import UserList from './presenter'

class  Container extends Component {
   state = {
        loading : true
    }

    componentWillReceiveProps = (nextProps) => {

        console.log(nextProps);  
        console.log(nextProps.userList);  
        if (nextProps.userList) {
            this.setState ({
                loading : false
            })
        }

    }
    
    render(){
 
        return <UserList {...this.props} />
    }
    
    
}

export default Container;


