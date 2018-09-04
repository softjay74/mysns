import React, {Component} from 'react';
import PropTypes from 'prop-types';
import People from './presenter'

class  Container extends Component {
    state ={
        isloading : true
    }

    static propTypes={
        getAllUser : PropTypes.func.isRequired    
    }

    componentDidMount() {
        const {getAllUser} = this.props;
        getAllUser()
    }

    componentWillReceiveProps = (nextProps) =>{
       
        console.log("next Props :", nextProps)
        
        if (nextProps.users){
                this.setState = {
                    isloading : false
                }
        }
        
    }
    
    render(){
        return (<People {...this.props} />)
    }
    
} 




export default Container