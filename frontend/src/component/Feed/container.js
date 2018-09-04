import React, { Component } from 'react';
import Feed from './presenter';
import PropTypes from 'prop-types'


class Container extends Component {
    state = {
        loading : true
    }

    static propTypes = {
        getFeed : PropTypes.func.isRequired
    }
    
    componentDidMount() {
        const { getFeed } = this.props;
        getFeed();
    }
    
    componentWillReceiveProps = (nextProps) => {
        //console.log(this.props, nextProps);  
        
        console.log(nextProps);  

        if (nextProps.feed){
            this.setState ({
                loading : false
            })
        }

        console.log("Feed loading :", this.state.loading)
    }

    render(){
        const { feed } = this.props ;
        console.log("Feed loading :", this.state.loading)

        return (
            
            <Feed {...this.state} feed={feed}/>

        )
    }
}
export default Container