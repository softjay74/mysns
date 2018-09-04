import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Profile from './presenter'

class Container extends Component {
    state ={
       loading : true
    }

    static propTypes = {
        getProfile : PropTypes.func.isRequired,
    }
    componentDidMount() {
        const {getProfile} = this.props;
        //const {username} = this.props.match.params;
        //console.log(this.props)

        getProfile();
    }
    


    render() {   
        return (
            <Profile {...this.props}/>
        )        
    }
}
export default Container

