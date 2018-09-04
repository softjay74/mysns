import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FeedPhoto from './presenter'

class Container extends Component{
    state = {
        seekingLikes : false
    }
    
    static propTypes={
      
        getLikeUser : PropTypes.func.isRequired
    }

    
    render(){
        return(
        <FeedPhoto 
            {...this.props}
            {...this.state} 
            openLikes={this._OpenLikes}
            closeLikes={this._CloseLikes}
        />
        ) 
    }

    _OpenLikes = () =>{
        this.setState({
            seekingLikes : true
        })

        const { getLikeUser } = this.props;
        getLikeUser();

    }

    _CloseLikes=() => {
        this.setState({
            seekingLikes : false
        })
    }
}     

export default Container
