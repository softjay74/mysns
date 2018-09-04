import React, {Component} from 'react';
//import PropTypes from 'prop-types'
//import Textarea from 'react-textarea-autosize';
import WriteComment from './presenter'

class Container extends Component{
    state = {
        comment : ""
    }

    render(){
        return(
            <WriteComment 
                {...this.state} 
                handleInputChange={this._handleInputChange}
                handleKeyPress = {this._handleKeyPress}
            />
        )
    }
    
    _handleInputChange = event =>{
        const{target : {value}} = event;
        this.setState({
            comment : value
        })
    }

    _handleKeyPress = event => {
        const {key} = event;
        const { submitComment } = this.props;
        const { comment } = this.state;
        
        if (key==="Enter"){
            console.log(key)
            event.preventDefault();
            submitComment(comment);
            this.setState({
                comment : ""
            })
        }
    }
}
export default Container
